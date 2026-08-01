import compression from "compression";
import cors, { type CorsOptionsDelegate } from "cors";
import express, { type Express, type Request } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import helmet from "helmet";

import { root } from "./graphql/resolvers";
import schema from "./graphql/schema";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./utils/logger";
import { AppError } from "./utils/types";

/**
 * The same handler answers on both paths: `/graphql` is what the local dev
 * server and the Docker setup talk to, `/api/graphql` is the path Vercel
 * routes to the serverless function (the request arrives with its prefix
 * intact, so the app has to know about it).
 */
export const GRAPHQL_PATHS = ["/graphql", "/api/graphql"];

const DEFAULT_CLIENT_URL = "http://localhost:3000";

const hostOf = (value: string): string | null => {
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
};

/**
 * The deployment model is same-origin everywhere — Vercel routes `/api/graphql`
 * to this function, nginx proxies it, the Vite dev server proxies it — so the
 * request's own host is the authority on what is allowed. `CLIENT_URL` is only
 * for the genuinely cross-origin case.
 *
 * Comparing against the host rather than a fixed list matters because the
 * allowed origin is not knowable at deploy time: every Vercel preview gets its
 * own hostname.
 */
const corsDelegate: CorsOptionsDelegate<Request> = (req, callback) => {
  const origin = req.headers.origin;

  // No Origin at all: curl, a server-to-server call, or a same-origin GET.
  // Nothing for the browser to enforce.
  if (!origin) {
    callback(null, { credentials: true, origin: true });
    return;
  }

  // A present Origin does NOT mean cross-origin. Browsers attach it to
  // same-origin requests too whenever the method is not GET or HEAD — which is
  // every GraphQL call. Treating it as proof of cross-origin is what made the
  // deployed app reject itself with a 403.
  const requestHost = (req.headers["x-forwarded-host"] ?? req.headers.host) as
    | string
    | undefined;

  if (requestHost && hostOf(origin) === requestHost) {
    callback(null, { credentials: true, origin: true });
    return;
  }

  const allowed = (process.env.CLIENT_URL ?? DEFAULT_CLIENT_URL)
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (allowed.includes(origin)) {
    callback(null, { credentials: true, origin: true });
    return;
  }

  logger.warn(`[CORS] blocked origin ${origin}`);

  // A rejected origin is a caller mistake, not a server fault — without an
  // explicit status the global handler would report it as a 500.
  const error: AppError = new Error("Origin is not allowed by CORS");
  error.status = 403;
  callback(error);
};

export function createApp(): Express {
  const isDev = process.env.NODE_ENV !== "production";
  const app = express();

  // Vercel and nginx both sit in front of this app.
  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.use(compression());
  app.use(helmet({ contentSecurityPolicy: isDev ? false : undefined }));
  app.use(cors(corsDelegate));
  app.use(express.json({ limit: "100kb" }));

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
  });

  app.all(
    GRAPHQL_PATHS,
    createHandler({
      schema,
      rootValue: root,
      formatError(error) {
        logger.error(error);
        return error;
      },
    })
  );

  app.use(errorHandler);

  return app;
}

export default createApp();

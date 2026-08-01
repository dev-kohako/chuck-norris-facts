import compression from "compression";
import cors, { type CorsOptions } from "cors";
import express, { type Express } from "express";
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

function buildCorsOptions(): CorsOptions {
  const allowed = (process.env.CLIENT_URL ?? DEFAULT_CLIENT_URL)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    credentials: true,
    origin(origin, callback) {
      // A missing Origin header means same-origin, curl or a server-to-server
      // call — none of which the browser applies CORS to.
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
        return;
      }

      logger.warn(`[CORS] blocked origin ${origin}`);

      // A rejected origin is a caller mistake, not a server fault — without an
      // explicit status the global handler would report it as a 500.
      const error: AppError = new Error("Origin is not allowed by CORS");
      error.status = 403;
      callback(error);
    },
  };
}

export function createApp(): Express {
  const isDev = process.env.NODE_ENV !== "production";
  const app = express();

  // Vercel and nginx both sit in front of this app.
  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.use(compression());
  app.use(helmet({ contentSecurityPolicy: isDev ? false : undefined }));
  app.use(cors(buildCorsOptions()));
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

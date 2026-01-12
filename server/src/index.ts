import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import { root } from "./graphql/resolvers";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./utils/logger";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const isDev = process.env.NODE_ENV !== "production";

const app = express();

app.use(compression());

app.use(
  helmet({
    contentSecurityPolicy: isDev ? false : undefined,
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: isDev,
  })
);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.use(errorHandler);

console.log("Ambiente atual:", process.env.NODE_ENV);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
} else {
  console.log("Servidor não iniciado: NODE_ENV é 'test'");
}

export default app;

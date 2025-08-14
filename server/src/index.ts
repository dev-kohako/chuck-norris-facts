import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import { root } from "./graphql/resolvers";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: false,
  })
);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
}

export default app;

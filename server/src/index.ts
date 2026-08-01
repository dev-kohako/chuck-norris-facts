import "dotenv/config";

import app from "./app";
import { logger } from "./utils/logger";

const PORT = Number(process.env.PORT) || 4000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    logger.info(`Received ${signal}, shutting down`);
    server.close(() => process.exit(0));
  });
}

export default app;

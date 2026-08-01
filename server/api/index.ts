/**
 * Vercel serverless entrypoint.
 *
 * `@vercel/node` accepts an Express app as the default export and drives it per
 * request, so this file deliberately does not call `listen()` — that belongs to
 * `src/index.ts`, which is what the local dev server and the Docker image run.
 * Environment variables come from the Vercel project settings, not from a
 * `.env` file, so `dotenv` is not loaded here.
 */
import app from "../src/app";

export default app;

import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

import { logger } from "../utils/logger";
import { AppError } from "../utils/types";

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  // Express can only fall back to its default handler while the response is
  // still open; once headers are out the connection has to be torn down.
  if (res.headersSent) {
    next(err);
    return;
  }

  const errorId = randomUUID();
  const status = err.status ?? 500;

  logger.error(
    { errorId, status, stack: err.stack },
    `[Global Error] ${err.message}`
  );

  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : err.message,
    errorId,
  });
}

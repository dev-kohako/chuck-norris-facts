import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { ErrorWithStack } from "../utils/types";

export function errorHandler(
  err: ErrorWithStack,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const errorId = randomUUID();

  const isProd = process.env.NODE_ENV === "production";
  const errorLog = `[Global Error] ID=${errorId} - Message: ${err.message}` + 
    (!isProd && err.stack ? `\nStack:\n${err.stack}` : "");

  console.error(errorLog);

  res.status(500).json({
    error: "Internal Server Error",
    errorId,
  });
}

export interface FetchOptions {
  retries?: number;
  delay?: number;
  signal?: AbortSignal;
  backoffFactor?: number;
}

/**
 * Any error travelling to the global handler may carry an HTTP status. Without
 * one the handler falls back to 500, so only errors that are genuinely the
 * caller's fault need to set it.
 */
export interface AppError extends Error {
  status?: number;
}

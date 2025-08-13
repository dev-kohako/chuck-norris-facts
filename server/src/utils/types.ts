export interface FetchOptions {
  retries?: number;
  delay?: number;
  signal?: AbortSignal;
  backoffFactor?: number;
}

export interface ErrorWithStack extends Error {
  stack?: string;
}
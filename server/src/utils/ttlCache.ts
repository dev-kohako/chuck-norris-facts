import { logger } from "./logger";

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

/**
 * Wraps a loader so repeated calls inside the TTL reuse the previous result.
 *
 * Two things it deliberately does:
 *
 * - **Shares the in-flight promise.** Without that, N concurrent requests on a
 *   cold cache each fire their own upstream call and the last one wins.
 * - **Serves the stale value if a refresh fails.** Once the data has been seen
 *   it is better than an error, and the upstream is a third party we do not
 *   control.
 *
 * On Vercel the module scope survives between warm invocations, so this is a
 * real hit-rate rather than a per-request no-op — but it is deliberately
 * process-local: nothing here needs to be correct across instances.
 */
export function withTtlCache<T>(
  label: string,
  ttlMs: number,
  load: () => Promise<T>
): () => Promise<T> {
  let entry: CacheEntry<T> | null = null;
  let inFlight: Promise<T> | null = null;

  return async function get(): Promise<T> {
    const now = Date.now();

    if (entry && entry.expiresAt > now) {
      logger.debug(`[Cache hit] ${label}`);
      return entry.value;
    }

    if (inFlight) return inFlight;

    inFlight = load()
      .then((value) => {
        entry = { value, expiresAt: Date.now() + ttlMs };
        logger.debug(`[Cache fill] ${label} for ${ttlMs}ms`);
        return value;
      })
      .catch((error) => {
        if (entry) {
          logger.warn(`[Cache stale] ${label} refresh failed, serving stale`);
          return entry.value;
        }
        throw error;
      })
      .finally(() => {
        inFlight = null;
      });

    return inFlight;
  };
}

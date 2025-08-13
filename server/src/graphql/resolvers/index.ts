import { FetchOptions } from "@/src/utils/types";
import { apiClient } from "../../utils/apiClient";
import { logger } from "../../utils/logger";
import axios, { AxiosError } from "axios";

export async function fetchWithRetry<T>(
  endpoint: string,
  errorMessage: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    retries = 3,
    delay = 1000,
    backoffFactor = 2,
    signal,
  } = options;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const startTime = Date.now();
      const response = await apiClient.get<T>(endpoint, { signal });

      logger.info(
        `[API Success] ${endpoint} - Attempt ${attempt} (${Date.now() - startTime}ms)`
      );

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_CANCELED") {
          logger.warn(`[API Canceled] ${endpoint}`);
          throw new DOMException("Request canceled", "AbortError");
        }

        if (shouldRetry(err) && attempt <= retries) {
          const retryDelay = delay * Math.pow(backoffFactor, attempt - 1);
          logger.warn(
            `[API Retry] Attempt ${attempt}/${retries} for ${endpoint} after ${retryDelay}ms delay`
          );
          await wait(retryDelay);
          continue;
        }
      }

      try {
        handleApiError(err, errorMessage);
      } catch (handleErr) {
        logger.error("[Error Handler Failure] " + String(handleErr));
        throw err; // relança erro original
      }
    }
  }

  logger.error(`[API Failure] ${endpoint} after ${retries} retries`);
  throw new Error(errorMessage);
}

function shouldRetry(error: AxiosError): boolean {
  const status = error.response?.status;
  return (
    [502, 503, 504].includes(status ?? 0) ||
    error.code === "ECONNABORTED" ||
    status === undefined
  );
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleApiError(error: unknown, defaultMessage: string): never {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? "Unknown Status";
    const url = error.config?.url ?? "Unknown URL";
    const message =
      (error.response?.data as { message?: string })?.message || error.message;

    logger.error(
      `[API Error] ${status} - ${url}: ${message}` +
        (error.stack ? `\nStack: ${error.stack}` : "")
    );
  } else {
    logger.error("[Unexpected Error] " + String(error));
  }
  throw new Error(defaultMessage);
}

export const root = {
  getChuckNorrisFact: async (options?: FetchOptions): Promise<string> => {
    const data = await fetchWithRetry<{ value: string }>(
      "/random",
      "Failed to fetch Chuck Norris fact",
      options
    );
    return data.value;
  },

  getChuckNorrisCategories: async (
    options?: FetchOptions
  ): Promise<string[]> => {
    return fetchWithRetry<string[]>(
      "/categories",
      "Failed to fetch Chuck Norris categories",
      options
    );
  },

  getChuckNorrisFactByCategory: async (
    { category }: { category: string },
    options?: FetchOptions
  ): Promise<string> => {
    const data = await fetchWithRetry<{ value: string }>(
      `/random?category=${encodeURIComponent(category)}`,
      `Failed to fetch Chuck Norris fact for category ${category}`,
      options
    );
    return data.value;
  },

  searchFacts: async (
    { query }: { query: string },
    options?: FetchOptions
  ): Promise<string> => {
    const data = await fetchWithRetry<{ result: { value: string }[] }>(
      `/search?query=${encodeURIComponent(query)}`,
      `Failed to search facts for query ${query}`,
      options
    );
    return data.result[0]?.value ?? "No facts found";
  },
};

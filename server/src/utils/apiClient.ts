import axios from "axios";

import { logger } from "./logger";

const BASE_URL = process.env.BASE_URL || "https://api.chucknorris.io/jokes";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  logger.debug(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    logger.debug(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      logger.warn(`[API Timeout] ${error.config?.url}`);
    }
    return Promise.reject(error);
  }
);

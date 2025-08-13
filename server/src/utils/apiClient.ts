import axios from "axios";

const BASE_URL = process.env.BASE_URL || "https://api.chucknorris.io/jokes";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(config => {
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

apiClient.interceptors.response.use(
  response => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    if (error.code === "ECONNABORTED") {
      console.warn(`[API Timeout] ${error.config?.url}`);
    }
    return Promise.reject(error);
  }
);
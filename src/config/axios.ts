import { APP_CONFIG } from "@/constants";
import type { TResponse, TResponseError } from "@/types";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

interface ErrorResponse {
  detail?: string;
  status?: number;
}

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(APP_CONFIG.ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem(APP_CONFIG.ACCESS_TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

// Handle response utility function
export const handleResponse = async <T>(
  promise: Promise<{ data: T }>
): Promise<TResponse<T>> => {
  try {
    const response = await promise;
    return {
      ok: true,
      body: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const responseError: TResponseError = {
      message: axiosError?.response?.data?.detail || "internal-error",
      status: axiosError?.response?.status || 500,
    };

    return {
      ok: false,
      error: responseError,
    };
  }
};

class Api {
  constructor() {}

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<TResponse<T>> {
    return handleResponse(axiosInstance.get<T>(url, config));
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<TResponse<T>> {
    return handleResponse(axiosInstance.post<T>(url, data, config));
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<TResponse<T>> {
    return handleResponse(axiosInstance.put<T>(url, data, config));
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<TResponse<T>> {
    return handleResponse(axiosInstance.patch<T>(url, data, config));
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<TResponse<T>> {
    return handleResponse(axiosInstance.delete<T>(url, config));
  }
}

export default new Api();

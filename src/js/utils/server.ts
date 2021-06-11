import axios, { AxiosRequestConfig } from "axios";

const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://kobawan-sudoku-server.herokuapp.com"
    : "http://localhost:5000";

export const REQUEST_TIMEOUT = 15000;

export const REGISTER_ENDPOINT = `${SERVER_URL}/register`;
export const LOGIN_ENDPOINT = `${SERVER_URL}/login`;
export const USER_ENDPOINT = `${SERVER_URL}/user`;
export const SAVE_GAME_ENDPOINT = `${SERVER_URL}/game`;

const commonHeaders = {
  "Cache-Control": "no-store, no-cache",
};

const commonOptions: AxiosRequestConfig = {
  headers: commonHeaders,
  timeout: REQUEST_TIMEOUT,
};

export const isNetworkError = (message: string) => message === "Network Error";

export const request = {
  get: <R = any>(url: string) => {
    return axios.get<R>(url, commonOptions);
  },
  post: <R = any>(url: string, body = {}) => {
    return axios.post<R>(url, body, commonOptions);
  },
  put: <R = any>(url: string, body = {}) => {
    return axios.put<R>(url, body, commonOptions);
  },
  delete: <R = any>(url: string) => {
    return axios.delete<R>(url, commonOptions);
  },
};

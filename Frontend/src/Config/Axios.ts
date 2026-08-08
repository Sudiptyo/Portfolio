import axios from "axios";

export const Axios = axios.create({
  // baseURL: import.meta.env.BASE_URL ?? "http://localhost:3000/api/v1",
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  withCredentials: true,
  timeout: 10000
});

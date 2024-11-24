import Axios, { InternalAxiosRequestConfig } from "axios";
import storage from "./storage";
import { toast } from "sonner";

export const api_client = Axios.create({
  baseURL: "http://loclhost:3000/api"
});

api_client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
  }
);

api_client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const messageData = error.response?.data?.message;
    const status = error.response?.status;

    if (status === 401) {
      localStorage.clear();
    } else if (status === 500) toast.error("Something went wrong!");
    else toast.error(messageData);

    return Promise.reject(error);
  }
);

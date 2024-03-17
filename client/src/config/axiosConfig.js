// src/utils/axiosConfig.js
import axios from "axios";

const token = JSON.parse(localStorage.getItem("user"));

const axiosInstance = axios.create({
  baseURL: "https://api.ylslc.org/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

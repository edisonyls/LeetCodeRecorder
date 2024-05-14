// src/utils/axiosConfig.js
import axios from "axios";

const token = JSON.parse(localStorage.getItem("user"));
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const axiosInstanceNoAuth = axios.create({
  baseURL: API_ENDPOINT,
});

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
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

export { axiosInstance, axiosInstanceNoAuth };

// src/utils/axiosConfig.js
import axios from "axios";

const getToken = () => {
  const storedUser = JSON.parse(localStorage.getItem("persist:user"));
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser.user);
      return user.currentUser || null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  }
  return null;
};

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const axiosInstanceNoAuth = axios.create({
  baseURL: API_ENDPOINT,
});

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
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

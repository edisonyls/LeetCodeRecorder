// src/utils/axiosConfig.js
import axios from "axios";

const token = JSON.parse(localStorage.getItem("user"));

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;

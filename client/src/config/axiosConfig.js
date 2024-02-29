// src/utils/axiosConfig.js
import axios from "axios";

const token = JSON.parse(localStorage.getItem("user"));

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;

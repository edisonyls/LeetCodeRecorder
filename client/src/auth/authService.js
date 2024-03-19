import axios from "axios";

const API_ENDPOINT = "https://api.ylslc.org/api/auth/";

const register = async (userData) => {
  try {
    const response = await axios.post(API_ENDPOINT + "register", userData);
    if (response.data.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Register failed");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      throw new Error(error.message || "An error occurred");
    }
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(API_ENDPOINT + "authenticate", userData);
    if (response.data.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    if (error.response) {
      // You can customize what you throw here to ensure it's serializable
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      throw new Error(error.message || "An error occurred");
    }
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;

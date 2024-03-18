import axios from "axios";

const API_ENDPOINT = "http://localhost:8080/api/auth/";

const register = async (userData) => {
  console.log(userData);
  const res = await axios.post(API_ENDPOINT + "register", userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data.data));
  }

  return res.data.data;
};

const login = async (userData) => {
  const response = await axios.post(API_ENDPOINT + "authenticate", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }

  return response.data.data;
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

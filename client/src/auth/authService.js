import axios from "axios";

const API_URL = "/api/auth/register";

const register = async (userData) => {
  console.log(userData);
  const res = await axios.post(API_URL, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data.data));
  }

  return res.data.data;
};

const authService = {
  register,
};

export default authService;

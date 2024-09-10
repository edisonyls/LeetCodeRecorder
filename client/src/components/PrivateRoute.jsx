import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";

const PrivateRoute = () => {
  const { state } = useUser();
  const { token } = state;

  const isTokenValid = (token) => {
    try {
      if (!token) {
        toast.error("Not authenticated. Please login again.");
        return false;
      }

      const { exp } = jwtDecode(token);

      if (!exp) {
        toast.error("Invalid authentication. Please login again.");
        return false;
      }

      if (Date.now() > exp * 1000) {
        toast.error("Your authentication is expired. Please login again.");
        return false;
      }

      return true;
    } catch (error) {
      toast.error("Token is invalid. Please login again.");
      return false;
    }
  };

  return isTokenValid(token) ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;

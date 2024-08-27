import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct the import here; it should be default import
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

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

  return isTokenValid(currentUser) ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;

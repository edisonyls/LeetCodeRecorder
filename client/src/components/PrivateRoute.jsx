import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    toast.error("You need to be authenticated to access this page");
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

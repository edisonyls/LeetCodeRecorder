import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { signOut } from "../redux/user/userSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    toast.error("You need to be authenticated.");
    return <Navigate to="/signin" />;
  }

  try {
    const decodedToken = jwtDecode(currentUser);
    if (decodedToken.exp * 1000 < Date.now()) {
      toast.error("Your session has expired. Please sign in again.");
      dispatch(signOut());
      return <Navigate to="/" />;
    }
  } catch (error) {
    toast.error("Invalid token. Please sign in again.");
    dispatch(signOut());
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

import React from "react";
import { useSelector } from "react-redux";

const AuthRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return;
};

export default AuthRoute;

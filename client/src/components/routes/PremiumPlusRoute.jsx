import React from "react";
import { useUser } from "../../context/userContext";
import { Outlet } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage";

const PremiumPlusRoute = () => {
  const { state } = useUser();
  const { user } = state;
  const role = user?.role;

  if (role === "PREPLUS" || role === "ADMIN") {
    return <Outlet />;
  } else {
    return <NotFoundPage />;
  }
};

export default PremiumPlusRoute;

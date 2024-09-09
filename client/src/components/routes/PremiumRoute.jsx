import React from "react";
import { useUser } from "../../context/userContext";
import NotFoundPage from "../../pages/NotFoundPage";
import { Outlet } from "react-router-dom";

const PremiumRoute = () => {
  const { state } = useUser();
  const { user } = state;
  const role = user?.role;

  if (role === "PREMIUM" || role === "PREPLUS" || role === "ADMIN") {
    return <Outlet />;
  } else {
    return <NotFoundPage />;
  }
};

export default PremiumRoute;

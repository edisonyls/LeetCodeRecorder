import { grey } from "@mui/material/colors";
import React from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";

const UpgradePage = () => {
  return (
    <div
      style={{
        backgroundColor: grey[900],
        color: grey[50],
        minHeight: "100vh",
      }}
    >
      <AuthenticatedNavbar />
    </div>
  );
};

export default UpgradePage;

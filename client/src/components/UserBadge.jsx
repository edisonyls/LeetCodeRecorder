import React from "react";
import { Box } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const UserBadge = ({ tier }) => {
  let icon;
  let color;

  switch (tier) {
    case "REGULAR":
      icon = <AccountBoxIcon sx={{ fontSize: 20 }} />; // Adjust icon size if needed
      color = "#9e9e9e"; // Neutral grey for Regular
      break;
    case "PREMIUM":
      icon = <FaceRetouchingNaturalIcon sx={{ fontSize: 20 }} />; // Adjust icon size if needed
      color = "#d4af37"; // Luxurious gold for Premium
      break;
    case "ADMIN":
      icon = <AdminPanelSettingsIcon sx={{ fontSize: 20 }} />; // Adjust icon size if needed
      color = "#1976d2"; // Authoritative blue for Admin
      break;
    default:
      icon = <AccountBoxIcon sx={{ fontSize: 20 }} />;
      color = "#9e9e9e"; // Default to Regular
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color,
        borderRadius: "50%",
        width: 20, // Badge size
        height: 20, // Badge size
        color: "white",
        padding: 1, // Space between icon and border
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.5)", // Stronger shadow effect
      }}
    >
      {icon}
    </Box>
  );
};

export default UserBadge;

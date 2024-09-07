import React from "react";
import { Box } from "@mui/material";

// Importing custom GIF images for each badge
import regularBadgeGif from "../images/regular.gif"; // Adjust the path to your image
import premiumBadgeGif from "../images/premium.gif"; // Adjust the path to your image
import adminBadgeGif from "../images/admin.gif"; // Adjust the path to your image

const UserBadge = ({ tier }) => {
  let icon;
  let badgeStyle = {};

  switch (tier) {
    case "REGULAR":
      icon = (
        <img
          src={regularBadgeGif}
          alt="Regular User Badge"
          style={{ width: "100%", height: "100%" }} // Utilize full container size
        />
      );
      badgeStyle = {
        width: 40, // Maintain the same size for container
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
      break;
    case "PREMIUM":
      icon = (
        <img
          src={premiumBadgeGif}
          alt="Premium User Badge"
          style={{ width: "100%", height: "100%" }}
        />
      );
      badgeStyle = {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
      break;
    case "ADMIN":
      icon = (
        <img
          src={adminBadgeGif}
          alt="Admin User Badge"
          style={{ width: "100%", height: "100%" }}
        />
      );
      badgeStyle = {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
      break;
    default:
      icon = (
        <img
          src={regularBadgeGif}
          alt="Default User Badge"
          style={{ width: "100%", height: "100%" }}
        />
      );
      badgeStyle = {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
  }

  return <Box sx={badgeStyle}>{icon}</Box>;
};

export default UserBadge;

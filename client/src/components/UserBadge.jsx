import React from "react";
import { Box } from "@mui/material";

// Importing custom GIF images for each badge
import regularBadgeGif from "../images/regular.gif";
import premiumBadgeGif from "../images/premium.gif";
import premiumPlusBadgeGif from "../images/premiumplus.gif";
import adminBadgeGif from "../images/admin.gif";

const badgeStyle = {
  width: 30,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const badgeImages = {
  REGULAR: regularBadgeGif,
  PREMIUM: premiumBadgeGif,
  PREPLUS: premiumPlusBadgeGif,
  ADMIN: adminBadgeGif,
};

const UserBadge = ({ tier }) => {
  const iconSrc = badgeImages[tier] || regularBadgeGif;

  return (
    <Box sx={badgeStyle}>
      <img
        src={iconSrc}
        alt={`${tier || "Regular"} User Badge`}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
};

export default UserBadge;

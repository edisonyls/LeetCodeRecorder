import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";

const AccountNavbar = () => {
  return (
    <AppBar position="static" sx={{ background: "black" }}>
      <Toolbar>
        <FlutterDashIcon />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            ml: 2,
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          YLSLC
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AccountNavbar;

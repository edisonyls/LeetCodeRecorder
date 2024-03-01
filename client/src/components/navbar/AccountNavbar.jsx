import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Box } from "@mui/material";

const AccountNavbar = () => {
  return (
    <AppBar position="static" sx={{ background: "black" }}>
      <Toolbar>
        <FlutterDashIcon />
        <Typography variant="h8" sx={{ flexGrow: 1, ml: 1 }}>
          <Box
            component={Link}
            to="/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            YLSLC
          </Box>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AccountNavbar;

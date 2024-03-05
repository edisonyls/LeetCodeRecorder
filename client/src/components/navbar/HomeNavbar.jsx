import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Box } from "@mui/material";
import { BlackBackgroundButton } from "../GenericButton";

const HomeNavbar = () => {
  return (
    <AppBar position="static" sx={{ background: "black", mb: 4 }}>
      <Toolbar>
        <FlutterDashIcon />
        <Typography variant="h8" sx={{ flexGrow: 1, ml: 1 }}>
          <Box style={{ color: "inherit", textDecoration: "none" }}>YLSLC</Box>
        </Typography>
        <BlackBackgroundButton
          component={Link}
          to="/signin"
          buttonText="Sign In"
        />
        <BlackBackgroundButton
          component={Link}
          to="/register"
          buttonText="Register"
        />
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;

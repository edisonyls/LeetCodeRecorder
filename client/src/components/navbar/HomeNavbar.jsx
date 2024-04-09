import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Box } from "@mui/material";
import { BlackBackgroundButton } from "../generic/GenericButton";

const HomeNavbar = () => {
  return (
    <AppBar position="static" sx={{ background: "black" }}>
      <Toolbar>
        <FlutterDashIcon sx={{ marginLeft: "4rem", fontSize: "2rem" }} />
        <Typography variant="h8" sx={{ flexGrow: 1, ml: 1 }}>
          <Box
            component={Link}
            to="/"
            style={{
              fontSize: "18px",
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            YLSLC
          </Box>
        </Typography>

        <Box>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;

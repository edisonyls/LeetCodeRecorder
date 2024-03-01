import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Box, Button } from "@mui/material";

const HomeNavbar = () => {
  return (
    <AppBar position="static" sx={{ background: "black", mb: 4 }}>
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
        <Button
          color="inherit"
          component={Link}
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": { backgroundColor: "grey" },
            mr: 1,
          }}
          to="/signin"
        >
          Sign In
        </Button>
        <Button
          color="inherit"
          component={Link}
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": { backgroundColor: "grey" },
            mr: 1,
          }}
          to="/register"
        >
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;

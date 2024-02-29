import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Box, Button } from "@mui/material";

const HomeNavbar = () => {
  return (
    <AppBar position="static" sx={{ background: "black", mb: 4 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <FlutterDashIcon />
          </Link>
        </IconButton>
        <Typography variant="h8" sx={{ flexGrow: 1 }}>
          <Box
            component={Link}
            to="/"
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

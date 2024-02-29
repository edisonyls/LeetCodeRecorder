import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Box, Button } from "@mui/material";

const AccountNavbar = () => {
  return (
    <AppBar position="static" sx={{ background: "black" }}>
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
      </Toolbar>
    </AppBar>
  );
};

export default AccountNavbar;

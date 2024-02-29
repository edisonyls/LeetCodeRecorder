import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Box } from "@mui/material";
import axiosInstance from "../../config/axiosConfig";

const AuthenticatedNavbar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axiosInstance.get("user");
      const data = await response.data;

      if (data.serverMessage === "SUCCESS") {
        setUser(data.data);
      }
    };

    fetchUserData();
  }, []);

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6 || hour > 23) return "Please go to sleep, ";
    if (hour < 12) return "Good Morning, ";
    if (hour < 18) return "Good Afternoon, ";
    return "Good Evening, ";
  };

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
        <Typography variant="h8">
          {getTimeOfDayGreeting()} {user.firstName} {user.lastName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AuthenticatedNavbar;

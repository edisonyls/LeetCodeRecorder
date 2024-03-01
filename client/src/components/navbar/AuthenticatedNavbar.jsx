import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../auth/authSlice";
import { useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import axiosInstance from "../../config/axiosConfig";
import { BlackBackgroundButton } from "../GenericButton";

const AuthenticatedNavbar = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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
        <Typography variant="h8">
          {getTimeOfDayGreeting()} {user.firstName} {user.lastName}
        </Typography>
        <BlackBackgroundButton buttonText="Log Out" onClick={handleLogout} />
      </Toolbar>
    </AppBar>
  );
};

export default AuthenticatedNavbar;

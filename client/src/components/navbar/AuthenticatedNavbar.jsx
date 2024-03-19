import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../auth/authSlice";
import { useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import axiosInstance from "../../config/axiosConfig";
import ListIcon from "@mui/icons-material/List";
import OptionDrawer from "../OptionDrawer";

const AuthenticatedNavbar = () => {
  const [user, setUser] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
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
        <Typography variant="h8" sx={{ marginRight: 2 }}>
          {getTimeOfDayGreeting()} {user.firstName} {user.lastName}
        </Typography>
        <IconButton
          color="inherit"
          onClick={toggleDrawer(true)}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <ListIcon />
        </IconButton>
        <OptionDrawer
          isOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          handleLogout={handleLogout}
        />
      </Toolbar>
    </AppBar>
  );
};

export default AuthenticatedNavbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import ListIcon from "@mui/icons-material/List";
import OptionDrawer from "../OptionDrawer";
import { useUser } from "../../context/userContext";
import { UserHooks } from "../../hooks/userHooks/UserHooks";

const AuthenticatedNavbar = () => {
  const { state } = useUser();
  const { user, token, error } = state;
  const { getCurrentUser } = UserHooks();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout } = UserHooks();
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser(token).catch((error) => {
      alert("User credential expired. Please login again.");
      logout();
      navigate("/");
    });
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
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
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
          <Box
            component={Link}
            to="/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            YLSLC
          </Box>
        </Typography>
        <Typography variant="h6" sx={{ marginRight: 2 }}>
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
          currentPath={location.pathname}
        />
      </Toolbar>
    </AppBar>
  );
};

export default AuthenticatedNavbar;

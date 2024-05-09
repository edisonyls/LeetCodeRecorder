import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import ListIcon from "@mui/icons-material/List";
import OptionDrawer from "../OptionDrawer";
import { useUser } from "../../context/userContext";
import { UserHooks } from "../../hooks/userHooks/UserHooks";
import { axiosInstance } from "../../config/axiosConfig";

const AuthenticatedNavbar = () => {
  const { state } = useUser();
  const { user, token } = state;
  const { getCurrentUser } = UserHooks();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(null);
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

  useEffect(() => {
    const countQuestions = async () => {
      try {
        const response = await axiosInstance.get("question/number");
        setQuestionCount(response.data.data);
      } catch (error) {
        console.error("Error counting questions:", error);
      }
    };
    countQuestions();
  }, []);

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
        <Box
          sx={{
            display: "flex",
            width: "33.3%",
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: 2,
          }}
        >
          <FlutterDashIcon />
          <Typography
            variant="h6"
            component={Link}
            to="/dashboard"
            sx={{
              ml: 2,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            YLSLC
          </Typography>
        </Box>

        <Box
          sx={{
            width: "33.3%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h8">Question Recorded :</Typography>
          {questionCount === null ? (
            <Box
              sx={{
                ml: 1,
                padding: "4px 12px",
                borderRadius: "4px",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                size={24}
                thickness={5}
                sx={{ color: "black" }}
              />
            </Box>
          ) : (
            <Typography
              variant="h6"
              sx={{
                ml: 1,
                padding: "4px 12px",
                borderRadius: "4px",
                backgroundColor: "white",
                color: "black",
              }}
            >
              {questionCount}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "33.3%",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: 2,
          }}
        >
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
        </Box>
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

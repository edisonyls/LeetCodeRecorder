import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import Footer from "../components/Footer";
import { useUser } from "../context/userContext";
import { UserHooks } from "../hooks/userHooks/UserHooks";
import Welcome from "../components/DashboardComponents/Welcome";
import LeetCodeStats from "../components/DashboardComponents/LeetCodeStats";
import DataStructureStats from "../components/DashboardComponents/DataStructureStats";
import AlgorithmStats from "../components/DashboardComponents/AlgorithmStats";

const Dashboard = () => {
  const { state } = useUser();
  const { user, token, loading } = state;
  const { getCurrentUser } = UserHooks();

  useEffect(() => {
    getCurrentUser(token);
  }, []); // eslint-disable-line

  if (Object.keys(user).length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#121212",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        color: "limegreen",
      }}
    >
      <AuthenticatedNavbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#121212",
          mt: -4,
        }}
      >
        <Welcome user={user} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "10%",
            marginRight: "10%",
            width: "80%",
          }}
        >
          <LeetCodeStats userId={user.id} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap", // Ensure boxes wrap if necessary
              width: "100%",
            }}
          >
            <DataStructureStats />
            <AlgorithmStats />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;

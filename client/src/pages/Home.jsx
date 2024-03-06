import React from "react";
import HomeNavbar from "../components/navbar/HomeNavbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

function Home() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box component="main" flexGrow={1}>
        <HomeNavbar />
        <div>Home Page</div>
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;

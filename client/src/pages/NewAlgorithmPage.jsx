import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import Footer from "../components/Footer";
import AlgorithmForm from "../components/algorithm_page_components/AlgorithmForm";
import NewAlgorithmHeader from "../components/algorithm_page_components/NewAlgorithmHeader";

const NewAlgorithmPage = () => {
  const [isDataEntered, setDataEntered] = useState(false);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#121212",
      }}
    >
      <AuthenticatedNavbar />
      <Container
        component="main"
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: grey[50],
          flexGrow: 1,
        }}
      >
        <NewAlgorithmHeader isDataEntered={isDataEntered} />
        <AlgorithmForm setDataEntered={setDataEntered} />
      </Container>
      <Footer />
    </Box>
  );
};

export default NewAlgorithmPage;

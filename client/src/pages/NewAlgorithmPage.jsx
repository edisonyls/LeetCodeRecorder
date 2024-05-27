import React from "react";
import { Box, Typography, Container, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import AlgorithmForm from "../components/algorithm_page_components/AlgorithmForm";

const NewAlgorithmPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          marginTop: "2rem",
          color: grey[50],
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ color: "white" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" gutterBottom>
            New Algorithm
          </Typography>
        </Box>
        <AlgorithmForm />
      </Container>
      <Footer />
    </Box>
  );
};

export default NewAlgorithmPage;

import React from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import NewQuestionForm from "../components/new_question/NewQuestionForm";
import { Box } from "@mui/material";
import Footer from "../components/Footer";

const NewQuestion = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AuthenticatedNavbar />
      <NewQuestionForm />
      <Footer />
    </Box>
  );
};

export default NewQuestion;

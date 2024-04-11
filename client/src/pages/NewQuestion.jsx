import React, { useState } from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import NewQuestionForm from "../components/new_question/NewQuestionForm";
import { Box, Typography } from "@mui/material";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { WhiteBackgroundButton } from "../components/generic/GenericButton";
import Stopwatch from "../components/Stopwatch";
import GenericDialog from "../components/generic/GenericDialog";
import { ArrowBack } from "@mui/icons-material";

const NewQuestion = () => {
  const [timeOfCompletion, setTimeOfCompletion] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const location = useLocation();
  const withTimer = location.state?.withTimer || false;
  const navigate = useNavigate();

  const handleTimeSubmit = (time) => {
    console.log(time);
    setTimeOfCompletion(time);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AuthenticatedNavbar />
      <GenericDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => navigate(-1)}
        title="Return to Dashboard"
        content="Are you sure? All unsaved data will be lost."
      />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <Box sx={{ position: "absolute", left: "8%" }}>
          <WhiteBackgroundButton
            icon={<ArrowBack />}
            onClick={() => setDialogOpen(true)}
            buttonText="Back"
          />
        </Box>

        <Typography
          sx={{ textAlign: "center", width: "100%" }}
          variant="h5"
          gutterBottom
        >
          Upload New Question
        </Typography>

        {withTimer && (
          <Box sx={{ position: "absolute", right: "8%" }}>
            <Stopwatch onTimeSubmit={handleTimeSubmit} />
          </Box>
        )}
      </Box>

      <NewQuestionForm timerValue={timeOfCompletion} />
      <Footer />
    </Box>
  );
};

export default NewQuestion;

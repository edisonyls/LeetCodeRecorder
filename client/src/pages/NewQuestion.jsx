import React, { useState } from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import NewQuestionForm from "../components/new_question/NewQuestionForm";
import { Box, Typography } from "@mui/material";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { WhiteBackgroundButton } from "../components/generic/GenericButton";
import Stopwatch from "../components/Stopwatch";
import { GenericDialog } from "../components/generic/GenericDialog";
import { ArrowBack } from "@mui/icons-material";
import UpdateQuestionForm from "../components/new_question/UpdateQuestionForm";

const NewQuestion = () => {
  const [timeOfCompletion, setTimeOfCompletion] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const location = useLocation();
  const withTimer = location.state?.withTimer || false;
  const question = location.state?.question || null;
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
        title={question === null ? "Return to Dashboard" : "Return to Question"}
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
          {question === null ? "Upload New Question" : "Modify Question"}
        </Typography>

        {withTimer && (
          <Box sx={{ position: "absolute", right: "8%" }}>
            <Stopwatch onTimeSubmit={handleTimeSubmit} />
          </Box>
        )}
      </Box>

      {question === null ? (
        <NewQuestionForm timerValue={timeOfCompletion} />
      ) : (
        <UpdateQuestionForm initialQuestion={question} />
      )}

      <Footer />
    </Box>
  );
};

export default NewQuestion;

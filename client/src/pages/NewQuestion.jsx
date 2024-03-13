import React, { useState } from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import NewQuestionForm from "../components/new_question/NewQuestionForm";
import { Box, Typography } from "@mui/material";
import Footer from "../components/Footer";
import { useLocation, Link } from "react-router-dom";
import { WhiteBackgroundButton } from "../components/generic/GenericButton";
import Stopwatch from "../components/Stopwatch";

const NewQuestion = () => {
  const location = useLocation();
  const withTimer = location.state?.withTimer || false;
  const [timeOfCompletion, setTimeOfCompletion] = useState("");

  const handleTimeSubmit = (time) => {
    setTimeOfCompletion(time);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AuthenticatedNavbar />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <Box sx={{ position: "absolute", left: "10%" }}>
          <WhiteBackgroundButton
            component={Link}
            to="/dashboard"
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
          <Box sx={{ position: "absolute", right: "10%" }}>
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

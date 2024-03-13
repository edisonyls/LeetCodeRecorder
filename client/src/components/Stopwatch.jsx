import React, { useState, useEffect } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import GenericDialog from "./generic/GenericDialog";
import { WhiteBackgroundButton } from "./generic/GenericButton";

const Stopwatch = ({ onTimeSubmit }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  const handleFinish = () => {
    setIsRunning(false);
    setOpenDialog(true);
  };

  const handleConfirmTime = () => {
    onTimeSubmit(formatTime());
    setOpenDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #000",
          padding: "8px",
          borderRadius: "4px",
          marginRight: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ marginRight: "8px", flexGrow: 1 }}>
            Timer: {formatTime()}
          </Typography>
          <IconButton sx={{ color: "black" }} onClick={handlePauseResume}>
            {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Box>
        <WhiteBackgroundButton buttonText="Finish" onClick={handleFinish} />
      </Box>
      <GenericDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmTime}
        title="Time of Completion"
        content="Do you want to pass this time to the Time of Completion field?"
      />
    </>
  );
};

export default Stopwatch;

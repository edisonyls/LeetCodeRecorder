import React, { useState, useEffect } from "react";
import { IconButton, Box, Typography, Tooltip } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { GenericDialog } from "./generic/GenericDialog";

const MAX_TIME = 59999; // Maximum time in seconds (999 minutes and 59 seconds)

const Stopwatch = ({ onTimeSubmit }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [openFinishDialog, setOpenFinishDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        const now = Date.now();
        const deltaTime = now - startTime;
        const newTime = Math.floor(deltaTime / 1000);
        if (newTime >= MAX_TIME) {
          setTime(MAX_TIME);
          setIsRunning(false);
          clearInterval(interval);
        } else {
          setTime(newTime);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

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
    setOpenFinishDialog(true);
  };

  const handleConfirmTime = () => {
    onTimeSubmit(formatTime());
    setOpenFinishDialog(false);
  };

  const handleReset = () => {
    setTime(0);
    setStartTime(Date.now());
    setIsRunning(true); // Optionally reset the timer to start running immediately
    setOpenResetDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #fff",
          background: "#000",
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
          <Typography
            variant="h7"
            sx={{ marginRight: "8px", flexGrow: 1, color: "#fff" }}
          >
            Time Spent: {formatTime()}
          </Typography>
          <Tooltip title="start/pause">
            <IconButton sx={{ color: "#fff" }} onClick={handlePauseResume}>
              {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="reset">
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => setOpenResetDialog(true)}
            >
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="finish">
            <IconButton sx={{ color: "#fff" }} onClick={handleFinish}>
              <CheckCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <GenericDialog
        isOpen={openFinishDialog}
        onClose={() => setOpenFinishDialog(false)}
        onConfirm={handleConfirmTime}
        title="Time of Completion"
        content="Do you want to pass this time to the Time of Completion field?"
      />
      <GenericDialog
        isOpen={openResetDialog}
        onClose={() => setOpenResetDialog(false)}
        onConfirm={handleReset}
        title="Reset Recording"
        content="Do you want to reset time recording?"
      />
    </>
  );
};

export default Stopwatch;

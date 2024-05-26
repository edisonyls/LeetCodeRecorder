// components/AlgorithmStats.js
import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const AlgorithmStats = ({ userId }) => {
  const navigate = useNavigate();

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    boxSizing: "border-box",
    margin: "10px",
    delay: 1800,
    width: "48%", // Adjust width to half of the available space
  });

  return (
    <animated.div style={props}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h5">Algorithm Stats</Typography>
        </Box>
        <IconButton
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
            fontSize: "1.8rem",
          }}
          onClick={() => navigate("/algorithm")}
        >
          <ArrowForwardIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="body1" sx={{ color: "cyan" }}>
          Total Algorithm You Have Recorded:{" "}
          <span
            style={{
              padding: "2px 5px",
              borderRadius: "5px",
              backgroundColor: "limegreen",
              color: "black",
              display: "inline-block",
            }}
          >
            N/A
          </span>
        </Typography>
      </Box>
    </animated.div>
  );
};

export default AlgorithmStats;

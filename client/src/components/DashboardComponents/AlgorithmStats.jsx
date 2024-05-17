// components/AlgorithmStats.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";

const AlgorithmStats = ({ userId }) => {
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
      <Typography variant="h6" sx={{ color: "white" }}>
        Algorithm Stats
      </Typography>
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

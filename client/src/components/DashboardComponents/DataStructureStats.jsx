// components/DataStructureStats.js
import React from "react";
import { Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";

const DataStructureStats = () => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    boxSizing: "border-box",
    margin: "10px",
    delay: 1500,
    width: "48%", // Adjust width to half of the available space
  });

  return (
    <animated.div style={props}>
      <Typography variant="h6">Data Structure Stats</Typography>
      <Typography variant="body1">Value 2</Typography>
    </animated.div>
  );
};

export default DataStructureStats;

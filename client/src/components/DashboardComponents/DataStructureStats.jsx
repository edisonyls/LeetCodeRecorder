// components/DataStructureStats.js
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { axiosInstance } from "../../config/axiosConfig";

const DataStructureStats = ({ userId }) => {
  const [dataStructureNumber, setDataStructureNumber] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `data-structure/count-data-structure/${userId}`
        );
        setDataStructureNumber(response.data.data);
      } catch (err) {
        console.log("Error while fetching the question stats: " + err);
      }
    };
    fetchData();
  }, [userId]);

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
      <Typography variant="h6" sx={{ color: "white" }}>
        Data Structure Stats
      </Typography>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="body1" sx={{ color: "cyan" }}>
          Total Data Structure You Have Recorded:{" "}
          <span
            style={{
              padding: "2px 5px",
              borderRadius: "5px",
              backgroundColor: "limegreen",
              color: "black",
              display: "inline-block",
            }}
          >
            {dataStructureNumber}
          </span>
        </Typography>
      </Box>
    </animated.div>
  );
};

export default DataStructureStats;

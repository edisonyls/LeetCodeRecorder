import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { axiosInstance } from "../../config/axiosConfig";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const DataStructureStats = ({ userId }) => {
  const [dataStructureNumber, setDataStructureNumber] = useState(0);
  const navigate = useNavigate();

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
    width: "48%",
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
          <Typography variant="h5">Data Structure Stats</Typography>
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
          onClick={() => navigate("/data-structure")}
        >
          <ArrowForwardIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
      </Box>
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

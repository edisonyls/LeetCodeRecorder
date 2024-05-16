import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import Chart from "react-apexcharts";
import { axiosInstance } from "../../config/axiosConfig";

const LeetCodeStats = ({ userId }) => {
  const [questionNumber, setQuestionNumber] = useState(null);
  const [difficultyDistribution, setDifficultyDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("question/number");
        setQuestionNumber(response.data.data);
      } catch (err) {
        console.log("Error while fetching the number of questions: " + err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `question/difficulty-distribution/${userId}`
        );
        setDifficultyDistribution(response.data.data);
      } catch (err) {
        console.log("Error while fetching the difficulty distribution: " + err);
      }
    };
    fetchData();
  }, []);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    width: "98%", // Adjust width for consistent sizing
    boxSizing: "border-box",
    margin: "10px",
    delay: 1000,
  });

  const chartOptions = {
    chart: {
      type: "donut",
    },
    colors:
      difficultyDistribution.length > 0
        ? difficultyDistribution.map((item) => {
            switch (item.difficulty) {
              case "Easy":
                return "#4CAF50";
              case "Medium":
                return "#FF9800";
              case "Hard":
                return "#F44336";
              default:
                return "#8884d8"; // default color if needed
            }
          })
        : ["#8884d8"], // default color if no data
    labels:
      difficultyDistribution.length > 0
        ? difficultyDistribution.map((item) => item.difficulty)
        : ["No Data"], // default label if no data
    legend: {
      labels: {
        colors: "white", // Set the font color to white
      },
      position: "bottom",
    },
    title: {
      text: "Level Distribution",
      align: "center",
      style: {
        fontSize: "18px",
        color: "cyan",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSeries =
    difficultyDistribution.length > 0
      ? difficultyDistribution.map((item) => item.count)
      : [1]; // default series if no data

  return (
    <animated.div style={props}>
      <Typography variant="h5" sx={{ color: "white" }}>
        LeetCode Stats
      </Typography>
      <Typography variant="body1" sx={{ color: "cyan", fontSize: "18px" }}>
        Total Question You Have Recorded:{" "}
        <span
          style={{
            padding: "2px 5px",
            borderRadius: "5px",
            backgroundColor: "limegreen",
            color: "black",
            display: "inline-block",
          }}
        >
          {questionNumber}
        </span>
      </Typography>
      <div>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="380"
        />
      </div>
    </animated.div>
  );
};

export default LeetCodeStats;

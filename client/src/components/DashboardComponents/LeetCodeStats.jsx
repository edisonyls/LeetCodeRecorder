import React, { useEffect, useState } from "react";
import { Typography, Box, Divider } from "@mui/material";
import { useSpring, animated } from "react-spring";
import Chart from "react-apexcharts";
import { axiosInstance } from "../../config/axiosConfig";
import { BlackBackgroundButton } from "../generic/GenericButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const LeetCodeStats = ({ userId }) => {
  const [questionStats, setQuestionStats] = useState({
    difficultyDistribution: [],
    createdAtStats: [],
    successDistribution: [],
    starredCount: 0,
    questionCount: 0,
    averageTimeOfCompletion: [], // Ensure this field is included
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`question/stats/${userId}`);
        setQuestionStats(response.data.data);
      } catch (err) {
        console.log("Error while fetching the question stats: " + err);
      }
    };
    fetchData();
  }, [userId]);

  const containerSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    width: "98%",
    boxSizing: "border-box",
    margin: "10px",
    delay: 500,
  });

  const itemSpring = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(50px)" },
    delay: 700,
    flex: 1,
    textAlign: "center",
    margin: "0 10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  });

  const chartSpring1 = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    delay: 900,
    flex: 1,
  });
  const chartSpring2 = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    delay: 1100,
    flex: 1,
  });
  const chartSpring3 = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    delay: 1300,
    flex: 1,
  });

  const difficultyChartOptions = {
    chart: {
      type: "donut",
    },
    colors:
      questionStats.difficultyDistribution.length > 0
        ? questionStats.difficultyDistribution.map((item) => {
            switch (item.difficulty) {
              case "Easy":
                return "#4CAF50";
              case "Medium":
                return "#FF9800";
              case "Hard":
                return "#F44336";
              default:
                return "#8884d8";
            }
          })
        : ["#8884d8"],
    labels:
      questionStats.difficultyDistribution.length > 0
        ? questionStats.difficultyDistribution.map((item) => item.difficulty)
        : ["No Data"],
    legend: {
      labels: {
        colors: "white",
      },
      position: "bottom",
    },
    title: {
      text: "Difficulty Distribution",
      align: "center",
      style: {
        fontSize: "14px",
        color: "cyan",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const difficultyChartSeries =
    questionStats.difficultyDistribution.length > 0
      ? questionStats.difficultyDistribution.map((item) => item.count)
      : [1];

  const successChartOptions = {
    chart: {
      type: "donut",
    },
    colors: ["#4CAF50", "#F44336"],
    labels: ["Success", "Failure"],
    legend: {
      labels: {
        colors: "white",
      },
      position: "bottom",
    },
    title: {
      text: "Success Distribution",
      align: "center",
      style: {
        fontSize: "14px",
        color: "cyan",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const successChartSeries =
    questionStats.successDistribution.length > 0
      ? questionStats.successDistribution.map((item) => item.count)
      : [1, 1];

  // Filter to get only the last 10 days of createdAtStats
  const createdAtStatsLast10Days = questionStats.createdAtStats
    .slice(0, 10)
    .reverse();

  const createdAtChartOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false, // Hide the extra toolbar
      },
    },
    colors: ["#fff"],
    labels:
      createdAtStatsLast10Days.length > 0
        ? createdAtStatsLast10Days.map((item) => item.createdAtDate)
        : ["No Data"],
    legend: {
      labels: {
        colors: "white",
      },
      position: "bottom",
    },
    title: {
      text: "Questions Recorded Over Last 10 Days",
      align: "center",
      style: {
        fontSize: "14px",
        color: "cyan",
      },
    },
    xaxis: {
      categories:
        createdAtStatsLast10Days.length > 0
          ? createdAtStatsLast10Days.map((item) => item.createdAtDate)
          : ["No Data"],
      labels: {
        style: {
          colors: "white", // Set the x-axis labels color to white
        },
      },
      axisBorder: {
        color: "white", // Set the x-axis border color to white
      },
      axisTicks: {
        color: "white", // Set the x-axis ticks color to white
      },
    },
    yaxis: {
      min: 0, // Set the y-axis minimum value to 0
      tickAmount: Math.max(
        ...createdAtStatsLast10Days.map((item) => item.count)
      ), // Dynamically adjust the number of ticks
      labels: {
        style: {
          colors: "white", // Set the y-axis labels color to white
        },
        formatter: function (value) {
          return Math.ceil(value); // Ensure the y-axis labels are whole numbers
        },
      },
    },
    markers: {
      size: 4, // Size of the markers (small circles)
      colors: ["#00ffff"], // Color of the markers
      strokeColors: "white", // Color of the marker border
      strokeWidth: 2, // Width of the marker border
      hover: {
        size: 6, // Size of the marker on hover
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    tooltip: {
      enabled: true, // Enable tooltip
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const createdAtChartSeries = [
    {
      name: "Questions",
      data:
        createdAtStatsLast10Days.length > 0
          ? createdAtStatsLast10Days.map((item) => item.count)
          : [1],
    },
  ];

  const renderAverageTime = () => {
    const difficulties = ["Easy", "Medium", "Hard"];
    return difficulties.map((difficulty) => {
      const stat = questionStats.averageTimeOfCompletion.find(
        (item) => item.difficulty === difficulty
      );
      return (
        <animated.div key={difficulty} style={itemSpring}>
          <Typography variant="body1" sx={{ color: "cyan", fontSize: "16px" }}>
            {difficulty} Average Time
          </Typography>
          <Typography variant="body1" sx={{ color: "white", fontSize: "14px" }}>
            {stat ? `${stat.averageTime} mins` : "N/A"}
          </Typography>
        </animated.div>
      );
    });
  };

  return (
    <animated.div style={containerSpring}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h5">LeetCode Stats</Typography>
        </Box>
        <BlackBackgroundButton
          buttonText="Enter"
          icon={<ArrowForwardIcon />}
          onClick={(e) => navigate("/table")}
        />
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="body1" sx={{ color: "cyan" }}>
          Total Questions You Have Recorded:{" "}
          <span
            style={{
              padding: "2px 5px",
              borderRadius: "5px",
              backgroundColor: "limegreen",
              color: "black",
              display: "inline-block",
            }}
          >
            {questionStats.questionCount}
          </span>
        </Typography>
        <Typography variant="body1" sx={{ color: "cyan" }}>
          Total Starred Questions:{" "}
          <span
            style={{
              padding: "2px 5px",
              borderRadius: "5px",
              backgroundColor: "gold",
              color: "black",
              display: "inline-block",
            }}
          >
            {questionStats.starredCount}
          </span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          {renderAverageTime()}
        </Box>
      </Box>

      <Divider />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <animated.div style={chartSpring1}>
          <Chart
            options={createdAtChartOptions}
            series={createdAtChartSeries}
            type="line"
            width="100%" // Make the line chart take full width
          />
        </animated.div>
        <animated.div style={chartSpring2}>
          <Chart
            options={difficultyChartOptions}
            series={difficultyChartSeries}
            type="donut"
            width="100%"
            height="290" // Adjust the height for smaller size
          />
        </animated.div>
        <animated.div style={chartSpring3}>
          <Chart
            options={successChartOptions}
            series={successChartSeries}
            type="donut"
            width="100%"
            height="290" // Adjust the height for smaller size
          />
        </animated.div>
      </Box>
    </animated.div>
  );
};

export default LeetCodeStats;

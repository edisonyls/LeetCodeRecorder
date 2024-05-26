import React, { useEffect, useState } from "react";
import { Typography, Box, Divider, IconButton } from "@mui/material";
import { useSpring, animated } from "react-spring";
import Chart from "react-apexcharts";
import { axiosInstance } from "../../config/axiosConfig";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const LeetCodeStats = ({ userId }) => {
  const [questionStats, setQuestionStats] = useState({
    difficultyDistribution: [],
    createdAtStats: [],
    successDistribution: [],
    starredCount: 0,
    questionCount: 0,
    averageTimeOfCompletion: [],
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
      : [0];

  const successChartOptions = {
    chart: {
      type: "donut",
    },
    colors:
      questionStats.difficultyDistribution.length > 0
        ? ["#4CAF50", "#F44336"]
        : ["#8884d8"],
    labels:
      questionStats.successDistribution.length > 0
        ? ["Success", "Failure"]
        : ["No Data"],
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
      : [0];

  // Function to fill missing dates with count 0
  const fillMissingDates = (stats) => {
    if (stats.length === 0) return [];

    const startDate = moment(stats[stats.length - 1].createdAtDate);
    const endDate = moment(stats[0].createdAtDate);
    const dateRange = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
      dateRange.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "days");
    }

    return dateRange.map((date) => {
      const stat = stats.find((item) => item.createdAtDate === date);
      return {
        createdAtDate: date,
        count: stat ? stat.count : 0,
      };
    });
  };

  // Filter to get only the last 10 days of createdAtStats and fill missing dates
  const createdAtStatsLast10Days = fillMissingDates(
    questionStats.createdAtStats
  ).slice(-10);

  const createdAtChartOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
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
          colors: "white",
        },
      },
      axisBorder: {
        color: "white",
      },
      axisTicks: {
        color: "white",
      },
    },
    yaxis: {
      min: 0,
      tickAmount: Math.max(
        ...createdAtStatsLast10Days.map((item) => item.count)
      ),
      labels: {
        style: {
          colors: "white",
        },
        formatter: function (value) {
          return Math.ceil(value);
        },
      },
    },
    markers: {
      size: 2,
      colors: ["#00ffff"],
      strokeColors: "white",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    tooltip: {
      enabled: true,
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
    const getColor = (difficulty) => {
      switch (difficulty) {
        case "Easy":
          return "#4CAF50";
        case "Medium":
          return "#FF9800";
        case "Hard":
          return "#F44336";
        default:
          return "white";
      }
    };

    return difficulties.map((difficulty) => {
      const stat = questionStats.averageTimeOfCompletion.find(
        (item) => item.difficulty === difficulty
      );
      return (
        <animated.div key={difficulty} style={itemSpring}>
          <Typography
            variant="body1"
            sx={{ color: getColor(difficulty), fontSize: "16px" }}
          >
            Average Time for {difficulty}
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
        <IconButton
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
            fontSize: "1.8rem",
          }}
          onClick={() => navigate("/table")}
        >
          <ArrowForwardIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
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
            width="100%"
          />
        </animated.div>
        <animated.div style={chartSpring2}>
          <Chart
            options={difficultyChartOptions}
            series={difficultyChartSeries}
            type="donut"
            width="100%"
            height="290"
          />
        </animated.div>
        <animated.div style={chartSpring3}>
          <Chart
            options={successChartOptions}
            series={successChartSeries}
            type="donut"
            width="100%"
            height="290"
          />
        </animated.div>
      </Box>
    </animated.div>
  );
};

export default LeetCodeStats;

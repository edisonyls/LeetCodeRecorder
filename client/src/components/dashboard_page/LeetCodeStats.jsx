import React, { useEffect, useState } from "react";
import { Typography, Box, Divider, IconButton } from "@mui/material";
import { useSpring, animated } from "react-spring";
import Chart from "react-apexcharts";
import { axiosInstance } from "../../config/axiosConfig";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";

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

  const renderAverageTime = () => {
    const difficulties = ["Easy", "Medium", "Hard"];

    return difficulties.map((difficulty) => {
      const stat = questionStats.averageTimeOfCompletion.find(
        (item) => item.difficulty === difficulty
      );
      return (
        <animated.div key={difficulty} style={itemSpring}>
          <Typography variant="body1" sx={{ color: "#fff", fontSize: "16px" }}>
            Average Time for {difficulty} Questions
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
          <animated.div style={chartSpring1}>
            <animated.div style={chartSpring1}>
              <Box
                sx={{
                  "& .react-calendar-heatmap text": {
                    fill: "white",
                    fontSize: "10px",
                  },
                  "& .react-calendar-heatmap .color-empty": {
                    fill: "#dcdcdc",
                  },
                  "& .react-calendar-heatmap .color-github-1": {
                    fill: "#b5d5c5",
                  },
                  "& .react-calendar-heatmap .color-github-2": {
                    fill: "#73c2a1",
                  },
                  "& .react-calendar-heatmap .color-github-3": {
                    fill: "#3b9c80",
                  },
                  "& .react-calendar-heatmap .color-github-4": {
                    fill: "#15695c",
                  },
                  "& .react-calendar-heatmap rect": {
                    pointerEvents: "auto",
                    cursor: "default",
                  },
                  "& .react-calendar-heatmap rect:focus": {
                    outline: "none",
                  },
                  "& .react-calendar-heatmap rect:hover": {
                    stroke: "#333",
                    strokeWidth: 1,
                    cursor: "pointer",
                  },
                  "& .__react_component_tooltip": {
                    backgroundColor: "#333",
                    color: "white",
                    borderRadius: "4px",
                    padding: "10px 10px",
                    fontSize: "12px",
                    textAlign: "center",

                    whiteSpace: "nowrap",
                  },
                }}
              >
                <CalendarHeatmap
                  startDate={moment().subtract(6, "months").toDate()}
                  endDate={new Date()}
                  values={questionStats.createdAtStats.map((item) => ({
                    date: item.dateOfCompletion,
                    count: item.count,
                  }))}
                  classForValue={(value) => {
                    if (!value) return "color-empty";
                    if (value.count >= 3) return "color-github-4";
                    if (value.count === 2) return "color-github-3";
                    if (value.count === 1) return "color-github-2";
                    return "color-github-1";
                  }}
                  tooltipDataAttrs={(value) => ({
                    "data-tip": value.date
                      ? `${value.count} questions recorded on ${moment(
                          value.date
                        ).format("MMM Do")}`
                      : "No question recorded",
                  })}
                />
                <ReactTooltip
                  place="top"
                  type="dark"
                  effect="solid"
                  offset={{ top: 8 }}
                />
                <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    fontSize: "12px",
                    color: "white",
                  }}
                >
                  <span>Less</span>
                  <Box
                    sx={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#dcdcdc",
                      borderRadius: "2px",
                    }}
                  />
                  <Box
                    sx={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#b5d5c5",
                      borderRadius: "2px",
                    }}
                  />
                  <Box
                    sx={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#73c2a1",
                      borderRadius: "2px",
                    }}
                  />
                  <Box
                    sx={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#3b9c80",
                      borderRadius: "2px",
                    }}
                  />
                  <Box
                    sx={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#15695c",
                      borderRadius: "2px",
                    }}
                  />
                  <span>More</span>
                </Box>
              </Box>
            </animated.div>
          </animated.div>
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

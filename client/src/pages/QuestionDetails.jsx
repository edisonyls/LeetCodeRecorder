import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import CodeSnippet from "../components/CodeSnippet";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  CardHeader,
  Avatar,
  Box,
  Paper,
} from "@mui/material";
import {
  Assignment,
  CheckCircle,
  Error,
  Timer,
  QueryStats,
  ArrowBack,
} from "@mui/icons-material";
import { WhiteBackgroundButton } from "../components/generic/GenericButton";
import GenericSpinner from "../components/generic/GenericSpinner";
import Footer from "../components/Footer";
import RandomQuote from "../components/RandomQuote";

const QuestionDetails = () => {
  const [question, setQuestion] = useState();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axiosInstance
        .get("question/" + id)
        .then((response) => {
          setQuestion(response.data.data);
          if (response.data.data.solutions !== null) {
            fetchImage(response.data.data);
          }
        })
        .catch((error) => {
          console.log("Failed to fetch data");
        });
      setLoading(false);
    };

    const fetchImage = async (question) => {
      const newImages = {};
      for (const solution of question.solutions) {
        if (solution.imageId === null || solution.imageId === "") {
          continue;
        }
        try {
          const response = await axiosInstance.get(
            `question/image/${question.id}/${solution.imageId}`,
            {
              responseType: "blob",
            }
          );
          const imageBlob = response.data;
          const imageObjectURL = URL.createObjectURL(imageBlob);

          newImages[solution.imageId] = imageObjectURL;
        } catch (error) {
          console.error("Failed to fetch image", error);
        }
      }
      setImages(newImages);
    };

    fetchData();
  }, [id]);

  if (!question || loading) {
    return (
      <>
        <AuthenticatedNavbar />
        <GenericSpinner />
      </>
    );
  }

  return (
    <>
      <AuthenticatedNavbar />
      <Container maxWidth="md" sx={{ padding: 2, minHeight: "81vh" }}>
        <WhiteBackgroundButton
          icon={<ArrowBack />}
          onClick={() => {
            navigate("/dashboard");
          }}
          buttonText="Back"
        />
        <Card
          elevation={3}
          sx={{ mt: 2, overflow: "visible", paddingBottom: 4 }}
        >
          <CardHeader
            avatar={
              <Avatar>
                <Assignment />
              </Avatar>
            }
            title={
              <Typography variant="h5">{`${question.number}. ${question.title}`}</Typography>
            }
            subheader={question.dateOfCompletion}
            action={
              <Chip
                label={question.success ? "Solved" : "Not Quite"}
                color={question.success ? "success" : "error"}
                icon={question.success ? <CheckCircle /> : <Error />}
                variant="outlined"
              />
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" component="div">
                  Difficulty{" "}
                  <Chip
                    label={question.difficulty}
                    style={{
                      backgroundColor:
                        question.difficulty === "Easy"
                          ? "#4CAF50" // Green for Easy
                          : question.difficulty === "Medium"
                          ? "#FF9800" // Orange for Medium
                          : "#F44336", // Red for Hard
                      color: "white", // Ensures text color is white for better readability
                    }}
                    icon={<QueryStats />}
                  />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="div" gutterBottom>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Timer sx={{ mr: 1 }} /> Time of Completion:{" "}
                    {question.timeOfCompletion}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="div">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Assignment sx={{ mr: 1 }} /> Attempts: {question.attempts}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          {question.solutions.map((solution, index) => (
            <Box sx={{ mb: 2, ml: 2, mr: 2 }} key={index}>
              <Typography variant="h4" sx={{ fontSize: "28px" }}>
                Solution {index + 1}
              </Typography>
              <Box>
                <Typography
                  sx={{
                    color: "#B9BBB6",
                    fontSize: "20px",
                    marginBottom: 1,
                    marginTop: 1,
                  }}
                >
                  Thinking Process:
                </Typography>

                <Box
                  sx={{
                    borderLeft: 2,
                    borderColor: "primary.main",
                    paddingLeft: 2,
                    marginLeft: 1,
                  }}
                >
                  <Typography
                    sx={{ mb: 1, whiteSpace: "pre-wrap", fontSize: "15px" }}
                  >
                    {solution.thinkingProcess}
                  </Typography>
                </Box>
              </Box>
              {solution.codeSnippet && (
                <Box>
                  <Typography
                    sx={{ mb: -1, color: "#B9BBB6", fontSize: "20px" }}
                  >
                    Code Snippet
                  </Typography>
                  <CodeSnippet code={solution.codeSnippet} />
                </Box>
              )}
              {solution.imageId && (
                <Box>
                  <Typography
                    sx={{ mb: -1, color: "#B9BBB6", fontSize: "20px" }}
                  >
                    Uploaded Image
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      mt: 2,
                      width: "96%",
                      padding: 2,
                      minHeight: "300px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={images[solution.imageId]}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "contain",
                      }}
                    />
                  </Paper>
                </Box>
              )}
            </Box>
          ))}
          <RandomQuote />
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default QuestionDetails;

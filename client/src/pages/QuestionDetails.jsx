import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
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

const QuestionDetails = () => {
  const [question, setQuestion] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
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
          if (response.data.data.questionImageId) {
            fetchImage(response.data.data.id);
          }
        })
        .catch((error) => {
          console.log("Failed to fetch data");
        });
      setLoading(false);
    };

    const fetchImage = async (imageId) => {
      setImageLoading(true);
      try {
        const response = await axiosInstance.get(`question/${imageId}/image`, {
          responseType: "blob",
        });
        const imageBlob = response.data;
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageSrc(imageObjectURL);
      } catch (error) {
        console.error("Failed to fetch image");
      } finally {
        setImageLoading(false);
      }
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
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <WhiteBackgroundButton
          icon={<ArrowBack />}
          onClick={() => {
            navigate("/dashboard");
          }}
          buttonText="Back"
        />
        <Card elevation={3} sx={{ mt: 2 }}>
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
                label={question.success ? "Yes" : "No"}
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
              <Grid item xs={12}>
                <Typography variant="body1">Thinking Process:</Typography>
                <Typography variant="body1">
                  {question.thinkingProcess}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          {!imageLoading && imageSrc && (
            <CardContent>
              <Typography variant="h6" component="div">
                Question Image:
              </Typography>
              <img
                src={imageSrc}
                alt="Question"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </CardContent>
          )}
        </Card>
      </Container>
    </>
  );
};

export default QuestionDetails;

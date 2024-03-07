import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import AddIcon from "@mui/icons-material/Add";
import { Container, Box } from "@mui/material";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { WhiteBackgroundButton } from "../components/generic/GenericButton";
import GenericSpinner from "../components/generic/GenericSpinner";
import Footer from "../components/Footer";
import GenericFormControl from "../components/generic/GenericFormControl";
import GenericSearchBox from "../components/generic/GenericSearchBox";
import QuestionsTable from "../components/QuestionsTable";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id, event) => {
    event.stopPropagation(); // Prevent click event from reaching the TableRow

    try {
      await axiosInstance.delete(`question/${id}`);
      // Remove the question from the list or refetch the list
      const updatedQuestions = questions.filter(
        (question) => question.id !== id
      );
      setQuestions(updatedQuestions);
      setOriginalQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axiosInstance
        .get("question/all")
        .then((response) => {
          setQuestions(response.data.data);
          setOriginalQuestions(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          alert("User not authenticated!");
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sortedQuestions = [...originalQuestions];
    switch (sortOption) {
      case "success":
        sortedQuestions.sort((a, b) => b.success - a.success);
        break;
      case "failure":
        sortedQuestions.sort((a, b) => a.success - b.success);
        break;
      case "easiest":
        sortedQuestions.sort((a, b) => {
          const difficultyValues = { Easy: 1, Medium: 2, Hard: 3 };
          return (
            difficultyValues[a.difficulty] - difficultyValues[b.difficulty]
          );
        });
        break;
      case "hardest":
        sortedQuestions.sort((a, b) => {
          const difficultyValues = { Easy: 1, Medium: 2, Hard: 3 };
          return (
            difficultyValues[b.difficulty] - difficultyValues[a.difficulty]
          );
        });
        break;
      case "lowest attempts":
        sortedQuestions.sort((a, b) => a.attempts - b.attempts);
        break;
      case "highest attempts":
        sortedQuestions.sort((a, b) => b.attempts - a.attempts);
        break;
      case "fastest":
        sortedQuestions.sort((a, b) => {
          return a.timeOfCompletion.localeCompare(b.timeOfCompletion);
        });
        break;
      case "slowest":
        sortedQuestions.sort((a, b) => {
          return b.timeOfCompletion.localeCompare(a.timeOfCompletion);
        });
        break;
      case "default":
        break;
      default:
        break;
    }
    if (
      sortOption !== "default" ||
      JSON.stringify(sortedQuestions) !== JSON.stringify(questions)
    ) {
      setQuestions(sortedQuestions);
    }
  }, [sortOption, originalQuestions]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <>
        <GenericSpinner />
      </>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <AuthenticatedNavbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <WhiteBackgroundButton
                component={Link}
                to="/new"
                icon={<AddIcon />}
                buttonText="New"
              />

              <GenericFormControl
                label="Show questions as"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                options={[
                  { value: "default", label: "Default" },
                  { value: "hardest", label: "Hardest" },
                  { value: "easiest", label: "Easiest" },
                  { value: "success", label: "Success" },
                  { value: "failure", label: "Failure" },
                  { value: "lowest attempts", label: "Lowest Attempts" },
                  { value: "highest attempts", label: "Highest Attempts" },
                  { value: "fastest", label: "Fastest" },
                  { value: "slowest", label: "Slowest" },
                ]}
              />
              <GenericSearchBox
                label="Search..."
                onChange={(e) => console.log(e.target.value)}
              />
            </Box>
            <QuestionsTable questions={questions} onDelete={handleDelete} />
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }
};

export default Dashboard;

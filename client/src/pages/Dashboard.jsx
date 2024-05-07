import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosConfig";
import AddIcon from "@mui/icons-material/Add";
import { Container, Box, Typography } from "@mui/material";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { WhiteBackgroundButton } from "../components/generic/GenericButton";
import GenericSpinner from "../components/generic/GenericSpinner";
import Footer from "../components/Footer";
import GenericFormControl from "../components/generic/GenericFormControl";
import GenericSearchBox from "../components/generic/GenericSearchBox";
import QuestionsTable from "../components/QuestionsTable";
import GenericDialog from "../components/generic/GenericDialog";
import { grey } from "@mui/material/colors";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [questionToDeleteId, setQuestionToDeleteId] = useState(null); // Tracks the ID of the question to be deleted

  const navigate = useNavigate();

  const handleDelete = (id, event) => {
    event.stopPropagation(); // Stop the event from propagating to the row click event
    setQuestionToDeleteId(id); // Set the ID of the question to delete
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };
  const handleConfirmDelete = async () => {
    setIsLoading(true);
    if (questionToDeleteId !== null) {
      try {
        await axiosInstance.delete(`question/${questionToDeleteId}`);
        const updatedQuestions = questions.filter(
          (question) => question.id !== questionToDeleteId
        );
        setQuestions(updatedQuestions);
        setOriginalQuestions(updatedQuestions);
      } catch (error) {
        console.error("Error deleting question:", error);
        setIsLoading(false);
      }
    }
    setOpenDeleteDialog(false);
    setQuestionToDeleteId(null);
    setIsLoading(false);
  };

  const handleOpenDialog = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/new", { state: { withTimer: false } });
  };

  const handleConfirmDialog = () => {
    setOpenDialog(false);
    navigate("/new", { state: { withTimer: true } });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("question");
        setQuestions(response.data.data);
        setOriginalQuestions(response.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false); // Ensure loading state is updated regardless of success or error
      }
    };
    fetchData();
  }, [navigate]);

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
  } else if (originalQuestions === null) {
    // Check if originalQuestions is null and render "No Data"
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4">No Data</Typography>
      </Box>
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
        <Box component="main" sx={{ flexGrow: 1, marginBottom: "4rem" }}>
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
                onClick={handleOpenDialog}
                icon={<AddIcon />}
                buttonText="New"
              />
              <GenericDialog
                isOpen={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDialog}
                title="Create with Timer?"
                content="Do you want to create a new question with a timer?"
                extraButtonOption={true}
                onExtraAction={() => setOpenDialog(false)}
                showHint={true}
                hint="The timer tracks the duration spent on solving a LeetCode problem, helping you manage and reflect on your problem-solving pace. The timer will be displayed on the top-right corner."
              />
              <GenericDialog
                isOpen={openDeleteDialog}
                onClose={() => {
                  setOpenDeleteDialog(false);
                  setQuestionToDeleteId(null); // Optionally reset the ID here as well
                }}
                onConfirm={handleConfirmDelete}
                title="Delete Question?"
                content="Are you sure to delete this question?  This action cannot be undone."
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
            {originalQuestions && originalQuestions.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "50vh", // Adjust height as needed
                }}
              >
                <Typography variant="h5" sx={{ color: grey[600] }}>
                  No Data Available
                </Typography>
              </Box>
            )}
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }
};

export default Dashboard;

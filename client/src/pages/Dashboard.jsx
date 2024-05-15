import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosConfig";
import AddIcon from "@mui/icons-material/Add";
import {
  Container,
  Box,
  Typography,
  Pagination,
  LinearProgress,
} from "@mui/material";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { WhiteBackgroundButton } from "../components/generic/GenericButton";
import GenericSpinner from "../components/generic/GenericSpinner";
import Footer from "../components/Footer";
import GenericFormControl from "../components/generic/GenericFormControl";
import QuestionsTable from "../components/QuestionsTable";
import GenericDialog from "../components/generic/GenericDialog";
import GenericSearchBox from "../components/generic/GenericSearchBox";
import { grey } from "@mui/material/colors";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [questionToDeleteId, setQuestionToDeleteId] = useState(null); // Tracks the ID of the question to be deleted
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const [page, setPage] = useState(1); // State for current page
  const [pageSize, setPageSize] = useState(7); // State for page size
  const [isFetching, setIsFetching] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0); // State for total number of questions

  const navigate = useNavigate();

  const handleToggleStar = async (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
    try {
      await axiosInstance.put(`question/toggleStar/${id}`);
      const updatedQuestions = questions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            star: !question.star,
          };
        }
        return question;
      });
      setQuestions(updatedQuestions);
      setOriginalQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error starring question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id, event) => {
    event.stopPropagation(); // Stop the event from propagating to the row click event
    event.preventDefault();
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
        setIsLoading(false);
        toast("Question deleted successfully!");
      } catch (error) {
        console.error("Error deleting question:", error);
        setIsLoading(false);
      }
    }
    setOpenDeleteDialog(false);
    setQuestionToDeleteId(null);
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

  const fetchData = async (page, size, sortOption, searchQuery) => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get("question", {
        params: { page: page - 1, size, sortOption, search: searchQuery },
      });
      setQuestions(response.data.data);
      setOriginalQuestions(response.data.data);
      setTotalQuestions(response.data.dataLength);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsFetching(false); // Ensure fetching state is updated regardless of success or error
    }
  };

  useEffect(() => {
    fetchData(page, pageSize, sortOption, searchQuery);
  }, [page, pageSize, sortOption, searchQuery, navigate]);

  const handleSearch = (query) => {
    setPage(1);
    setSearchQuery(query);
  };

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
        {isFetching && (
          <Box
            sx={{
              width: "100%",
              mt: -3,
              mb: 1,
            }}
          >
            <LinearProgress color="primary" />
          </Box>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginBottom: "4rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box sx={{ width: "33.33%" }}>
                <WhiteBackgroundButton
                  onClick={handleOpenDialog}
                  icon={<AddIcon />}
                  buttonText="New"
                />
              </Box>

              <Box
                sx={{
                  width: "33.33%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <GenericFormControl
                  label="Show questions as"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  options={[
                    { value: "default", label: "Default" },
                    { value: "difficulty", label: "Difficulty" },
                    { value: "success", label: "Success" },
                    { value: "attempts", label: "Attempts" },
                    { value: "timeOfCompletion", label: "Time of Completion" },
                    { value: "star", label: "Star" },
                  ]}
                  sx={{ width: "240px" }}
                />
              </Box>

              <Box
                sx={{
                  width: "33.33%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <GenericSearchBox label="Search..." onSearch={handleSearch} />
              </Box>
            </Box>

            <QuestionsTable
              questions={questions}
              onDelete={handleDelete}
              onToggleStar={handleToggleStar}
              sx={{
                flexGrow: 1,
              }}
            />

            {originalQuestions && originalQuestions.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Typography variant="h5" sx={{ color: grey[600] }}>
                  No Data Available
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
                alignItems: "center",
              }}
            >
              <Pagination
                count={Math.ceil(totalQuestions / pageSize)} // Ensure the value is always a valid number
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    "&.Mui-selected": {
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    },
                  },
                }}
              />
              <Box sx={{ ml: 2 }}>
                <GenericFormControl
                  label="Items per page"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  options={[
                    { value: 7, label: "7" },
                    { value: 15, label: "15" },
                    { value: 20, label: "20" },
                  ]}
                  sx={{ width: "120px" }}
                />
              </Box>
            </Box>
          </Container>
        </Box>
        <Footer />

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
          content="Are you sure to delete this question? This action cannot be undone."
        />
      </Box>
    );
  }
};

export default Dashboard;

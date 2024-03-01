import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { WhiteBackgroundButton } from "../components/GenericButton";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [originalQuestions, setOriginalQuestions] = useState([]);

  const navigate = useNavigate();

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
      await axiosInstance
        .get("question/all")
        .then((response) => {
          setQuestions(response.data.data);
          setOriginalQuestions(response.data.data);
        })
        .catch((error) => {
          alert("User not authenticated!");
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sortedQuestions = [...questions];
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
        setQuestions([...originalQuestions]); // Reset to original order
        return;
      default:
        break;
    }
    setQuestions(sortedQuestions);
  }, [sortOption, questions, originalQuestions]);

  return (
    <>
      <AuthenticatedNavbar />
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

          <FormControl sx={{ m: 1, minWidth: 240 }}>
            <InputLabel id="sort-label" sx={{ fontSize: "1rem" }}>
              Show questions as
            </InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOption}
              label="Show questions as"
              onChange={(e) => setSortOption(e.target.value)}
              size="small"
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="hardest">Hardest</MenuItem>
              <MenuItem value="easiest">Easiest</MenuItem>
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="failure">Failure</MenuItem>
              <MenuItem value="lowest attempts">Lowest Attempts</MenuItem>
              <MenuItem value="highest attempts">Highest Attempts</MenuItem>
              <MenuItem value="fastest">Fastest</MenuItem>
              <MenuItem value="slowest">Slowest</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search..."
            variant="outlined"
            size="small"
            sx={{
              width: "240px",
              "& .MuiOutlinedInput-root": {
                // set border color black
                "& fieldset": {
                  borderColor: "black",
                },
                // set border color black when hover
                "&:hover fieldset": {
                  borderColor: "black",
                },
                // Set the border color when the input is focused
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead
              sx={{
                "& .MuiTableCell-head": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              <TableRow>
                <TableCell align="center" sx={{ width: "20%" }}>
                  Date
                </TableCell>
                <TableCell align="center">Question</TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Difficulty
                </TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Success
                </TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Attempts
                </TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Time
                </TableCell>
                <TableCell sx={{ width: "5%" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question) => (
                <TableRow
                  key={question.id}
                  hover
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/question/${question.id}`, {
                      state: { id: question.id },
                    })
                  }
                >
                  <TableCell align="center" component="th" scope="row">
                    {question.dateOfCompletion}
                  </TableCell>
                  <TableCell align="center">
                    {question.number}. {question.title}
                  </TableCell>
                  <TableCell align="center">
                    <span
                      style={{
                        color:
                          question.difficulty === "Easy"
                            ? "#4CAF50"
                            : question.difficulty === "Medium"
                            ? "#FF9800"
                            : "#F44336",
                      }}
                    >
                      {question.difficulty}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    {question.success ? (
                      <CheckCircleOutlineIcon style={{ color: "green" }} />
                    ) : (
                      <HighlightOffIcon style={{ color: "red" }} />
                    )}
                  </TableCell>
                  <TableCell align="center">{question.attempts}</TableCell>
                  <TableCell align="center">
                    {question.timeOfCompletion}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={(event) => handleDelete(question.id, event)}
                    >
                      <DeleteForeverIcon style={{ color: "black" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;

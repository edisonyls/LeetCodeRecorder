import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
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
} from "@mui/material";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { WhiteBackgroundButton } from "../components/GenericButton";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [originalQuestions, setOriginalQuestions] = useState([]);

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
              Show table by
            </InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOption}
              label="Show table by"
              onChange={(e) => setSortOption(e.target.value)}
              size="small"
            >
              <MenuItem value="default">Default</MenuItem>
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
                  Success
                </TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Attempts
                </TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell align="center" component="th" scope="row">
                    {question.dateOfCompletion}
                  </TableCell>
                  <TableCell align="center">
                    {question.id}. {question.title}
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

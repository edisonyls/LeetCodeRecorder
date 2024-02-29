import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const token = JSON.parse(localStorage.getItem("user"));
      if (!token) {
        console.log("No token found in localStorage.");
        return;
      }

      axiosInstance
        .get("question/all")
        .then((response) => {
          setQuestions(response.data.data);
        })
        .catch((error) => {
          alert("User not authenticated!");
        });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            minWidth: "120px",
            height: "40px",
            borderRadius: "20px",
            borderColor: "black",
            color: "black",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "rgba(1, 1, 1, 1)",
              color: "white",
            },
          }}
        >
          + New
        </Button>
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
  );
};

export default Dashboard;

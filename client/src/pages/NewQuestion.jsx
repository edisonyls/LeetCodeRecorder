import React, { useState } from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import AddIcon from "@mui/icons-material/Add";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const difficultyOptions = ["Easy", "Medium", "Hard"];

const NewQuestion = () => {
  const [question, setQuestion] = useState({
    number: "",
    title: "",
    difficulty: "",
    dateOfCompletion: null,
    success: false,
    attempts: "",
    timeOfCompletion: null,
    thinkingProcess: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuestion((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (name, value) => {
    setQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...question,
      dateOfCompletion: question.dateOfCompletion
        ? question.dateOfCompletion.format("YYYY-MM-DD")
        : "",
      timeOfCompletion: question.timeOfCompletion
        ? question.timeOfCompletion.format("mm:ss")
        : "",
    };
    try {
      // Send the data to the backend
      const response = await axiosInstance.post("question", formattedData);
      if (response.data.serverMessage === "SUCCESS") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("An error occurred during submission", error);
    }
  };

  return (
    <div>
      <AuthenticatedNavbar />
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom>
          Upload New Question
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            label="Question Number"
            name="number"
            value={question.number}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Title"
            name="title"
            value={question.title}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            select
            label="Difficulty"
            name="difficulty"
            value={question.difficulty}
            onChange={handleChange}
          >
            {difficultyOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              <DatePicker
                label="Date of Completion"
                format="DD-MM-YYYY"
                value={question.dateOfCompletion}
                onChange={(newValue) =>
                  handleDateChange("dateOfCompletion", newValue)
                }
              />
              <TimePicker
                label="Time of Completion"
                views={["minutes", "seconds"]}
                format="mm:ss"
                value={question.timeOfCompletion}
                onChange={(newValue) =>
                  handleDateChange("timeOfCompletion", newValue)
                }
              />
            </Box>
          </LocalizationProvider>
          <FormControlLabel
            control={
              <Checkbox
                checked={question.success}
                onChange={handleChange}
                name="success"
              />
            }
            label="Success?"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Attempts"
            name="attempts"
            value={question.attempts}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Thinking Process"
            name="thinkingProcess"
            multiline
            rows={4}
            value={question.thinkingProcess}
            onChange={handleChange}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 1,
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
              <AddIcon sx={{ marginRight: 0.5, fontSize: 18 }} />
              New Solution
            </Button>
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
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default NewQuestion;

import React, { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { WhiteBackgroundButton } from "../generic/GenericButton";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

import Solution from "./Solution";
import NewQuestionFooter from "./NewQuestionFooter";

const NewQuestionForm = () => {
  const [question, setQuestion] = useState({
    number: "",
    title: "",
    difficulty: "",
    dateOfCompletion: null,
    success: false,
    attempts: "",
    timeOfCompletion: null,
    thinkingProcess: "",
    solutions: [
      {
        thinkingProcess: "",
        codeSnippet: "",
        showCodeInput: false,
        imagePreviewUrl: "",
        file: null,
        imageId: "",
      },
    ],
  });

  const difficultyOptions = ["Easy", "Medium", "Hard"];

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

  const handleSolutionChange = (event, index) => {
    const { name, value } = event.target;
    setQuestion((prevQuestion) => {
      const updatedSolutions = [...prevQuestion.solutions];
      updatedSolutions[index] = {
        ...updatedSolutions[index],
        [name]: value,
      };
      return { ...prevQuestion, solutions: updatedSolutions };
    });
  };

  const addSolution = () => {
    const newSolution = {
      thinkingProcess: "",
      codeSnippet: "",
      showCodeInput: false,
      imagePreviewUrl: "",
      file: null,
    };
    setQuestion((prevQuestions) => ({
      ...prevQuestions,
      solutions: [...prevQuestions.solutions, newSolution],
    }));
  };

  const handleDeleteSolution = (index) => {
    setQuestion((prevQuestions) => {
      // Filter out the solution at the given index
      const updatedSolutions = prevQuestions.solutions.filter(
        (_, solutionIndex) => solutionIndex !== index
      );

      return { ...prevQuestions, solutions: updatedSolutions };
    });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setQuestion((prevQuestion) => {
        const updatedSolutions = [...prevQuestion.solutions];
        updatedSolutions[index] = {
          ...updatedSolutions[index],
          imagePreviewUrl: imageUrl,
          file: file,
          inputKey: Date.now(),
        };
        return { ...prevQuestion, solutions: updatedSolutions };
      });
    }
  };

  const handleDeleteImage = (index) => {
    setQuestion((prevQuestion) => {
      const updatedSolutions = [...prevQuestion.solutions];
      updatedSolutions[index] = {
        ...updatedSolutions[index],
        imagePreviewUrl: "",
        file: null,
      };
      return { ...prevQuestion, solutions: updatedSolutions };
    });
  };

  const deleteCodeSnippet = (index) => {
    setQuestion((prevQuestion) => {
      const updatedSolutions = [...prevQuestion.solutions];
      updatedSolutions[index] = {
        ...updatedSolutions[index],
        codeSnippet: "", // Clear the codeSnippet for the solution at the specified index
      };
      return { ...prevQuestion, solutions: updatedSolutions };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadPromises = question.solutions.map(async (solution, index) => {
      const fileData = new FormData();
      fileData.append("image", solution.file);
      fileData.append("questionNumber", question.number);
      try {
        const response = await axiosInstance.post(
          "question/upload-image",
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.serverMessage === "SUCCESS") {
          return { ...solution, imageId: response.data.data };
        } else {
          console.log("Image upload failed for solution", index);
          return solution;
        }
      } catch (error) {
        console.error(
          "An error occurred during submission for solution",
          index,
          error
        );
        return solution;
      }
    });

    try {
      // Wait for all the image upload promises to complete
      const updatedSolutions = await Promise.all(uploadPromises);
      question.solutions = updatedSolutions;
      console.log(updatedSolutions);
      submitRestData(); // Now submit the rest of the data
      navigate("/dashboard");
    } catch (error) {
      console.error("An error occurred during image uploads", error);
    }
  };

  const submitRestData = async (e) => {
    const formattedData = {
      ...question,
      dateOfCompletion: question.dateOfCompletion
        ? question.dateOfCompletion.format("YYYY-MM-DD")
        : "",
      timeOfCompletion: question.timeOfCompletion
        ? question.timeOfCompletion.format("HH:mm")
        : "",
      solutions: question.solutions.map((solution) => ({
        thinkingProcess: solution.thinkingProcess,
        codeSnippet: solution.codeSnippet,
        imageId: solution.imageId, // Ensure this is the ID obtained after image upload
      })),
    };
    try {
      const response = await axiosInstance.post("question", formattedData);
      if (response.data.serverMessage === "SUCCESS") {
        console.log("Form submission successful", response.data.data);
      }
    } catch (error) {
      console.error("An error occurred during form submission", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginBottom: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography sx={{ mt: 1 }} variant="h6" gutterBottom>
          Upload New Question
        </Typography>
        <WhiteBackgroundButton
          component={Link}
          to="/dashboard"
          buttonText="Back"
        />
      </Box>
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
              marginTop: 2,
              marginBottom: 1,
              flexWrap: "wrap",
              gap: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <DatePicker
              label="Date of Completion"
              format="DD-MM-YYYY"
              value={question.dateOfCompletion}
              onChange={(newValue) =>
                handleDateChange("dateOfCompletion", newValue)
              }
              sx={{ minWidth: "auto", flexGrow: 1, margin: "auto" }} // Adjust sizing and spacing
            />
            <TimePicker
              label="Time of Completion"
              views={["minutes", "seconds"]}
              format="mm:ss"
              value={question.timeOfCompletion}
              onChange={(newValue) =>
                handleDateChange("timeOfCompletion", newValue)
              }
              sx={{ minWidth: "auto", flexGrow: 1, margin: "auto" }} // Adjust sizing and spacing
            />
            <TextField
              margin="normal"
              fullWidth={false}
              label="Attempts"
              name="attempts"
              value={question.attempts}
              onChange={handleChange}
              sx={{ minWidth: "auto", margin: "auto", flexGrow: 1 }} // Adjust sizing and spacing
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
          label="Did you make it?"
        />

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Solutions
        </Typography>
        {question.solutions.map((solution, index) => (
          <Solution
            key={index}
            solutionId={index + 1}
            deleteSolution={() => handleDeleteSolution(index)}
            thinkingProcess={solution.thinkingProcess}
            codeSnippet={solution.codeSnippet}
            handleChange={(e) => handleSolutionChange(e, index)}
            deleteCodeSnippet={() => deleteCodeSnippet(index)}
            imagePreviewUrl={solution.imagePreviewUrl}
            handleFileChange={(e) => handleFileChange(e, index)}
            handleDeleteImage={() => handleDeleteImage(index)}
          />
        ))}

        <NewQuestionFooter onClick={addSolution} />
      </form>
    </Container>
  );
};

export default NewQuestionForm;

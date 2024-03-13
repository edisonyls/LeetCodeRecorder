import React, { useState, useEffect } from "react";
import { Container, TextField, MenuItem, Typography, Box } from "@mui/material";
import SuccessToggle from "./SuccessToggle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

import Solution from "./Solution";
import NewQuestionFooter from "./NewQuestionFooter";

const NewQuestionForm = ({ timerValue }) => {
  const [question, setQuestion] = useState({
    number: "",
    title: "",
    difficulty: "",
    dateOfCompletion: null,
    success: false,
    attempts: "",
    timeOfCompletion: null,
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
    const { name, value } = e.target;
    if (name === "number" || name === "attempts") {
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue) && value.match(/^\d*$/)) {
        setQuestion((prevState) => ({
          ...prevState,
          [name]: intValue,
        }));
      } else if (value === "") {
        // Allow clearing the field
        setQuestion((prevState) => ({
          ...prevState,
          [name]: "",
        }));
      }
      return;
    }

    setQuestion((prevState) => ({
      ...prevState,
      [name]: value,
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
    const lastSolution = question.solutions[question.solutions.length - 1];
    if (
      !lastSolution.thinkingProcess.trim() &&
      !lastSolution.codeSnippet.trim() &&
      !lastSolution.imagePreviewUrl
    ) {
      alert("Please fill in the current solution before adding a new one.");
      return;
    }
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
        codeSnippet: "",
      };
      return { ...prevQuestion, solutions: updatedSolutions };
    });
  };

  const validateData = () => {
    if (question.dateOfCompletion === null) {
      alert("Date of Completion is required.");
      return false;
    } else if (dayjs(question.dateOfCompletion).isAfter(dayjs())) {
      alert("Date of Completion cannot be in the future.");
      return false;
    } else if (question.timeOfCompletion === null) {
      alert("Time of Completion is required.");
      return false;
    } else if (!dayjs(question.timeOfCompletion).isValid()) {
      alert("Time of Completion is invalid.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidData = validateData();
    if (!isValidData) {
      return;
    }
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
        imageId: solution.imageId,
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

  useEffect(() => {
    if (timerValue) {
      const [minutes, seconds] = timerValue.split(":").map(Number);
      const newValue = dayjs().hour(0).minute(minutes).second(seconds);
      setQuestion((prevState) => ({
        ...prevState,
        timeOfCompletion: newValue,
      }));
    }
  }, [timerValue]);
  return (
    <Container maxWidth="md" sx={{ marginBottom: 4 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          label="Question Number"
          name="number"
          value={question.number}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Title"
          name="title"
          value={question.title}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          select
          label="Difficulty"
          name="difficulty"
          value={question.difficulty}
          onChange={handleChange}
          required
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
              maxDate={dayjs()}
              onChange={(newValue) =>
                handleDateChange("dateOfCompletion", newValue)
              }
              sx={{ minWidth: "auto", flexGrow: 1, margin: "auto" }}
            />
            <TimePicker
              label="Time of Completion"
              views={["minutes", "seconds"]}
              format="mm:ss"
              value={question.timeOfCompletion}
              onChange={(newValue) =>
                handleDateChange("timeOfCompletion", newValue)
              }
              // renderInput={(params) => <TextField {...params} />}
              sx={{ minWidth: "auto", flexGrow: 1, margin: "auto" }}
            />
            <TextField
              margin="normal"
              fullWidth={false}
              label="Attempts"
              name="attempts"
              value={question.attempts}
              onChange={handleChange}
              sx={{ minWidth: "auto", margin: "auto", flexGrow: 1 }}
              required
            />
          </Box>
        </LocalizationProvider>
        <SuccessToggle
          onChange={(success) =>
            setQuestion((prevState) => ({
              ...prevState,
              success: success,
            }))
          }
        />

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Solutions
        </Typography>
        <Box sx={{ mt: 2 }}>
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
              showDeleteButton={question.solutions.length > 1}
            />
          ))}
        </Box>

        <NewQuestionFooter onClick={addSolution} />
      </form>
    </Container>
  );
};

export default NewQuestionForm;

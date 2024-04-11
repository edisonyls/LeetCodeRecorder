import React, { useState, useEffect } from "react";
import { Container, TextField, MenuItem, Typography, Box } from "@mui/material";
import SuccessToggle from "./SuccessToggle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosConfig";

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
    timeOfCompletion: "",
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

  const handleTimeChange = (prop, value) => {
    let numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      numericValue = 0;
    }

    if (prop === "minutes") {
      numericValue = Math.max(numericValue, 0);
    } else if (prop === "seconds") {
      numericValue = Math.max(0, Math.min(numericValue, 59));
    }

    const stringValue = numericValue.toString();

    setQuestion((prevQuestion) => {
      const timeParts = prevQuestion.timeOfCompletion.split(":");
      if (prop === "minutes") {
        timeParts[0] = stringValue;
      } else {
        timeParts[1] = stringValue.padStart(2, "0");
      }
      return {
        ...prevQuestion,
        timeOfCompletion: timeParts.join(":"),
      };
    });
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
      imageId: "",
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
      if (solution.file) {
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
      } else {
        return solution; // Return the original solution if there's no file to upload
      }
    });
    try {
      // Wait for all the image upload promises to complete
      const updatedSolutions = await Promise.all(uploadPromises);
      question.solutions = updatedSolutions;
      submitRestData();
      navigate("/dashboard");
    } catch (error) {
      console.error("An error occurred during image uploads", error);
    }
  };

  const submitRestData = async () => {
    const formattedData = {
      ...question,
      dateOfCompletion: question.dateOfCompletion
        ? question.dateOfCompletion.format("YYYY-MM-DD")
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
      setQuestion((prevState) => ({
        ...prevState,
        timeOfCompletion: timerValue,
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
              gap: 2,
            }}
          >
            <DatePicker
              label="Date of Completion *"
              format="DD-MM-YYYY"
              value={question.dateOfCompletion}
              maxDate={dayjs()}
              onChange={(newValue) =>
                handleDateChange("dateOfCompletion", newValue)
              }
              sx={{ minWidth: "auto", flexGrow: 3, margin: "auto" }}
            />
            <TextField
              label="Minutes Spent"
              name="minutes"
              value={question.timeOfCompletion.split(":")[0]}
              onChange={(e) => handleTimeChange("minutes", e.target.value)}
              sx={{ flexGrow: 1 }}
              required
            />
            <TextField
              label="Seconds Spent"
              name="seconds"
              value={question.timeOfCompletion.split(":")[1] || ""}
              onChange={(e) => handleTimeChange("seconds", e.target.value)}
              sx={{ flexGrow: 1 }}
              required
            />
            <TextField
              margin="normal"
              label="Attempts"
              name="attempts"
              value={question.attempts}
              onChange={handleChange}
              sx={{ flexGrow: 1 }}
              required
            />
          </Box>
        </LocalizationProvider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Typography sx={{ marginBottom: 1 }}>
            Did you solve this LeetCode problem? *
          </Typography>
          <SuccessToggle
            onChange={(success) =>
              setQuestion((prevState) => ({
                ...prevState,
                success: success,
              }))
            }
          />
        </Box>

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

import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SuccessToggle from "./SuccessToggle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Solution from "./Solution";
import NewQuestionFooter from "./NewQuestionFooter";
import { Star, StarBorder } from "@mui/icons-material";
import { toast } from "react-toastify";
import { GenericDialog } from "../generic/GenericDialog";
import { useQuestionHooks } from "../../hooks/useQuestionHooks";
import { axiosInstance } from "../../config/axiosConfig";

const UpdateQuestionForm = ({ initialQuestion }) => {
  const [question, setQuestion] = useState(
    initialQuestion
      ? {
          ...initialQuestion,
          dateOfCompletion: initialQuestion.dateOfCompletion
            ? dayjs(initialQuestion.dateOfCompletion)
            : null,
        }
      : {}
  );

  const [deleteSolutionPopUp, setDeleteSolutionPopUp] = useState(false);
  const [solutionDeleteId, setSolutionDeleteId] = useState(null);

  const { handleUpdateSubmit } = useQuestionHooks(question, initialQuestion);

  const difficultyOptions = ["Easy", "Medium", "Hard"];

  useEffect(() => {
    const fetchImages = async () => {
      const newSolutions = [...question.solutions];
      let updatesMade = false;

      for (const [index, solution] of newSolutions.entries()) {
        if (solution.imageId && !solution.imagePreviewUrl) {
          try {
            const response = await axiosInstance.get(
              `question/image/${question.id}/${solution.imageId}`,
              {
                responseType: "blob",
              }
            );
            const imageBlob = response.data;
            const imageObjectURL = URL.createObjectURL(imageBlob);
            newSolutions[index].imagePreviewUrl = imageObjectURL;
            updatesMade = true;
          } catch (error) {
            console.error(
              "Failed to fetch image for solution",
              solution.imageId,
              error
            );
          }
        }
      }

      if (updatesMade) {
        setQuestion((prev) => ({ ...prev, solutions: newSolutions }));
      }
    };

    if (question.solutions) {
      fetchImages();
    }
  }, [question.id, question.solutions]);

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
      [name]: dayjs(value).format(),
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
      toast.error(
        "Please fill in the current solution before adding a new one."
      );

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

  const handleDeleteSolution = () => {
    setQuestion((prevQuestions) => {
      // Filter out the solution at the given index
      const updatedSolutions = prevQuestions.solutions.filter(
        (_, solutionIndex) => solutionIndex !== solutionDeleteId
      );
      setSolutionDeleteId(null);
      setDeleteSolutionPopUp(false);
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
        imageId: "",
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

  return (
    <Container maxWidth="md" sx={{ marginBottom: 4 }}>
      <form onSubmit={handleUpdateSubmit}>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          General Information
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            margin="normal"
            label="Question Number"
            name="number"
            fullWidth
            value={question.number}
            onChange={handleChange}
            required
          />
          <IconButton
            onClick={() => {
              setQuestion((prev) => ({ ...prev, star: !prev.star }));
              if (question.star) {
                toast("Unmarked Important");
              } else {
                toast("Marked Important");
              }
            }}
            sx={{ marginRight: "10%", marginLeft: "10%" }}
          >
            {question.star ? (
              <Star sx={{ color: "#ffd250", fontSize: "2rem" }} />
            ) : (
              <StarBorder sx={{ fontSize: "2rem" }} />
            )}
          </IconButton>
        </Box>
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">minutes</InputAdornment>
                ),
              }}
            />

            <TextField
              label="Seconds Spent"
              name="seconds"
              value={question.timeOfCompletion.split(":")[1] || ""}
              onChange={(e) => handleTimeChange("seconds", e.target.value)}
              sx={{ flexGrow: 1 }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">seconds</InputAdornment>
                ),
              }}
            />
          </Box>
        </LocalizationProvider>
        <TextField
          margin="normal"
          label="Number of Attempts"
          name="attempts"
          value={question.attempts}
          onChange={handleChange}
          sx={{ flexGrow: 1 }}
          required
          fullWidth
        />
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
            success={question.success}
            onChange={(success) =>
              setQuestion((prevState) => ({
                ...prevState,
                success: success,
              }))
            }
          />
        </Box>

        {question.success === false && (
          <Box>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Possible Obstacles
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Enter your possible obstacles"
                name="reasonOfFail"
                multiline
                value={question.reasonOfFail}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
            </Box>
          </Box>
        )}

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Solutions
        </Typography>
        <Box sx={{ mt: 2 }}>
          {question.solutions.map((solution, index) => (
            <Solution
              key={index}
              solutionId={index + 1}
              deleteSolution={() => {
                setDeleteSolutionPopUp(true);
                setSolutionDeleteId(index);
              }}
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
      <GenericDialog
        isOpen={deleteSolutionPopUp}
        onClose={() => {
          setDeleteSolutionPopUp(false);
          setSolutionDeleteId(null);
        }}
        onConfirm={handleDeleteSolution}
        title={`Deleting Solution ${solutionDeleteId + 1}`}
        content="Do you want to delete this solution?"
      />
    </Container>
  );
};

export default UpdateQuestionForm;

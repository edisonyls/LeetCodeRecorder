import React, { useState } from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import AddIcon from "@mui/icons-material/Add";
import {
  Container,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { WhiteBackgroundButton } from "../components/GenericButton";

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

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now());

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
      setSelectedFile(file); // Store the file object for later use
    }
  };

  const handleDeleteImage = () => {
    setImagePreviewUrl(""); // Clear the image preview URL
    setInputKey(Date.now()); // Change the key to force re-render the input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formattedData = {
      ...question,
      dateOfCompletion: question.dateOfCompletion
        ? question.dateOfCompletion.format("YYYY-MM-DD")
        : "",
      timeOfCompletion: question.timeOfCompletion
        ? question.timeOfCompletion.format("mm:ss")
        : "",
    };

    formData.append("question", JSON.stringify(formattedData));

    if (selectedFile) {
      formData.append("file", selectedFile); // Append the file to the FormData object if available
    }
    console.log(formattedData);
    try {
      // Send the data to the backend
      const response = await axiosInstance.post("question", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
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
          <Box marginY={2}>
            {/* Conditionally render the upload button based on whether an imagePreviewUrl is set */}
            {!imagePreviewUrl && (
              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  id="fileInput"
                  key={inputKey} // Use the key state here
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            )}

            {imagePreviewUrl && (
              <Box mt={2}>
                <Typography variant="body2">Image Preview:</Typography>
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteImage}
                  sx={{ mt: 2 }}
                >
                  Delete Image
                </Button>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 1,
            }}
          >
            <WhiteBackgroundButton
              buttonText="New Solution"
              icon={<AddIcon />}
            />
            <WhiteBackgroundButton buttonText="Submit" type="submit" />
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default NewQuestion;

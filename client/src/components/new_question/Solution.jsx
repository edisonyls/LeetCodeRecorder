import React, { useState } from "react";
import {
  Typography,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  WarningButton,
  WhiteBackgroundButton,
  WhiteBackgroundButtonWithInput,
} from "../generic/GenericButton";

const Solution = ({
  solutionId,
  deleteSolution,
  thinkingProcess,
  handleChange,
  codeSnippet,
  deleteCodeSnippet,
  imagePreviewUrl,
  handleFileChange,
  handleDeleteImage,
  showDeleteButton,
}) => {
  const [showCodeInput, setShowCodeInput] = useState(codeSnippet !== "");

  const handleOnClick = () => {
    deleteCodeSnippet();
    setShowCodeInput(false);
  };

  const handleTabInTextField = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const cursorPosition = event.target.selectionStart;
      const beforeTab = thinkingProcess.substring(0, cursorPosition);
      const afterTab = thinkingProcess.substring(cursorPosition);
      const updatedText = beforeTab + "        " + afterTab;
      handleChange({ target: { name: event.target.name, value: updatedText } });
      setTimeout(() => {
        event.target.selectionStart = event.target.selectionEnd =
          cursorPosition + 8;
      }, 0); // Set cursor position right after the inserted tab
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Typography variant="h6">Solution {solutionId}</Typography>
        {showDeleteButton && (
          <IconButton onClick={deleteSolution}>
            <DeleteForeverIcon style={{ color: "black" }} />
          </IconButton>
        )}
      </Box>

      <Typography
        variant="body2"
        sx={{ marginBottom: "1rem", marginLeft: "1rem" }}
      >
        Thinking Process
      </Typography>
      <TextField
        fullWidth
        label="Enter your thinking process"
        name="thinkingProcess"
        multiline
        value={thinkingProcess}
        onChange={handleChange}
        onKeyDown={handleTabInTextField}
        sx={{ marginBottom: 2 }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: showCodeInput || imagePreviewUrl ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {showCodeInput ? (
          <Box
            sx={{
              alignItems: "flex-start",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{ marginBottom: "1rem", marginLeft: "1rem" }}
            >
              Code Snippet
            </Typography>
            <TextField
              fullWidth
              label="Paste your code snippet here"
              name="codeSnippet"
              multiline
              value={codeSnippet}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleOnClick} edge="end">
                      <DeleteForeverIcon style={{ color: "black" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        ) : (
          <WhiteBackgroundButton
            buttonText="Upload Code"
            onClick={() => {
              setShowCodeInput(true);
            }}
          />
        )}

        {imagePreviewUrl ? (
          <Paper
            elevation={0}
            sx={{ width: "96%", padding: 2, marginTop: "-1rem" }}
          >
            <Typography variant="body2" sx={{ marginBottom: "8px" }}>
              Image Preview:
            </Typography>
            <img
              src={imagePreviewUrl}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                marginBottom: "1rem",
              }}
            />
            <WarningButton
              buttonText="Delete Image"
              onClick={handleDeleteImage}
            />
          </Paper>
        ) : (
          <WhiteBackgroundButtonWithInput
            buttonText="Upload Image"
            inputType="file"
            inputId="fileInput"
            inputOnChange={handleFileChange}
          />
        )}
      </Box>
    </Paper>
  );
};

export default Solution;

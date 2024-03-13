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
  const [showCodeInput, setShowCodeInput] = useState(false);

  const handleOnClick = () => {
    deleteCodeSnippet();
    setShowCodeInput(false);
  };

  const calculateRows = (text, row) => {
    const lines = text.split("\n");
    if (lines.length === 1) {
      return row;
    } else {
      return lines.length;
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
      <TextField
        fullWidth
        label="Thinking Process"
        name="thinkingProcess"
        multiline
        sx={{ marginBottom: 2 }}
        rows={calculateRows(thinkingProcess, 2)}
        value={thinkingProcess}
        onChange={handleChange}
      />
      <Typography variant="h8">Code Snippet</Typography>
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
          <TextField
            margin="normal"
            fullWidth
            label="Paste your code snippet here"
            name="codeSnippet"
            rows={calculateRows(codeSnippet, 6)}
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
        ) : (
          <WhiteBackgroundButton
            buttonText="Upload Code"
            onClick={() => {
              setShowCodeInput(true);
            }}
          />
        )}

        {imagePreviewUrl ? (
          <Paper elevation={0} sx={{ mt: 2, width: "96%", padding: 2 }}>
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
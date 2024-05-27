import React from "react";
import { TextField } from "@mui/material";

const AlgorithmTextField = ({ label, value, onChange, multiline }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      multiline={multiline}
      sx={{
        backgroundColor: "#121212",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
        "& .MuiInputLabel-root": {
          color: "white",
        },
        "& .MuiOutlinedInput-input": {
          color: "white",
        },
      }}
    />
  );
};

export default AlgorithmTextField;

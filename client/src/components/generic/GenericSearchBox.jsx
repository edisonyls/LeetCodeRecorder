import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

function GenericSearchBox({ label = "Search...", onChange }) {
  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "black",
          },
          "&:hover fieldset": {
            borderColor: "black",
          },
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
      onChange={onChange}
    />
  );
}

export default GenericSearchBox;

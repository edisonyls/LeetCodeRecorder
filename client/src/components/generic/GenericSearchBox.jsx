import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const GenericSearchBox = ({ label, onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        label={label}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default GenericSearchBox;

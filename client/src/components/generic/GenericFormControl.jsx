import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function GenericFormControl({ label, value, onChange, options, ...props }) {
  return (
    <FormControl
      sx={{
        m: 1,
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
        ...props.sx,
      }}
      {...props}
    >
      <InputLabel id={`${label}-label`} sx={{ fontSize: "1rem" }}>
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={value}
        label={label}
        onChange={onChange}
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default GenericFormControl;

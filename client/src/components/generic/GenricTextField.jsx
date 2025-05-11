import { TextField } from "@mui/material";

const GenericTextField = ({
  label,
  name,
  value,
  onChange,
  inputLabelColor,
  inputColor,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      InputLabelProps={{
        sx: {
          color: inputLabelColor,
        },
      }}
      InputProps={{
        sx: {
          color: inputColor,
        },
      }}
    />
  );
};

export default GenericTextField;

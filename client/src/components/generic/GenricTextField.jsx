import { TextField } from "@mui/material";

const GenericTextField = ({
  label,
  name,
  value,
  onChange,
  inputLabelColor,
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
    />
  );
};

export default GenericTextField;

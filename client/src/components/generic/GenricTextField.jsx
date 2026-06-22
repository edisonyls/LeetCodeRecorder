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
      slotProps={{
        inputLabel: {
          sx: {
            color: inputLabelColor,
          },
        },
        input: {
          sx: {
            color: inputColor,
          },
        },
      }}
    />
  );
};

export default GenericTextField;

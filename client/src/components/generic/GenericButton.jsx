import React, { useRef } from "react";
import Button from "@mui/material/Button";

// GenericButton component
export const WhiteBackgroundButton = ({ buttonText, icon, ...props }) => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={{
        minWidth: "120px",
        height: "40px",
        borderRadius: "20px",
        borderColor: "black",
        color: "black",
        "&:hover": {
          borderColor: "black",
          backgroundColor: "rgba(1, 1, 1, 1)",
          color: "white",
        },
        ...props.sx,
      }}
      {...props}
    >
      {icon && <span style={{ marginTop: 5, marginRight: 5 }}>{icon}</span>}
      {buttonText}
    </Button>
  );
};

export const BlackBackgroundButton = ({ buttonText, icon, ...props }) => {
  return (
    <Button
      sx={{
        color: "inherit",
        borderColor: "white",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "20px",
        marginLeft: 2,
        "&:hover": {
          backgroundColor: "white",
          color: "black",
        },
      }}
      {...props}
    >
      {buttonText}
    </Button>
  );
};

export const WarningButton = ({ buttonText, icon, ...props }) => {
  return (
    <Button
      sx={{
        color: "inherit",
        borderColor: "black",
        backgroundColor: "red",

        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "20px",
        marginLeft: 2,
        "&:hover": {
          backgroundColor: "red",
          color: "white",
        },
      }}
      {...props}
    >
      {buttonText}
    </Button>
  );
};

export const WhiteBackgroundButtonWithInput = ({
  buttonText,
  icon,
  inputType,
  inputId,
  inputKey,
  inputOnChange,
  ...props
}) => {
  const inputRef = useRef(null);

  // Function to trigger input click on button click
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={{
        minWidth: "120px",
        height: "40px",
        borderRadius: "20px",
        borderColor: "black",
        color: "black",
        "&:hover": {
          borderColor: "black",
          backgroundColor: "rgba(1, 1, 1, 1)",
          color: "white",
        },
        ...props.sx,
      }}
      onClick={handleButtonClick}
      {...props}
    >
      {icon && <span style={{ marginTop: 5, marginRight: 5 }}>{icon}</span>}
      {buttonText}
      <input
        type={inputType}
        id={inputId}
        key={inputKey}
        hidden
        onChange={inputOnChange}
        ref={inputRef}
      />
    </Button>
  );
};

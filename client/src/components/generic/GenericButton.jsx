import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

// GenericButton component
export const WhiteBackgroundButton = ({
  buttonText,
  icon,
  selected,
  ...props
}) => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={{
        minWidth: "120px",
        height: "40px",
        borderRadius: "20px",
        borderColor: selected ? "white" : "black",
        backgroundColor: selected ? "rgba(1, 1, 1, 1)" : "transparent",
        color: selected ? "white" : "black",
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

export const BlackBackgroundButton = ({
  buttonText,
  icon,
  selected,
  disabled,
  ...props
}) => {
  return (
    <Button
      disabled={disabled}
      sx={{
        color: "white",
        borderColor: "white",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "20px",
        "&:hover": {
          backgroundColor: "white",
          color: "black",
        },
        "&:disabled": {
          color: "grey",
          backgroundColor: "#fff",
        },
      }}
      {...props}
    >
      {buttonText}
    </Button>
  );
};

export const WarningButton = ({ buttonText, icon, selected, ...props }) => {
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
        ...props.sx,
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

export const GreyBackgroundButton = ({ buttonText, icon, ...props }) => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={{
        minWidth: "120px",
        height: "40px",
        borderRadius: "20px",
        borderColor: grey[50],
        ml: 1,
        mr: 1,
        "&:hover": {
          backgroundColor: grey[50],
          color: "black",
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

export const GreyBackgroundButtonWithInput = ({
  buttonText,
  icon,
  inputType,
  inputId,
  inputKey,
  inputOnChange,
  ...props
}) => {
  const inputRef = useRef(null);
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
        borderColor: grey[50],
        ml: 1,
        mr: 1,
        "&:hover": {
          backgroundColor: grey[50],
          color: "black",
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

export const LightGreyBackgroundButton = ({
  buttonText,
  icon,
  selected,
  ...props
}) => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={{
        minWidth: "120px",
        height: "40px",
        borderRadius: "20px",
        borderColor: selected ? "white" : grey[800],
        backgroundColor: selected ? grey[800] : "transparent",
        color: selected ? grey[50] : grey[800],
        "&:hover": {
          borderColor: grey[800],
          backgroundColor: grey[800],
          color: grey[50],
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

export const SmallNarrowButton = ({ buttonText, icon, selected, ...props }) => {
  return (
    <Button
      component={Link}
      to="/upgrade"
      size="small" // Makes the button smaller
      sx={{
        minWidth: "40px", // Sets a narrow width
        padding: "4px", // Reduces padding for a more compact look
        fontSize: "0.75rem", // Smaller font size
        lineHeight: 1, // Adjusts line height to match smaller size
        backgroundColor: "#B9F2FF",
        color: "black",
        "&:hover": {
          borderColor: "#00FF00",
          backgroundColor: "#00FF00",
          color: "black",
        },
      }}
    >
      {buttonText}
    </Button>
  );
};

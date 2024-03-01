import React from "react";
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

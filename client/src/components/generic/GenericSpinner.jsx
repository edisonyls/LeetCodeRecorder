import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GenericSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        "& .MuiCircularProgress-root": {
          animation: "spin 1.5s linear infinite",
        },
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      }}
    >
      <CircularProgress
        size={60}
        thickness={5}
        sx={{
          color: "black",
        }}
      />
    </Box>
  );
};

export default GenericSpinner;

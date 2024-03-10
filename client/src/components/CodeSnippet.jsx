import React from "react";
import { Box, Typography } from "@mui/material";

const CodeSnippet = ({ code }) => {
  return (
    <Box
      component="pre"
      sx={{
        display: "block",
        padding: "12px",
        overflowX: "auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
        border: "1px solid #ddd",
        color: "#333",
        fontSize: "0.875rem",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}
    >
      <Typography component="code" sx={{ wordBreak: "break-all" }}>
        {code}
      </Typography>
    </Box>
  );
};

export default CodeSnippet;

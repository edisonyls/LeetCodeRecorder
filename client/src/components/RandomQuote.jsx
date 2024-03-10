import React, { useState, useEffect } from "react";
import quotes from "../general/quote";
import { Typography, Box } from "@mui/material";

const RandomQuote = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSelectedQuote(randomQuote);
  }, []);

  if (!selectedQuote) return null;

  return (
    <Box
      sx={{
        maxWidth: "100%",
        alignItems: "center",
        textAlign: "center",
        mt: 5,
      }}
    >
      <Typography variant="h8" sx={{ color: "gray" }}>
        "{selectedQuote.text}"
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "gray" }}>
        ― {selectedQuote.author}
      </Typography>
    </Box>
  );
};

export default RandomQuote;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Saira Semi Condensed","JetBrains Mono", sans-serif',
    fontWeightBold: 600,
    allVariants: {
      fontWeight: 600,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";

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
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

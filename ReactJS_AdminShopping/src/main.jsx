import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"; // Corrected the import to ThemeProvider
import { ThemProvider } from "./Context/ThemContext"; // Assuming it's a custom context provider
import { SearchProvider } from "./Context/SearchContext"; // Assuming it's a custom context provider
import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <ThemProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemProvider>
      </SearchProvider>
    </ThemeProvider>
  </React.StrictMode>
);

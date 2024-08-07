import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { CssBaseline } from "@mui/material";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          <PrimeReactProvider>
            <App />
          </PrimeReactProvider>
          <Toaster />
        </BrowserRouter>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);

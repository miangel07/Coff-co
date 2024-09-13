import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/Idioms.jsx";
import { TranslateProvider } from "./context/TranslationoContex.jsx";

import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          <PrimeReactProvider>
            <I18nextProvider i18n={i18n}>
              <TranslateProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </TranslateProvider>
            </I18nextProvider>
          </PrimeReactProvider>
          <Toaster />
        </BrowserRouter>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);

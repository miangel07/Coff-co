import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import ValidarLogin from "./utils/ValidarLogin.jsx";
import { PrimeReactProvider } from "primereact/api";
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
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
            <PrimeReactProvider>
              <AuthProvider>
                <App/>
                {/* <ValidarLogin/> */}
              </AuthProvider>
            </PrimeReactProvider>
          <Toaster />
        </BrowserRouter>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);

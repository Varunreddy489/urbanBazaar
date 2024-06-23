import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AdminAuthContextProvider } from "./context/AdminAuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AdminAuthContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AdminAuthContextProvider>
);

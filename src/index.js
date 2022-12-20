// React etc
import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import App from "./components/App";

// Render
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

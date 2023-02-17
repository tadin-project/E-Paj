import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "startbootstrap-sb-admin/dist/css/styles.css";

import "@fortawesome/fontawesome-free/js/all";
import "bootstrap/dist/js/bootstrap";
import "startbootstrap-sb-admin/dist/js/scripts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

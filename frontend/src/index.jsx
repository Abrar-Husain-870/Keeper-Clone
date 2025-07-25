import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./App.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

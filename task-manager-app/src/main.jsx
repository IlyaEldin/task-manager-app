import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserProvider from "./context/UserContext/UserProvider.jsx";
import ThemeProvider from "./context/ThemeContext/ThemeProvider.jsx";
import { TasksProvider } from "./context/TasksContext/TasksProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);

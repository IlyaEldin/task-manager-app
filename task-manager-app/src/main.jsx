import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserProvider from "./context/UserContext/UserProvider.jsx";
import ThemeProvider from "./context/ThemeContext/ThemeProvider.jsx";
import { TasksProvider } from "./context/TasksContext/TasksProvider.jsx";
import { ModalProvider } from "./context/ModalContext/ModalProvider.jsx";
import { SelectionProvider } from "./context/SelectionContext/SelectionProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <TasksProvider>
        <UserProvider>
          <SelectionProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </SelectionProvider>
        </UserProvider>
      </TasksProvider>
    </ThemeProvider>
  </StrictMode>
);

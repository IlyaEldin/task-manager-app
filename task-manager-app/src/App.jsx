import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext/UserContext";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Tasks from "./components/Tasks/Tasks";
import Settings from "./components/Settings/Settings";
import AuthForm from "./components/AuthForm/AuthForm";
import { Navigate } from "react-router-dom";

function App() {
  const { isAuthenticated, isLoading, login, register } =
    useContext(UserContext);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path='/*' element={<Layout />}>
            <Route path='tasks' element={<Tasks />} />
            <Route path='home' element={<Home />} />
            <Route path='settings' element={<Settings />} />

            <Route path='' element={<Navigate to='/home' replace />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
          </Route>
        ) : (
          <>
            <Route
              path='/auth'
              element={<AuthForm onLogin={login} onRegister={register} />}
            />
            <Route
              path='*'
              element={<AuthForm onLogin={login} onRegister={register} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

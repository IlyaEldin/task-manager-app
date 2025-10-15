import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";

export default function AuthForm({ onLogin, onRegister, isLoading }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const registerLogin = async () => {
    if (!isLogin && password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      if (isLogin) {
        await onLogin({ name, password });
      } else {
        await onRegister({ name, password });
      }
    } catch (error) {
      setError(error.message);
    }

    navigate("/home");
  };

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <h1>{isLogin ? "Вход" : "Регистрация"}</h1>
        <input
          type='text'
          placeholder='Имя пользователя'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type='password'
            placeholder='Повторите пароль'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        {error && <div className={classes.error}>{error}</div>}
        <button
          className={classes.submitButton}
          disabled={isLoading}
          onClick={registerLogin}
        >
          {isLoading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
        <button
          className={classes.switchButton}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Есть аккаунт? Войти"}
        </button>
      </div>
    </div>
  );
}

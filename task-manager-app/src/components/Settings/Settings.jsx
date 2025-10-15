import { UserContext } from "../../context/UserContext/UserContext";
import { useContext } from "react";
import classes from "./Settings.module.css";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import createSampleTasks from "../../../createTasks";

export default function Settings() {
  const { searchEnabled, setSearchEnabled } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={classes.settings}>
      <h1>Настройки</h1>

      <div className={classes.settingItem}>
        <label className={classes.label}>
          <input
            type='checkbox'
            checked={searchEnabled}
            onChange={(e) => setSearchEnabled(e.target.checked)}
            className={classes.checkbox}
          />
          <span className={classes.labelText}>Включить строку поиска</span>
        </label>
        <p className={classes.description}>
          Показывать или скрывать поисковую строку в заголовке
        </p>
      </div>

      <div className={classes.settingItem}>
        <label className={classes.label}>
          <input
            type='checkbox'
            checked={theme === "dark"}
            onChange={toggleTheme}
            className={classes.checkbox}
          />
          <span className={classes.labelText}>Темная тема</span>
        </label>
        <p className={classes.description}>
          Переключение между светлой и темной темой
        </p>
      </div>

      <div className={classes.settingItem}>
        <label className={classes.label}>
          <button
            onClick={() => createSampleTasks(localStorage.getItem("token"))}
          >
            <span>+</span>
          </button>
          <span className={classes.labelText}>Добавить задачи</span>
        </label>
        <p className={classes.description}>
          Добавляет 10 тестовых задач на ваш аккаунт
        </p>
      </div>
    </div>
  );
}

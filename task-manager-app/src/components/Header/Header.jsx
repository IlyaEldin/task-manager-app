import { useContext, useState, useEffect } from "react";
import classes from "./Header.module.css";
import { UserContext } from "../../context/UserContext/UserContext";
import { useTasksContext } from "../../context/TasksContext/TasksContext";
import ModalPortal from "../ModalPortal/ModalPortal";
import ModalAddTask from "../ModalAddTask/ModalAddTask";
import { useDebounce } from "../../hooks/useDebounce";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const { user, logout, globalSearch, setGlobalSearch, searchEnabled } =
    useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(globalSearch, 300);

  const { createTask } = useTasksContext();

  const handleAddTask = async (newTask) => {
    try {
      await createTask(newTask);
    } catch (error) {
      console.error("Ошибка создания задачи:", error.message);
    }
  };

  useEffect(() => {
    setGlobalSearch(debouncedSearch);
  }, [debouncedSearch, setGlobalSearch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setGlobalSearch(value);
  };

  return (
    <div className={classes.container}>
      <button
        className={classes.addTaskButton}
        onClick={() => setIsModalOpen(true)}
      >
        Добавить задачу
      </button>

      {searchEnabled && (
        <div className={classes.search}>
          <input
            type='text'
            placeholder={
              location.pathname === "/settings"
                ? "Не ищем, а настраиваем 🛠️"
                : "Введите название или тег"
            }
            onChange={handleSearchChange}
            disabled={location.pathname === "/settings"}
            value={globalSearch}
          />
          <img src='./icons/search.svg' alt='Поиск' />
        </div>
      )}

      <div className={classes.profileSection}>
        <NavLink to={"/"}>
          <div className={classes.avatar}>{user.name[0].toUpperCase()}</div>
          <div className={classes.name}>{user.name}</div>
        </NavLink>

        <button onClick={logout} className={classes.logoutButton}>
          Выйти
        </button>

        {isModalOpen && (
          <ModalPortal>
            <ModalAddTask
              onClose={() => setIsModalOpen(false)}
              onAddTask={handleAddTask}
            />
          </ModalPortal>
        )}
      </div>
    </div>
  );
}

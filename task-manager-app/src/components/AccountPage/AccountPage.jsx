import { useContext } from "react";
import classes from "./AccountPage.module.css";
import { UserContext } from "../../context/UserContext/UserContext";
import { TasksContext } from "../../context/TasksContext/TasksContext";
import { NavLink } from "react-router-dom";

export default function AccountPage() {
  const { user, logout } = useContext(UserContext);

  const { tasks } = useContext(TasksContext);
  const Now = new Date();

  const userCard = {
    name: user.name,
    email: `${user.name}@example.com`,
    stats: {
      tasks: tasks.length,
      completed: tasks.filter((task) => task.status === "completed").length,
      overdue: tasks.filter((task) => new Date(task.dueDate) < Now).length,
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.title}>Мой аккаунт</h1>
      </div>

      <div className={classes.userCard}>
        <div className={classes.userInfo}>
          <div className={classes.avatar}>{user.name[0].toUpperCase()}</div>
          <div className={classes.userDetails}>
            <h2>{userCard.name}</h2>
            <p>{userCard.email}</p>
          </div>
        </div>

        <div className={classes.stats}>
          <div className={classes.statItem}>
            <span className={classes.statNumber}>{userCard.stats.tasks}</span>
            <span className={classes.statLabel}>Всего задач</span>
          </div>
          <div className={classes.statItem}>
            <span className={classes.statNumber}>
              {userCard.stats.completed}
            </span>
            <span className={classes.statLabel}>Выполнено</span>
          </div>
          <div className={classes.statItem}>
            <span className={classes.statNumber}>{userCard.stats.overdue}</span>
            <span className={classes.statLabel}>Просрочено</span>
          </div>
        </div>

        <div className={classes.actions}>
          <button className={`${classes.button} ${classes.secondary}`}>
            <NavLink to={"/settings"}>Настройки</NavLink>
          </button>
          <button
            onClick={logout}
            className={`${classes.button} ${classes.secondary}`}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

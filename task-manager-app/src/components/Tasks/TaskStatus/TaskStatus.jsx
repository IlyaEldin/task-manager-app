import classes from "./TaskStatus.module.css";
import { useTasksContext } from "../../../context/TasksContext/TasksContext";

export default function TaskStatus() {
  const { isLoading, error, fetchTasks } = useTasksContext();

  if (isLoading) {
    return (
      <div className={classes.container}>
        <div className={classes.loading}>Загрузка задач...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.container}>
        <div className={classes.error}>
          <p>{error}</p>
          <button onClick={fetchTasks} className={classes.retryButton}>
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }
}

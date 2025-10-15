import classes from "./Home.module.css";
import Task from "../Task/Task";
import { useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext/UserContext";
import { useTasksContext } from "../../context/TasksContext/TasksContext";

export default function Home() {
  const { globalSearch, setGlobalSearch } = useContext(UserContext);
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    updateTask,
    deleteTask,
    setSearch,
  } = useTasksContext();

  useEffect(() => {
    setSearch(globalSearch);
  }, [globalSearch, setSearch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading) {
    return (
      <div className={classes.containerLoading}>
        <div className={classes.loading}>Загрузка задач...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.containerError}>
        <div className={classes.error}>
          <p>{error}</p>
          <button onClick={fetchTasks} className={classes.retryButton}>
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {globalSearch && tasks.length > 0 && (
        <div className={classes.searchInfo}>
          Найдено задач: {tasks.length} по запросу "{globalSearch}"
        </div>
      )}
      <div className={classes.container}>
        {tasks.length === 0 ? (
          <div className={classes.empty}>
            {globalSearch ? (
              <>
                <h3>Задачи не найдены</h3>
                <p>Попробуйте изменить поисковый запрос</p>
                <button
                  className={classes.retryButton}
                  onClick={() => setGlobalSearch("")}
                >
                  Сбросить поиск
                </button>
              </>
            ) : (
              <>
                <h3>Задач пока нет</h3>
                <p>Создайте свою первую задачу!</p>
              </>
            )}
          </div>
        ) : (
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </>
  );
}

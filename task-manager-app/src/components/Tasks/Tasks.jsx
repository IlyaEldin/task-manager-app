import classes from "./Tasks.module.css";
import Task from "../Task/Task";
import { useEffect, useState, useContext, useMemo } from "react";
import { UserContext } from "../../context/UserContext/UserContext";
import { useTasksContext } from "../../context/TasksContext/TasksContext";
import { getStatusText, getPriorityText } from "../../utils/taskutils";

export default function Tasks() {
  const { globalSearch, setGlobalSearch } = useContext(UserContext);
  const {
    tasks,
    allTasks,
    isLoading,
    error,
    fetchTasks,
    updateTask,
    deleteTask,
    setSearch,
  } = useTasksContext();

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  useEffect(() => {
    setSearch(globalSearch);
  }, [globalSearch, setSearch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        filterStatus === "all" || task.status === filterStatus;
      const priorityMatch =
        filterPriority === "all" || task.priority === filterPriority;
      return statusMatch && priorityMatch;
    });
  }, [tasks, filterStatus, filterPriority]);

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

  return (
    <div className={classes.container}>
      <h1>Ваши задачи</h1>

      <div className={classes.controls}>
        <div className={classes.selectContainer}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={classes.filter}
          >
            <option value='all'>Все статусы</option>
            <option value='pending'>Ожидает</option>
            <option value='in-progress'>В работе</option>
            <option value='completed'>Выполнена</option>
          </select>
        </div>
        <div className={classes.selectContainer}>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className={classes.filter}
          >
            <option value='all'>Все приоритеты</option>
            <option value='low'>Низкий</option>
            <option value='medium'>Средний</option>
            <option value='high'>Высокий</option>
            <option value='urgent'>Срочный</option>
          </select>
        </div>
      </div>

      {filteredTasks.length !== allTasks.length && (
        <div className={classes.info}>
          Найдено: {filteredTasks.length} из {allTasks.length} по запросу{" "}
          {globalSearch ? `"${globalSearch}"` : ""}{" "}
          {filterStatus !== "all"
            ? `статус: "${getStatusText(filterStatus)}"`
            : ""}{" "}
          {filterPriority !== "all"
            ? `приоритет: "${getPriorityText(filterPriority)}"`
            : ""}
        </div>
      )}

      <div className={classes.tasks}>
        {filteredTasks.length === 0 ? (
          <div className={classes.empty}>
            {globalSearch ||
            filterStatus !== "all" ||
            filterPriority !== "all" ? (
              <>
                <h3>Задачи не найдены</h3>
                <p>Попробуйте изменить параметры поиска или фильтры</p>
                <button
                  onClick={() => {
                    setFilterStatus("all");
                    setFilterPriority("all");
                    setGlobalSearch("");
                  }}
                  className={classes.reset}
                >
                  Сбросить фильтры
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
          filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
              updateTask={updateTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

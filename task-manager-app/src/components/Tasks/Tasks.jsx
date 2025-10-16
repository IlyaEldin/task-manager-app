import classes from "./Tasks.module.css";
import Task from "../Task/Task";
import { useEffect, useState, useContext, useMemo } from "react";
import { UserContext } from "../../context/UserContext/UserContext";
import { useTasksContext } from "../../context/TasksContext/TasksContext";
import { getStatusText, getPriorityText } from "../../utils/taskutils";
import { ModalContext } from "../../context/ModalContext/ModalContext";
import ModalPortal from "../ModalPortal/ModalPortal";
import ModalStatus from "../ModalStatus/ModalStatus";
import TaskModal from "../TaskModal/TaskModal";
import ModalAddTask from "../ModalAddTask/ModalAddTask";

export default function Tasks() {
  const { openModal, closeModal, isModalOpen, activeTask, setActiveTask } =
    useContext(ModalContext);

  const [selectStatus, setSelectStatus] = useState(false); //стоит ли выделение
  const [selected, setSelected] = useState([]); //массив выбранных
  const [resultSelectedDelete, setResultSelectedDelete] = useState(false);

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
    deleteSelectedTasks,
  } = useTasksContext();

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  useEffect(() => {
    if (resultSelectedDelete) {
      const timer = setTimeout(() => {
        setResultSelectedDelete(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [resultSelectedDelete]);

  useEffect(() => {
    if (activeTask) {
      const updatedTask = tasks.find((t) => t.id === activeTask.id);
      if (updatedTask) {
        setActiveTask(updatedTask);
      }
    }
  }, [tasks, activeTask, setActiveTask]);

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
      <div className={classes.sticky}>
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

          <button
            className={
              selectStatus
                ? `${classes.btn} ${classes.selectActive}`
                : `${classes.btn}`
            }
            onClick={() => setSelectStatus((prev) => !prev)}
          >
            Выделить
          </button>
          {selectStatus && (
            <button
              className={classes.btn}
              onClick={() => {
                const confirm = window.confirm(
                  `Уверены, что хотите удалить задачи (${selected.length})? `
                );
                if (confirm) {
                  const result = deleteSelectedTasks(selected);
                  if (result) {
                    setResultSelectedDelete(true);
                    openModal("editStatus");
                  } else {
                    setResultSelectedDelete(false);
                  }
                } else {
                  return;
                }
              }}
            >
              Удалить
            </button>
          )}
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
              selectStatus={selectStatus} //стоит ли выделение
              setSelected={setSelected} //для добавления в массив id удаленич
              key={task.id}
              task={task}
            />
          ))
        )}
      </div>

      {isModalOpen.updateStatus && (
        <ModalPortal>
          <ModalAddTask
            onClose={() => {
              closeModal("updateStatus");
              openModal("editStatus");
            }}
            task={activeTask}
            type='edit'
            updateTask={updateTask}
          />
        </ModalPortal>
      )}

      {isModalOpen.taskStatus && (
        <ModalPortal>
          <TaskModal
            task={activeTask}
            onClose={() => closeModal("taskStatus")}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </ModalPortal>
      )}

      {isModalOpen.editStatus && (
        <ModalPortal>
          <ModalStatus>
            {resultSelectedDelete
              ? "Задачи удалены"
              : "Задача успешно отредактирована"}
          </ModalStatus>
        </ModalPortal>
      )}
    </div>
  );
}

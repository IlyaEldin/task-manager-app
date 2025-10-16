import classes from "./Home.module.css";
import Task from "../Task/Task";
import { useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext/UserContext";
import { useTasksContext } from "../../context/TasksContext/TasksContext";
import { ModalContext } from "../../context/ModalContext/ModalContext";
import ModalPortal from "../ModalPortal/ModalPortal";
import ModalStatus from "../ModalStatus/ModalStatus";
import TaskModal from "../TaskModal/TaskModal";
import ModalAddTask from "../ModalAddTask/ModalAddTask";

export default function Home() {
  const { openModal, closeModal, isModalOpen, activeTask } =
    useContext(ModalContext);

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
              updateTask={updateTask}
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
            updateTask={updateTask}
          />
        </ModalPortal>
      )}

      {isModalOpen.editStatus && (
        <ModalPortal>
          <ModalStatus>Задача успешно отредактирована</ModalStatus>
        </ModalPortal>
      )}
    </>
  );
}

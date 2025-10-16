import { useEffect, useState } from "react";
import classes from "./Task.module.css";
import ModalAddTask from "../ModalAddTask/ModalAddTask";
import ModalPortal from "../ModalPortal/ModalPortal";
import TaskModal from "../TaskModal/TaskModal";
import {
  getStatusColor,
  getProgressColor,
  getStatusText,
  getPercentage,
  getPriorityColor,
  getPriorityText,
} from "../../utils/taskutils";
import { formatCreatedAt, formatDueDate } from "../../utils/dateutils";

export default function Task({ task, onUpdate, onDelete, updateTask }) {
  const [isModalOpen, setIsModalOpen] = useState({
    taskStatus: false,
    updateStatus: false,
    editStatus: false,
  });
  const progressPercentage = getPercentage(task.subtasks || []);

  useEffect(() => {
    let timeoutId;

    function editStatusClose() {
      setIsModalOpen((prev) => ({ ...prev, editStatus: false }));
    }

    if (isModalOpen.editStatus) {
      timeoutId = setTimeout(editStatusClose, 2000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isModalOpen.editStatus]);

  return (
    <>
      <div
        className={classes.container}
        onClick={() =>
          setIsModalOpen((prev) => ({ ...prev, taskStatus: true }))
        }
        style={{ cursor: "pointer" }}
      >
        <p
          title='Приоритет'
          style={{ color: getPriorityColor(task.priority) }}
          className={classes.priority}
        >
          {getPriorityText(task.priority)}
        </p>
        <h2>{task.title}</h2>
        <h3 className={classes.tags}>
          {task.tags &&
            task.tags.map((tag) => (
              <span key={tag} className={classes.tag}>
                #{tag}
              </span>
            ))}
        </h3>
        <div className={classes.progressStatus}>
          <h3 style={{ color: getStatusColor(task.status) }}>
            {getStatusText(task.status)}
          </h3>
          <h3 style={{ color: getProgressColor(progressPercentage) }}>
            {progressPercentage}%
          </h3>
        </div>
        <div className={classes.progressLine}>
          <div
            style={{ width: `${progressPercentage}%` }}
            className={classes.progressFill}
          ></div>{" "}
          <div
            style={{ left: `calc(${progressPercentage}% - 2%)` }}
            className={classes.progressMarker}
          ></div>
        </div>
        <div className={classes.creationTime}>
          <div className={classes.datesCompact}>
            <div title='Добавлен' className={classes.dateRow}>
              <span className={classes.dateIcon}>📅</span>
              <span className={classes.dateText}>
                {formatCreatedAt(task.createdAt)}
              </span>
            </div>
            <div title='Доделать' className={classes.dateRow}>
              <span className={classes.dateIcon}>⏰</span>
              <span className={classes.dateText}>
                {formatDueDate(task.dueDate)}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen((prev) => ({ ...prev, updateStatus: true }));
          }}
          className={classes.updBtn}
        >
          Редактировать
        </button>
      </div>

      {isModalOpen.updateStatus && (
        <ModalPortal>
          <ModalAddTask
            onClose={() => {
              setIsModalOpen((prev) => ({
                ...prev,
                editStatus: true,
                updateStatus: false,
              }));
            }}
            task={task}
            type='edit'
            updateTask={updateTask}
          />
        </ModalPortal>
      )}

      {isModalOpen.taskStatus && (
        <ModalPortal>
          <TaskModal
            task={task}
            onClose={() =>
              setIsModalOpen((prev) => ({ ...prev, taskStatus: false }))
            }
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </ModalPortal>
      )}

      {isModalOpen.editStatus && (
        <ModalPortal>
          <div className={classes.success}>
            <div>Задача успешно отредактирована</div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}

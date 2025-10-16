import classes from "./Task.module.css";
import {
  getStatusColor,
  getProgressColor,
  getStatusText,
  getPercentage,
  getPriorityColor,
  getPriorityText,
} from "../../utils/taskutils";
import { formatCreatedAt, formatDueDate } from "../../utils/dateutils";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext/ModalContext";

export default function Task({
  task,
  selectStatus,
  setSelected,
  type = "view",
}) {
  const { openModal, setActiveTask } = useContext(ModalContext);
  const [status, setStatus] = useState(false);

  const progressPercentage = getPercentage(task.subtasks || []);

  return (
    <>
      <div
        className={classes.container}
        onClick={() => {
          setActiveTask(task), openModal("taskStatus");
        }}
        style={{ cursor: "pointer" }}
      >
        <div className={classes.checkboxPriorityContainer}>
          <p
            title='Приоритет'
            style={{ color: getPriorityColor(task.priority) }}
            className={classes.priority}
          >
            {getPriorityText(task.priority)}
          </p>

          {selectStatus && (
            <div onClick={(e) => e.stopPropagation()}>
              <input
                type='checkbox'
                checked={status}
                onChange={() => {
                  setStatus((prev) => !prev);
                  setSelected((prev) =>
                    prev.includes(task.id)
                      ? prev.filter((id) => id !== task.id)
                      : [...prev, task.id]
                  );
                }}
              />
            </div>
          )}
        </div>
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
        <div
          className={
            type !== "view"
              ? `${classes.creationTime}`
              : `${classes.creationTime} ${classes.creationTimeNoEdit}`
          }
        >
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
        {type !== "view" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal("updateStatus");
            }}
            className={classes.updBtn}
          >
            Редактировать
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

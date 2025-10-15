import { useState } from "react";
import classes from "./Task.module.css";
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

export default function Task({ task, onUpdate, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const progressPercentage = getPercentage(task.subtasks || []);

  return (
    <>
      <div
        className={classes.container}
        onClick={() => setIsModalOpen(true)}
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
      </div>

      {isModalOpen && (
        <TaskModal
          task={task}
          onClose={() => setIsModalOpen(false)}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

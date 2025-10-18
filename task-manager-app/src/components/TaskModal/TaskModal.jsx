import { useContext, useState } from "react";
import classes from "./TaskModal.module.css";
import { getPriorityColor, getPriorityText } from "../../utils/taskutils";
import { ModalContext } from "../../context/ModalContext/ModalContext";

export default function TaskModal({ task, onClose, onUpdate, onDelete }) {
  const [status, setStatus] = useState(task.status);
  const { activeTask, updateActiveTask } = useContext(ModalContext);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onUpdate({ ...task, status: newStatus }, activeTask, updateActiveTask);
  };

  const handleSubtaskToggle = (subtaskId) => {
    const updatedSubtasks = task.subtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    onUpdate(
      { ...task, subtasks: updatedSubtasks },
      activeTask,
      updateActiveTask
    );
  };

  const handleDelete = () => {
    if (window.confirm("Удалить эту задачу?")) {
      onDelete(task.id);
      onClose();
    }
  };

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <h2>{task.title}</h2>
          <button className={classes.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={classes.content}>
          <div className={classes.field}>
            <label>Статус</label>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value='pending'>Ожидает</option>
              <option value='in-progress'>В работе</option>
              <option value='completed'>Выполнена</option>
            </select>
          </div>

          <div className={classes.field}>
            <label>Описание</label>
            <p>{task.description || "Нет описания"}</p>
          </div>

          <div className={classes.details}>
            <div className={classes.detail}>
              <span>Приоритет:</span>
              <strong
                style={{ color: getPriorityColor(task.priority) }}
                className={classes.priority}
              >
                {getPriorityText(task.priority)}
              </strong>
            </div>
            <div className={classes.detail}>
              <span>Срок:</span>
              <span>{task.dueDate || "Не установлен"}</span>
            </div>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className={classes.field}>
              <label>Теги</label>
              <div className={classes.tags}>
                {task.tags.map((tag, index) => (
                  <span key={index} className={classes.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {task.subtasks && task.subtasks.length > 0 && (
            <div className={classes.field}>
              <label>Подзадачи</label>
              <div className={classes.subtasks}>
                {task.subtasks.map((subtask) => (
                  <div key={subtask.id} className={classes.subtask}>
                    <input
                      type='checkbox'
                      checked={subtask.completed}
                      onChange={() => handleSubtaskToggle(subtask.id)}
                    />
                    <span
                      className={subtask.completed ? classes.completed : ""}
                    >
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={classes.actions}>
          <button onClick={handleDelete} className={classes.deleteBtn}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

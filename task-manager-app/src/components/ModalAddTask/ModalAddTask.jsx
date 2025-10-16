import classes from "./ModalAddTask.module.css";
import { useEffect, useRef, useState } from "react";
import { useFormTask, FORM_KEY } from "../../hooks/useFormTask";

export default function ModalAddTask({
  onClose,
  onAddTask,
  type = "add",
  task = null,
  updateTask,
}) {
  const tagRef = useRef();
  const subtaskRef = useRef();
  const [error, setError] = useState("");
  const { formData, setFormData, resetForm, changeForm, deleteFromTheArray } =
    useFormTask();

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [setFormData, task]);

  const addNewTask = () => {
    if (!formData.title) {
      setError("Название обязательно");
      return;
    }

    if (formData.subtasks.length === 0) {
      setError("Подзадачи обязательны");
      return;
    }

    if (formData.subtasks.length) {
      const newTask = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate,
        tags: formData.tags,
        subtasks: formData.subtasks.map((subtask) => ({
          title: subtask,
          completed: false,
        })),
      };
      resetForm();
      type === "edit" ? updateTask(formData) : onAddTask(newTask);
      onClose();
    } else {
      setError("Подзадачи обязательны");
      return;
    }
  };

  const handleAddTag = () => {
    const newTag = tagRef.current.value.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      changeForm(FORM_KEY.tags, newTag);
      tagRef.current.value = "";
    }
  };

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          {type === "add" ? (
            <h2>Добавить новую задачу</h2>
          ) : (
            <h2>Редактирование задачи</h2>
          )}
          <button className={classes.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <section className={classes.title}>
          <h1>Название задачи</h1>
          <input
            type='text'
            placeholder='Введите название задачи'
            value={formData.title}
            onChange={(e) => {
              changeForm(FORM_KEY.title, e.target.value);
            }}
          />
        </section>
        <section className={classes.description}>
          <h1>Описание задачи как можно подрообнее</h1>
          <textarea
            type='text'
            placeholder='Опишите задачу как можно подробнее'
            value={formData.description}
            onChange={(e) => {
              changeForm(FORM_KEY.description, e.target.value);
            }}
          />
        </section>

        <section className={classes.priorityAndDate}>
          <div className={classes.formGroup}>
            <h1>Приоритет</h1>
            <select
              value={formData.priority}
              onChange={(e) => {
                changeForm(FORM_KEY.priority, e.target.value);
              }}
            >
              <option value='low'>Низкий</option>
              <option value='medium'>Средний</option>
              <option value='high'>Высокий</option>
              <option value='urgent'>Срочный</option>
            </select>
          </div>

          <div className={classes.formGroup}>
            <h1>Срок выполнения</h1>
            <input
              type='date'
              value={formData.dueDate}
              onChange={(e) => {
                changeForm(FORM_KEY.dueDate, e.target.value);
              }}
            />
          </div>
        </section>

        <section className={classes.tags}>
          <h1>Теги</h1>
          <div className={classes.tagsInput}>
            <input
              ref={tagRef}
              type='text'
              placeholder='Добавьте тег'
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
            />
            <button
              type='button'
              onClick={handleAddTag}
              className={classes.addButton}
            >
              +
            </button>
          </div>

          <div className={classes.tagsList}>
            {formData.tags.map((tag) => (
              <div key={`tag-${tag}`}>
                #{tag}{" "}
                <button
                  onClick={() => {
                    deleteFromTheArray(FORM_KEY.tags, tag);
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className={classes.subtasks}>
          <h1>Подзадачи</h1>
          <div className={classes.subtasksInput}>
            <input
              ref={subtaskRef}
              type='text'
              placeholder='Добавьте подзадачу'
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = subtaskRef.current.value.trim();
                  if (value) {
                    changeForm(FORM_KEY.subtasks, value);
                    subtaskRef.current.value = "";
                  }
                }
              }}
            />

            <button
              type='button'
              className={classes.addButton}
              onClick={() => {
                const value = subtaskRef.current.value.trim();
                if (value) {
                  changeForm(FORM_KEY.subtasks, value);
                  subtaskRef.current.value = "";
                }
              }}
            >
              +
            </button>
          </div>
          <div className={classes.subtasksList}>
            {formData.subtasks.map((subtask, index) => (
              <div
                key={
                  type === "edit"
                    ? `edit-${index}-${subtask.title || subtask}`
                    : `${index}-${subtask.slice(0, 5)}`
                }
                className={classes.subtaskItem}
              >
                <div>
                  <span>Подзадача № {index + 1}</span>
                  <span>{type === "edit" ? subtask.title : subtask}</span>
                </div>

                <button
                  type='button'
                  onClick={() => {
                    deleteFromTheArray(FORM_KEY.subtasks, subtask);
                  }}
                  className={classes.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

        {error && (
          <section className={classes.error}>
            <p>{error}</p>
          </section>
        )}

        <section className={classes.actions}>
          <button
            type='button'
            className={classes.cancelButton}
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Отмена
          </button>
          <button onClick={addNewTask} className={classes.submitButton}>
            {type === "edit" ? "Редактировать" : "Создать задачу"}
          </button>
        </section>
      </div>
    </div>
  );
}

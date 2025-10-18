import { useContext } from "react";
import { ModalContext } from "../../../context/ModalContext/ModalContext";
import classes from "./TasksFilter.module.css";
import { SelectionContext } from "../../../context/SelectionContext/SelectionContext";
import { UserContext } from "../../../context/UserContext/UserContext";
import { useTasksContext } from "../../../context/TasksContext/TasksContext";

export default function TasksFilter() {
  const { filterStatus, setFilterStatus, filterPriority, setFilterPriority } =
    useContext(UserContext);
  const {
    selectStatus,
    setSelectStatus,
    selected,
    setSelected,
    setResultSelectedDelete,
  } = useContext(SelectionContext);
  const { deleteSelectedTasks, organize, setOrganize, sortBy, setSortBy } =
    useTasksContext();
  const { openModal } = useContext(ModalContext);

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
              onClick={async () => {
                const confirm = window.confirm(
                  `Уверены, что хотите удалить задачи (${selected.length})? `
                );
                if (confirm) {
                  const result = await deleteSelectedTasks(selected);
                  if (result) {
                    setResultSelectedDelete(true);
                    openModal("editStatus");
                    setSelected([]);
                    setSelectStatus(false);
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
          <div className={classes.organizeContainer}>
            <p>Упорядочить</p>

            <button
              onClick={() => setOrganize((prev) => !prev)}
              className={classes.containerSlider}
              onMouseDown={(e) => e.preventDefault()}
              tabIndex={-1}
            >
              <div
                className={
                  !organize
                    ? `${classes.sliderBall}`
                    : `${classes.sliderBall} ${classes.sliderBallOn}`
                }
              ></div>
            </button>
          </div>

          {organize && (
            <div className={classes.selectContainer}>
              <select
                className={classes.filter}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value='newest'>Сначала новые</option>
                <option value='oldest'>Сначала старые</option>
                <option value='priority'>По приоритету</option>
                <option value='dueDate'>По сроку дедлайна</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import classes from "./TasksList.module.css";
import Task from "../../Task/Task";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext/UserContext";
import { SelectionContext } from "../../../context/SelectionContext/SelectionContext";

export default function TasksList({ type = "view" }) {
  const {
    filteredTasks,
    filterStatus,
    filterPriority,
    globalSearch,
    setGlobalSearch,
    setFilterPriority,
    setFilterStatus,
  } = useContext(UserContext);

  const { selectStatus, setSelected } = useContext(SelectionContext);

  return (
    <>
      <div className={classes.tasks}>
        {filteredTasks.length === 0 ? (
          <div className={classes.empty}>
            {globalSearch ||
            filterStatus !== "all" ||
            filterPriority !== "all" ? (
              <>
                <h3>Задачи не найдены</h3>
                {type === "view" ? (
                  <p>Попробуйте изменить поисковый запрос</p>
                ) : (
                  <p>Попробуйте изменить параметры поиска или фильтры</p>
                )}
                <button
                  onClick={() => {
                    type === "view"
                      ? setGlobalSearch("")
                      : (setFilterStatus("all"),
                        setFilterPriority("all"),
                        setGlobalSearch(""));
                  }}
                  className={classes.reset}
                >
                  {type === "view" ? "Сбросить поиск" : "Сбросить фильтры"}
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
              type={type}
              {...(selectStatus && {
                selectStatus: selectStatus,
                setSelected: setSelected,
              })}
              key={task.id}
              task={task}
            />
          ))
        )}
      </div>
    </>
  );
}

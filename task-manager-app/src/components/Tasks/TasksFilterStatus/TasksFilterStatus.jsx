import classes from "./TasksFilterStatus.module.css";
import { getStatusText, getPriorityText } from "../../../utils/taskutils";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext/UserContext";
import { useTasksContext } from "../../../context/TasksContext/TasksContext";

export default function TasksFilterStatus() {
  const { filteredTasks, globalSearch, filterPriority, filterStatus } =
    useContext(UserContext);

  const { allTasks } = useTasksContext();

  return (
    <>
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
    </>
  );
}

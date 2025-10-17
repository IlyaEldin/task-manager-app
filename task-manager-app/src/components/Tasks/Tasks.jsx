import { useTasksContext } from "../../context/TasksContext/TasksContext";
import classes from "./Tasks.module.css";
import TasksFilter from "./TasksFilter/TasksFilter";
import TasksFilterStatus from "./TasksFilterStatus/TasksFilterStatus";
import TasksList from "./TasksList/TasksList";
import TasksModal from "./TasksModal/TasksModal";
import TaskStatus from "./TaskStatus/TaskStatus";

export default function Tasks() {
  const { isLoading, error } = useTasksContext();

  if (isLoading || error) {
    return <TaskStatus />;
  }

  return (
    <div className={classes.container}>
      <TasksFilter />
      <TasksFilterStatus />
      <TasksList type={"editable"} />
      <TasksModal />
    </div>
  );
}

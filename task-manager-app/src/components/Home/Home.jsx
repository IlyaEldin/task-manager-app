import useTasksFilter from "../../hooks/useTasksFilter";
import TasksList from "../Tasks/TasksList/TasksList";
import TasksModal from "../Tasks/TasksModal/TasksModal";
import TaskStatus from "../Tasks/TaskStatus/TaskStatus";
import classes from "./Home.module.css";

export default function Home() {
  const stateManager = useTasksFilter();

  if (stateManager.isLoading || stateManager.error) {
    return <TaskStatus />;
  }

  return (
    <div className={classes.container}>
      <TasksList />
      <TasksModal />
    </div>
  );
}

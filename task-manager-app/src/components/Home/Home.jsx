import TasksList from "../Tasks/TasksList/TasksList";
import TasksModal from "../Tasks/TasksModal/TasksModal";
import TaskStatus from "../Tasks/TaskStatus/TaskStatus";
import classes from "./Home.module.css";
import { useTasksContext } from "../../context/TasksContext/TasksContext";

export default function Home() {
  const { isLoading, error } = useTasksContext();

  if (isLoading || error) {
    return <TaskStatus />;
  }

  return (
    <div className={classes.container}>
      <TasksList />
      <TasksModal />
    </div>
  );
}

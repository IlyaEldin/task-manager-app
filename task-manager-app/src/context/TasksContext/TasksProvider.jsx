import { TasksContext } from "./TasksContext";
import { useTasks } from "../../hooks/useTasks";

export const TasksProvider = ({ children }) => {
  const tasksState = useTasks();

  return (
    <TasksContext.Provider value={tasksState}>{children}</TasksContext.Provider>
  );
};

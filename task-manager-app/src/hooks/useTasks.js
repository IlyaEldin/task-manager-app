import { useState, useCallback, useMemo, useEffect } from "react";
import { taskService } from "../services/taskService";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [organize, setOrganize] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const sortedAndFilteredTasks = useMemo(() => {
    let result = tasks;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    if (organize) {
      switch (sortBy) {
        case "newest":
          return [...result].sort(
            (a, b) =>
              new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id)
          );
        case "oldest":
          return [...result].sort(
            (a, b) =>
              new Date(a.createdAt || a.id) - new Date(b.createdAt || b.id)
          );
        case "priority": {
          const priorityOrder = {
            urgent: 0,
            high: 1,
            medium: 2,
            low: 3,
          };
          return [...result].sort(
            (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
          );
        }
        case "dueDate":
          return [...result].sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
          });
        default:
          return result;
      }
    }
    return result;
  }, [tasks, searchQuery, organize, sortBy]);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
      setError("Не удалось загрузить задачи");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [
        {
          ...taskData,
          id: newTask.taskId,
          status: "pending",
          subtasks: newTask.subtasks,
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Ошибка при создании задачи:", error.message);
      throw error;
    }
  }, []);

  const updateTask = useCallback(
    async (updatedTask, activeTask, updateActiveTask) => {
      try {
        await taskService.updateTask(updatedTask);
        setTasks((prev) =>
          prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );

        if (activeTask.id === updatedTask.id) {
          updateActiveTask(updatedTask);
        } // обновляем для модальных окон активный таск
      } catch (error) {
        console.error("Ошибка при обновлении задачи:", error.message);
        throw error;
      }
    },
    []
  );

  const deleteTask = useCallback(async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error.message);
      throw error;
    }
  }, []);

  const deleteSelectedTasks = useCallback(async (ArrayTaskId) => {
    try {
      for (let i = 0; i < ArrayTaskId.length; i++) {
        await taskService.deleteTask(ArrayTaskId[i]);
        setTasks((prev) => prev.filter((task) => task.id !== ArrayTaskId[i]));
      }
    } catch (error) {
      console.error("Ошибка при удалении задач:", error.message);
      throw error;
    }
    return true;
  }, []);

  return {
    tasks: sortedAndFilteredTasks,
    allTasks: tasks,
    isLoading,
    error,
    createTask,
    fetchTasks,
    updateTask,
    deleteTask,
    setSearch: setSearchQuery,
    deleteSelectedTasks,
    setTasks,
    organize,
    setOrganize,
    sortBy,
    setSortBy,
  };
}

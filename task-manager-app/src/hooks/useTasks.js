import { useState, useCallback, useMemo } from 'react';
import { taskService } from '../services/taskService';
import { ModalContext } from '../context/ModalContext/ModalContext';
import { useContext } from 'react';

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const context = useContext(ModalContext);


    const filteredTasks = useMemo(() => {
        if (!searchQuery) return tasks;
        const query = searchQuery.toLowerCase();
        return tasks.filter(task =>
            task.title.toLowerCase().includes(query) ||
            task.tags.some(tag => tag.toLowerCase().includes(query)) // если тег совпадает
        );
    }, [tasks, searchQuery]);

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

    const createTask = useCallback(async (taskData) => {
        try {
            const newTask = await taskService.createTask(taskData);
            setTasks(prev => [{
                ...taskData,
                id: newTask.taskId,
                status: 'pending',
                subtasks: newTask.subtasks
            }, ...prev]);
        } catch (error) {
            console.error("Ошибка при создании задачи:", error.message);
            throw error;
        }
    }, []);

    const updateTask = useCallback(async (updatedTask) => {
        try {
            await taskService.updateTask(updatedTask);
            setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));

            if (context.activeTask.id === updatedTask.id) {
                context.updateActiveTask(updatedTask);
            } // обновляем для модальных окон активный таск

        } catch (error) {
            console.error("Ошибка при обновлении задачи:", error.message);
            throw error;
        }
    }, [context]);

    const deleteTask = useCallback(async (taskId) => {
        try {
            await taskService.deleteTask(taskId);
            setTasks(prev => prev.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Ошибка при удалении задачи:", error.message);
            throw error;
        }
    }, []);

    return {
        tasks: filteredTasks,
        allTasks: tasks,
        isLoading,
        error,
        createTask,
        fetchTasks,
        updateTask,
        deleteTask,
        setSearch: setSearchQuery,

    };
}
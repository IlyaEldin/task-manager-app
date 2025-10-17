import { useTasksContext } from "../context/TasksContext/TasksContext";
import { useContext, useState, useMemo, useEffect } from "react";
import { ModalContext } from "../context/ModalContext/ModalContext"
import { UserContext } from "../context/UserContext/UserContext"

export default function useTasksFilter() {
    const {
        openModal,
        closeModal,
        isModalOpen,
        activeTask,
        setActiveTask } = useContext(ModalContext);
    const {
        tasks,
        allTasks,
        isLoading,
        error,
        fetchTasks,
        updateTask,
        deleteTask,
        setSearch,
        deleteSelectedTasks,
    } = useTasksContext();
    const { globalSearch, setGlobalSearch } = useContext(UserContext);

    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");
    const [selectStatus, setSelectStatus] = useState(false); //стоит ли выделение
    const [selected, setSelected] = useState([]); //массив выбранных
    const [resultSelectedDelete, setResultSelectedDelete] = useState(false);

    useEffect(() => {
        if (resultSelectedDelete) {
            const timer = setTimeout(() => {
                setResultSelectedDelete(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [resultSelectedDelete, selectStatus]);

    useEffect(() => {
        if (activeTask) {
            const updatedTask = tasks.find((t) => t.id === activeTask.id);
            if (updatedTask) {
                setActiveTask(updatedTask);
            }
        }
    }, [tasks, activeTask, setActiveTask]);

    useEffect(() => {
        setSearch(globalSearch);
    }, [globalSearch, setSearch]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const statusMatch =
                filterStatus === "all" || task.status === filterStatus;
            const priorityMatch =
                filterPriority === "all" || task.priority === filterPriority;
            return statusMatch && priorityMatch;
        });
    }, [tasks, filterStatus, filterPriority]);

    const stateManager = {
        tasks,
        isLoading,
        error,
        fetchTasks,
        updateTask,
        deleteTask,
        setSearch,
        openModal,
        closeModal,
        isModalOpen,
        activeTask,
        setActiveTask,
        filterStatus,
        setFilterStatus,
        filterPriority,
        setFilterPriority,
        globalSearch,
        setGlobalSearch,
        filteredTasks,
        allTasks,
        deleteSelectedTasks,
        selectStatus,
        setSelectStatus,
        selected,
        setSelected,
        setResultSelectedDelete,
        resultSelectedDelete,
    }

    return stateManager
}
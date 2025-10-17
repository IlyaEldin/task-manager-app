import { useState, useEffect } from "react";
import { useTasksContext } from "../context/TasksContext/TasksContext";

export default function useModal() {

    const { tasks } = useTasksContext();
    const [isModalOpen, setIsModalOpen] = useState({
        taskStatus: false,
        updateStatus: false,
        editStatus: false,
    });
    const [activeTask, setActiveTask] = useState(null);

    useEffect(() => {
        if (activeTask) {
            const updatedTask = tasks.find((t) => t.id === activeTask.id);
            if (updatedTask) {
                setActiveTask(updatedTask);
            }
        }
    }, [tasks, activeTask, setActiveTask]);

    const updateActiveTask = (updatedTask) => {
        setActiveTask(updatedTask);
    };



    useEffect(() => {
        let timeoutId;

        function editStatusClose() {
            setIsModalOpen((prev) => ({ ...prev, editStatus: false }));
        }

        if (isModalOpen.editStatus) {
            timeoutId = setTimeout(editStatusClose, 2000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isModalOpen.editStatus]);



    const openModal = (type) => {
        setIsModalOpen((prev) => ({ ...prev, [type]: true }))
    };

    const closeModal = (type) => {
        setIsModalOpen((prev) => ({ ...prev, [type]: false }))
    };

    return { openModal, closeModal, isModalOpen, activeTask, setActiveTask, updateActiveTask }
}
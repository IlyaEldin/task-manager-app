import { useState, useEffect } from "react";

export default function useModal() {


    const [activeTask, setActiveTask] = useState(null);

    const updateActiveTask = (updatedTask) => {
        setActiveTask(updatedTask);
    };


    const [isModalOpen, setIsModalOpen] = useState({
        taskStatus: false,
        updateStatus: false,
        editStatus: false,
    });

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
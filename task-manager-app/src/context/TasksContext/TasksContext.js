import { createContext, useContext } from 'react';

export const TasksContext = createContext();

export const useTasksContext = () => {
    const context = useContext(TasksContext);
    return context; // возвращает весь контекст
};
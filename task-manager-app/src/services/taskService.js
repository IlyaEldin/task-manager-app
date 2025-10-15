import axios from 'axios';
import { API_CONFIG, getApiUrl } from './api-config';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
};

export const taskService = {
    async createTask(taskData) {
        try {
            const response = await axios.post(
                getApiUrl(API_CONFIG.ENDPOINTS.TASKS.BASE),
                taskData,
                {
                    timeout: API_CONFIG.TIMEOUT,
                    headers: getAuthHeaders(),
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || 'Ошибка при создании задачи'
            );
        }
    },

    async getTasks() {
        try {
            const response = await axios.get(
                getApiUrl(API_CONFIG.ENDPOINTS.TASKS.BASE),
                {
                    timeout: API_CONFIG.TIMEOUT,
                    headers: getAuthHeaders(),
                }
            );
            return response.data;
        } catch (error) {
            console.error('Ошибка получения задач:', error.message);
            throw error;
        }
    },

    async updateTask(taskData) {
        try {
            const response = await axios.put(
                getApiUrl(API_CONFIG.ENDPOINTS.TASKS.BY_ID(taskData.id)),
                taskData,
                {
                    timeout: API_CONFIG.TIMEOUT,
                    headers: getAuthHeaders(),
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || 'Ошибка при обновлении задачи'
            );
        }
    },

    async deleteTask(taskId) {
        try {
            const response = await axios.delete(
                getApiUrl(API_CONFIG.ENDPOINTS.TASKS.BY_ID(taskId)),
                {
                    timeout: API_CONFIG.TIMEOUT,
                    headers: getAuthHeaders(),
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || 'Ошибка при удалении задачи'
            );
        }
    },
};
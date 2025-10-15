import axios from 'axios';
import { API_CONFIG, getApiUrl } from './api-config';

export const authService = {
    async login(credentials) {

        try {
            const response = await axios.post(
                getApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN),
                credentials,
                {
                    timeout: API_CONFIG.TIMEOUT,
                }
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                authService.saveUser(response.data.user);
            }

            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || 'Ошибка при авторизации'
            );
        }
    },

    async register(userData) {
        try {
            const response = await axios.post(
                getApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER),
                userData,
                {
                    timeout: API_CONFIG.TIMEOUT,
                }
            );


            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                authService.saveUser(response.data.user); // 
            }

            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || 'Ошибка при регистрации'
            );
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    saveUser(userData) {
        localStorage.setItem('user', JSON.stringify(userData));
    },


    getUser() {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
};
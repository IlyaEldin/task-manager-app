const getBaseUrl = () => {
    // Если в браузере
    if (typeof window !== 'undefined') {
        // Локальная разработка (npm run dev)
        if (window.location.hostname === 'localhost' && import.meta.env.MODE === 'development') {
            return 'http://localhost:3001/api';  // ← для локального запуска
        }
        // Docker разработка
        else {
            return '/api';  // ← относительный путь для Docker
        }
    }
    return '/api';
};

export const API_CONFIG = {
    BASE_URL: getBaseUrl(),  // ← ОТНОСИТЕЛЬНЫЙ ПУТЬ
    ENDPOINTS: {
        TASKS: {
            BASE: '/tasks',
            BY_ID: (id) => `/tasks/${id}`
        },
        USERS: {
            BASE: '/users',
            PROFILE: '/profile',
        },
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            LOGOUT: '/auth/logout',
        }
    },
    TIMEOUT: 10000,
};

export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

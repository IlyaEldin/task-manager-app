export const getStatusColor = (status) => {
    const statusColors = {
        'pending': 'var(--status-pending)',
        'in-progress': 'var(--status-in-progress)',
        'completed': 'var(--status-completed)',
    };

    return statusColors[status] || 'var(--gray)';
};

export const getPercentage = (subtasks) => {
    if (!subtasks || subtasks.length === 0) {
        return 0;
    }

    const completedCount = subtasks.filter(subtask => subtask.completed).length;
    const percentage = (completedCount / subtasks.length) * 100;

    return Math.round(percentage);
};

export const getProgressColor = (percentage) => {
    if (percentage <= 30) return 'var(--status-pending)';
    if (percentage <= 70) return 'var(--status-in-progress)';
    return 'var(--status-completed)';
};


export const getStatusText = (status) => {
    const statusTexts = {
        'pending': 'Ожидает',
        'in-progress': 'В работе',
        'completed': 'Выполнена',
    };

    return statusTexts[status] || status;
};

export const getPriorityText = (priority) => {
    const priorityTexts = {
        'low': 'Низкий',
        'medium': 'Средний',
        'high': 'Высокий',
        'urgent': 'Срочный'
    };

    return priorityTexts[priority] || priority;
};

export const getPriorityColor = (priority) => {
    const priorityColors = {
        'low': 'var(--status-completed)',
        'medium': 'var(--status-in-progress)',
        'high': 'var(--status-pending)',
        'urgent': 'var(--status-cancelled)'
    };

    return priorityColors[priority] || 'var(--gray)';
};
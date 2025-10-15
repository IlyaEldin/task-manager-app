import { getDb } from '../config/database.js';

export class Task {
    static async create(userId, taskData) {
        const db = getDb();

        const taskResult = await db.run(
            `INSERT INTO tasks (user_id, title, description, status, priority, due_date, tags) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                taskData.title,
                taskData.description,
                taskData.status || 'pending',
                taskData.priority || 'medium',
                taskData.dueDate,
                JSON.stringify(taskData.tags || [])
            ]
        );

        const taskId = taskResult.lastID;
        const createdSubtasks = [];


        if (taskData.subtasks && taskData.subtasks.length > 0) {
            for (const subtask of taskData.subtasks) {
                const subtaskResult = await db.run(
                    'INSERT INTO subtasks (task_id, title, completed) VALUES (?, ?, ?)',
                    [taskId, subtask.title, subtask.completed || false]
                );

                createdSubtasks.push({
                    id: subtaskResult.lastID,
                    title: subtask.title,
                    completed: Boolean(subtask.completed || false)
                });
            }
        }


        return {
            taskId: taskId,
            subtasks: createdSubtasks
        };
    }

    static async findByUserId(userId) {
        const db = getDb();

        const tasks = await db.all('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [userId]);


        for (const task of tasks) {
            const subtasks = await db.all(
                'SELECT * FROM subtasks WHERE task_id = ?',
                [task.id]
            );

            task.subtasks = subtasks.map(st => ({
                id: `${task.id}-${st.id}`,
                title: st.title,
                completed: Boolean(st.completed)
            }));

            task.tags = JSON.parse(task.tags || '[]');
            task.createdAt = task.created_at;
            task.dueDate = task.due_date;

            delete task.created_at;
            delete task.due_date;
        }

        return tasks;
    }

    static async update(taskId, userId, taskData) {
        const db = getDb();

        await db.run(
            `UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, tags = ? 
       WHERE id = ? AND user_id = ?`,
            [
                taskData.title,
                taskData.description,
                taskData.status,
                taskData.priority,
                taskData.dueDate,
                JSON.stringify(taskData.tags || []),
                taskId,
                userId
            ]
        );

        await db.run('DELETE FROM subtasks WHERE task_id = ?', [taskId]);

        if (taskData.subtasks && taskData.subtasks.length > 0) {
            for (const subtask of taskData.subtasks) {
                await db.run(
                    'INSERT INTO subtasks (task_id, title, completed) VALUES (?, ?, ?)',
                    [taskId, subtask.title, subtask.completed || false]
                );
            }
        }
    }

    static async delete(taskId, userId) {
        const db = getDb();

        await db.run('DELETE FROM subtasks WHERE task_id = ?', [taskId]);
        await db.run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    }
}
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { Task } from '../models/Task.js';

const router = express.Router();

// Все маршруты требуют токена!!!
router.use(authenticateToken);

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findByUserId(req.user.id);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const taskData = req.body;
        const userId = req.user.id;

        if (!taskData.title) {
            return res.status(400).json({ error: 'Title is required' });
        }


        const result = await Task.create(userId, taskData);


        res.status(201).json({
            success: true,
            taskId: result.taskId,
            subtasks: result.subtasks
        });


    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// обновление задачи
router.put('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        await Task.update(taskId, req.user.id, taskData);

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        await Task.delete(taskId, req.user.id);

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
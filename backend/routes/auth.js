import express from 'express';
import { User } from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ error: 'Name and password required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const existingUser = await User.findByName(name);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const userId = await User.create(name, password);
        const token = generateToken(userId);

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: userId, name }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ error: 'Name and password required' });
        }

        const user = await User.findByName(name);
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await User.validatePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user.id);

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
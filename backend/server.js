import express from 'express';
import cors from 'cors';
import { initDatabase } from './config/database.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

const app = express();
const PORT = 3001;
// для всего!!!
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: false
}));

app.use(express.json());

// Инициализация БД
initDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is working!',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db = null;

const getDbPath = () => {

    if (process.env.DOCKER_ENV === 'true' || fs.existsSync('/.dockerenv')) {

        return '/app/data/database.db';
    } else {

        return join(__dirname, '..', 'database.db');
    }
};

export const initDatabase = () => {
    return new Promise((resolve, reject) => {
        const dbPath = getDbPath();
        const dbDir = dirname(dbPath);


        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
            console.log('Created database directory:', dbDir);
        }

        console.log('Database path:', dbPath);

        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database:', err);
                reject(err);
            } else {
                console.log('Connected to SQLite database');
                createTables().then(resolve).catch(reject);
            }
        });
    });
};


const createTables = async () => {
    return new Promise((resolve, reject) => {
        // Таблица пользователей
        db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
            if (err) reject(err);

            // Таблица задач
            db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          status TEXT DEFAULT 'pending',
          priority TEXT DEFAULT 'medium',
          due_date TEXT,
          tags TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id)
        )
      `, (err) => {
                if (err) reject(err);

                // Таблица подзадач
                db.run(`
          CREATE TABLE IF NOT EXISTS subtasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (task_id) REFERENCES tasks (id)
          )
        `, async (err) => {
                    if (err) reject(err);

                    // Создаем тестового пользователя
                    try {
                        const hashedPassword = await bcrypt.hash('123456', 10);
                        db.run(
                            'INSERT OR IGNORE INTO users (name, password) VALUES (?, ?)',
                            ['testuser', hashedPassword],
                            (err) => {
                                if (err) reject(err);
                                console.log('Database initialized with test user');
                                resolve();
                            }
                        );
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        });
    });
};

const dbRun = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID, changes: this.changes });
        });
    });
};

const dbGet = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const dbAll = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

export const getDb = () => {
    if (!db) throw new Error('Database not initialized');
    return { run: dbRun, get: dbGet, all: dbAll };
};
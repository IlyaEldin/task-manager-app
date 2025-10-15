import { getDb } from '../config/database.js';
import bcrypt from 'bcryptjs';

export class User {
    static async create(name, password) {
        const db = getDb();
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.run(
            'INSERT INTO users (name, password) VALUES (?, ?)',
            [name, hashedPassword]
        );

        return result.lastID;
    }

    static async findByName(name) {
        const db = getDb();
        return await db.get('SELECT * FROM users WHERE name = ?', [name]);
    }

    static async findById(id) {
        const db = getDb();
        return await db.get('SELECT id, name FROM users WHERE id = ?', [id]);
    }

    static async validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
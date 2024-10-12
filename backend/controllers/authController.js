const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

// User registration
exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the email already exists
        const existingUser = await db.query('SELECT * FROM f1_app.users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ success: false, message: 'User with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO f1_app.users (email, password_hash) VALUES ($1, $2) RETURNING id',
            [email, hashedPassword]
        );
        const userId = result.rows[0].id;
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error in /register:', error);
        res.status(500).json({ success: false, message: 'Error registering user.' });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM f1_app.users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (user && (await bcrypt.compare(password, user.password_hash))) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ success: true, token, user});
        } else {
            res.status(400).json({ success: false, message: 'Invalid credentials.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error logging in.' });
    }
};

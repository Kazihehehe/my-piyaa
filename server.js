require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== CORS CONFIGURATION =====
app.use(cors({
    origin: 'https://kazihehehe.github.io', // Your GitHub Pages URL
    methods: ['GET', 'POST'],
    credentials: true
}));

// ===== MIDDLEWARE =====
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// ===== LOGIN ROUTE =====
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // 🚨 UNSAFE - DO NOT USE IN PRODUCTION
    console.log(`Login attempt: ${email} / ${password}`);  

    // Build credentials array from env variables
    const credentials = [
        { email: process.env.email1, password: process.env.pass1 },
        { email: process.env.email2, password: process.env.pass2 },
        { email: process.env.email3, password: process.env.pass3 },
        { email: process.env.email4, password: process.env.pass4 },
        { email: process.env.email5, password: process.env.pass5 }
    ];

    // Check if the provided email/password matches any pair
    const isValid = credentials.some(
        cred => email === cred.email && password === cred.password
    );

    if (isValid) {
        return res.status(200).json({ success: true, message: 'Login successful' });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// ===== FALLBACK TO INDEX.HTML =====
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

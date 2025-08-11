require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Allow your GitHub Pages site to call your Render backend
app.use(cors({
    origin: 'https://kazihehehe.github.io',
    methods: ['POST', 'GET'],
    credentials: true
}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Secure login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Debug logging (remove in production)
   console.log(`
    🔍 Login Attempt:
    Timestamp: ${new Date().toISOString()}
    IP: ${ip}
    Country: ${geo.country || 'Unknown'}
    City: ${geo.city || 'Unknown'}
    Email: ${email}
    `);
    
    // Validate against environment variables
   if (
    (email === process.env.email1 && password === process.env.pass1) ||
    (email === process.env.email2 && password === process.env.pass2) ||
    (email === process.env.email3 && password === process.env.pass3) ||
    (email === process.env.email4 && password === process.env.pass4) ||
    (email === process.env.email5 && password === process.env.pass5)
) {
        return res.status(200).json({ success: true });
    }
    
    return res.status(401).json({ success: false });
});

// Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


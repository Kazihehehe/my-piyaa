require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Secure login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Debug logging (remove in production)
    console.log('Login attempt:', { email });
    
    // Validate against environment variables
    if (email === process.env.ADMIN_EMAIL && 
        password === process.env.ADMIN_PASSWORD) {
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

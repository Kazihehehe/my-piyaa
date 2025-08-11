require('dotenv').config(); // Add this at the top
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Create server
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Rate limiting for login
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts
  message: 'Too many login attempts, please try again later'
});

// Credentials from environment variables
const validCredentials = [
  { email: process.env.ADMIN_EMAIL_1, password: process.env.ADMIN_PASSWORD_1 },
  { email: process.env.ADMIN_EMAIL_2, password: process.env.ADMIN_PASSWORD_2 },
  { email: process.env.ADMIN_EMAIL_3, password: process.env.ADMIN_PASSWORD_3 },
  { email: process.env.ADMIN_EMAIL_4, password: process.env.ADMIN_PASSWORD_4 },
  { email: process.env.ADMIN_EMAIL_5, password: process.env.ADMIN_PASSWORD_5 }
];

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.static(__dirname));

// Login route with rate limiting
app.post('/login', limiter, (req, res) => {
  const { email, password } = req.body;
  
   if (email === process.env.ADMIN_EMAIL && 
        password === process.env.ADMIN_PASSWORD) {
        return res.status(200).send('OK');
    }
    
    return res.status(401).send('Invalid credentials');
});

// Serve HTML files
app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Login endpoints are secured');
});

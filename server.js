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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Login route with rate limiting
app.post('/login', limiter, (req, res) => {
  const { email, password } = req.body;
  
  const isValid = validCredentials.some(cred => 
    cred.email === email && cred.password === password
  );

  if (isValid) {
    return res.sendStatus(200); // Success status
  } else {
    return res.sendStatus(401); // Unauthorized status
  }
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

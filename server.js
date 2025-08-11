
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Create server
const app = express();
const PORT = process.env.PORT || 3000;

// Multiple credentials - MAKE SURE THIS IS UPDATED
const validCredentials = [
  { email: "rafiza@owner.com", password: "mommy" },
   { email: "shreya@bsf.com", password: "bsfforever" },
    { email: "suhana@kazi.com", password: "divalesbo" },
    { email: "soham@kazi.com", password: "gandjalo" },
    { email: "kazi@owner.com", password: "rafiza" },
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Login route with debugging
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt with:', { email, password }); // Debug log
  console.log('Valid credentials:', validCredentials); // Debug log
  
  const isValid = validCredentials.some(cred => 
    cred.email === email && cred.password === password
  );

  if (isValid) {
    console.log('Successful login for:', email); // Debug log
    return res.redirect('/home.html');
  }
  
  console.log('Failed login attempt for:', email); // Debug log
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
  console.log('Configured credentials:', validCredentials); // Show credentials on startup
});

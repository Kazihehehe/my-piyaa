

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Create server
const app = express();
const PORT = process.env.PORT || 3000;

// Multiple credentials
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

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Check if credentials match any in the array
  const isValid = validCredentials.some(cred => 
    cred.email === email && cred.password === password
  );

  if (isValid) {
    return res.redirect('/home.html');
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
});

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Create server
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "piyaa@example.com" && password === "18party") {
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

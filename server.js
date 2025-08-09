const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));

// Routes
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "piyaa@example.com" && password === "18party") {
    return res.redirect('/home.html');
  }
  return res.status(401).send('Invalid credentials');
});

// Static file routes (must come before catch-all)
app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all route (must come last)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

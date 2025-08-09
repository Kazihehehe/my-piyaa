const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "piyaa@example.com" && password === "18party") {
    return res.redirect('/home.html');
  }
  return res.status(401).send('Invalid credentials');
});

// All other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple validation - replace with your actual credentials
  if (email === "piyaa@example.com" && password === "18party") {
    return res.redirect('/home');
  } else {
    return res.send('Invalid credentials. <a href="/">Try again</a>');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});


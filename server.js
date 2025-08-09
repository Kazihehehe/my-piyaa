const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files

// Login route (POST)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "piyaa@example.com" && password === "18party") {
    return res.redirect('/home.html'); // Redirect to home.html on success
  }
  return res.redirect('/?error=1'); // Redirect back to login on failure
});

// Serve home.html directly when requested
app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Default route (serve index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

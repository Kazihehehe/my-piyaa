const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Routes
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === "piyaa@example.com" && password === "18party") {
    return res.json({ success: true, redirect: '/home.html' });
  }
  
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Serve all HTML files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

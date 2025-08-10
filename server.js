const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from root
app.use(express.static(path.join(__dirname)));

// API route for login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === "piyaa@example.com" && password === "18party") {
    return res.json({ success: true, redirect: '/home.html' });
  }
  
  return res.status(401).json({ 
    success: false, 
    message: 'Invalid credentials' 
  });
});

// Serve all HTML files
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  
  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // Handle 404 - Page not found
    res.status(404).sendFile(path.join(__dirname, '404.html'));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, '500.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

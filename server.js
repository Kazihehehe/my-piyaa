const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from current directory
app.use(express.static(__dirname));

// Handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "piyaa@example.com" && password === "18party") {
    return res.redirect('/home.html');
  }
  return res.redirect('/?error=1');
});

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

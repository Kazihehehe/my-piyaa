const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Preset credentials (can be replaced with DB logic)
const USERNAME = "Rafiza";
const PASSWORD = "kazi";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    return res.redirect('/home.html'); // Your main site after login
  } else {
    return res.send('Invalid credentials. <a href="/login.html">Try again</a>');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



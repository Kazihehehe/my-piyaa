
const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet'); // Security middleware
const rateLimit = require('express-rate-limit'); // Brute force protection
const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced configuration
const config = {
  credentials: [
    { email: "rafiza@owner.com", password: "mommy" },
   { email: "shreya@bsf.com", password: "bsfforever" },
    { email: "suhana@kazi.com", password: "divalesbo" },
    { email: "soham@kazi.com", password: "gandjalo" },
    { email: "kazi@owner.com", password: "rafiza" },
  ],
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
};

// Security middleware
app.use(helmet());
app.disable('x-powered-by');

// Rate limiting
const limiter = rateLimit(config.rateLimiting);
app.use('/api/login', limiter);

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Serve static files with cache control
app.use(express.static(path.join(__dirname), {
  maxAge: '1d',
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Enhanced login endpoint
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }
    
    // Check credentials
    const isValid = config.credentials.some(cred => 
      cred.email === email && cred.password === password
    );
    
    if (isValid) {
      return res.json({ 
        success: true, 
        redirect: '/home.html',
        token: generateToken(email) // Optional: for session management
      });
    }
    
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Simple token generation (example)
function generateToken(email) {
  return Buffer.from(`${email}:${Date.now()}`).toString('base64');
}

// Enhanced static file serving with proper MIME types
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  const extname = path.extname(filePath);
  
  // Set MIME type based on file extension
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).sendFile(path.join(__dirname, '404.html'));
      } else {
        res.status(500).sendFile(path.join(__dirname, '500.html'));
      }
    } else {
      res.setHeader('Content-Type', contentType);
      res.end(content, 'utf-8');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).sendFile(path.join(__dirname, '500.html'));
});

// Server startup
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

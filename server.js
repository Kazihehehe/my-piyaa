require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== SECURITY MIDDLEWARE =====
app.use(helmet());
app.use(requestIp.mw());
app.set('trust proxy', true);

// ===== CORS CONFIGURATION =====
app.use(cors({
    origin: 'https://kazihehehe.github.io',
    methods: ['GET', 'POST'],
    credentials: true
}));

// ===== SESSION CONFIGURATION =====
app.use(session({
    secret: process.env.SESSION_SECRET || 'complex-secret-key-here',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: true, // Requires HTTPS
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));


// ===== RATE LIMITING =====
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts
    message: 'Too many login attempts, please try again later.'
});

// ===== APPLICATION MIDDLEWARE =====
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve only public assets like CSS, JS, images


// ===== SECURE LOGIN ROUTE =====
app.post('/login', loginLimiter, (req, res) => {
    const { email, password } = req.body;
    const clientIp = req.clientIp;
    const geo = geoip.lookup(clientIp) || {};

    // Safe logging (no passwords)
    console.log(`Login attempt from ${clientIp} (${geo.country || 'Unknown'})`);
    console.log(`Email attempt: ${email}`);
    console.log(`Password length: ${password ? password.length : 0}`);

    // Build credentials from environment variables
    const credentials = [
        { email: process.env.ADMIN_EMAIL_1, password: process.env.ADMIN_PASS_1 },
        { email: process.env.ADMIN_EMAIL_2, password: process.env.ADMIN_PASS_2 },
        { email: process.env.ADMIN_EMAIL_3, password: process.env.ADMIN_PASS_3 },
        { email: process.env.ADMIN_EMAIL_4, password: process.env.ADMIN_PASS_4 },
        { email: process.env.ADMIN_EMAIL_5, password: process.env.ADMIN_PASS_5 }
    ].filter(cred => cred.email && cred.password); // Filter out undefined credentials

    const isValid = credentials.some(
        cred => email === cred.email && password === cred.password
    );

    if (isValid) {
        req.session.authenticated = true;
        req.session.userEmail = email;
        return res.json({ 
            success: true, 
            message: 'Login successful',
            redirect: '/home.html' // Client will handle redirect
        });
    } else {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
        });
    }
});

// ===== AUTHORIZED ROUTES =====
app.get('/home', (req, res) => {
    if (!req.session.authenticated) {
        return res.status(403).sendFile(path.join(__dirname, 'unauthorized.html'));
    }
    res.sendFile(path.join(__dirname, 'home.html'));
});

// ===== LOGOUT ROUTE =====
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out successfully' });
});

// ===== FALLBACK ROUTE =====
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`✅ Server running securely on port ${PORT}`);
});

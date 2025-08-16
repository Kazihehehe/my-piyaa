require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== SECURITY MIDDLEWARE =====
app.use(helmet());
app.use(requestIp.mw());
app.set('trust proxy', 1); // Required for secure cookies on Render

// ===== CORS CONFIGURATION =====
app.use(cors({
    origin: 'https://kazihehehe.github.io',
    methods: ['GET', 'POST'],
    credentials: true
}));

// ===== SESSION CONFIGURATION (MongoDB store) =====
app.use(session({
    secret: process.env.SESSION_SECRET || 'complex-secret-key-here',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: { 
        secure: true,         // Only send over HTTPS
        httpOnly: true,       // JS can't read cookie
        sameSite: 'strict',   // No cross-site sending
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

// ===== STATIC ASSETS (public only) =====
app.use(express.static(path.join(__dirname, 'public')));

// ===== LOGIN ROUTE =====
app.post('/login', loginLimiter, (req, res) => {
    const { email, password } = req.body;
    const clientIp = req.clientIp;
    const geo = geoip.lookup(clientIp) || {};

    console.log(`Login attempt from ${clientIp} (${geo.country || 'Unknown'})`);
    console.log(`Email attempt: ${email}`);

    // Load credentials from environment variables
    const credentials = [
        { email: process.env.email1, password: process.env.pass1 },
        { email: process.env.email2, password: process.env.pass2 },
        { email: process.env.email3, password: process.env.pass3 },
        { email: process.env.email4, password: process.env.pass4 },
        { email: process.env.email5, password: process.env.pass5 }
    ].filter(cred => cred.email && cred.password);

    const isValid = credentials.some(
        cred => email === cred.email && password === cred.password
    );

    if (isValid) {
        req.session.authenticated = true;
        req.session.userEmail = email;
        return res.json({ 
            success: true, 
            message: 'Login successful',
            redirect: '/home'
        });
    } else {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
        });
    }
});

// ===== PROTECTED HOME ROUTE =====
app.get('/home', (req, res) => {
    if (!req.session.authenticated) {
        return res.status(403).sendFile(path.join(__dirname, 'unauthorized.html'));
    }
    res.sendFile(path.join(__dirname, 'home.html'));
});

// ===== LOGOUT ROUTE =====
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// ===== 404 HANDLER =====
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`✅ Server running securely on port ${PORT}`);
});

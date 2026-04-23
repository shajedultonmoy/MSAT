// filepath: backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from root directory
app.use(express.static(path.join(__dirname, '../')));

// API Routes
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'MSAT Portfolio API is running',
        site: 'MSAT Portfolio'
    });
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

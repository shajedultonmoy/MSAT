const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // For parsing application/json and application/x-www-form-urlencoded
const { check } = require('express-validator'); // For server-side validation

// Import the contact controller
const contactController = require('./controllers/contactController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For parsing URL-encoded data

// Contact Form Endpoint
app.post(
    '/api/contact',
    [
        // Server-side validation rules
        check('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
        check('email').isEmail().withMessage('Please enter a valid email address'),
        check('subject').trim().isLength({ min: 3 }).withMessage('Subject must be at least 3 characters long'),
        check('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters long'),
        check('phone').optional({ checkFalsy: true }).matches(/^[\d\s\-\+\(\)]+$/).withMessage('Please enter a valid phone number')
    ],
    contactController.submitContact // Use the submitContact function from the controller
);

// Health check
app.get('/', (req, res) => res.send('MSAT Portfolio Backend Running...'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
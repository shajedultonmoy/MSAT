// filepath: backend/routes/contact.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');

// Validation middleware
const validateContactForm = [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('subject').trim().isLength({ min: 3 }).withMessage('Subject must be at least 3 characters'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

// POST - Submit contact form
router.post('/', validateContactForm, contactController.submitContact);

// GET - Get all contacts (admin - for demo)
router.get('/', contactController.getAllContacts);

module.exports = router;

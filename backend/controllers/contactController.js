// filepath: backend/controllers/contactController.js
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// In-memory storage for contacts (replace with database in production)
let contacts = [];

function buildContactStore() {
    return {
        site: 'MSAT Portfolio',
        version: 1,
        updatedAt: new Date().toISOString(),
        totalContacts: contacts.length,
        contacts
    };
}

// Create transporter for sending emails
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'tonmoyshajedul@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password'
        }
    });
};

// Submit contact form
exports.submitContact = async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, email, phone, subject, message } = req.body;

        // Save contact to storage
        const newContact = {
            id: Date.now(),
            name,
            email,
            phone: phone || 'Not provided',
            subject,
            message,
            createdAt: new Date().toISOString()
        };

        contacts.push(newContact);

        // Save to JSON file for persistence
        saveContactsToFile();

        // Send email notification
        try {
            const transporter = createTransporter();
            
            await transporter.sendMail({
                from: process.env.EMAIL_USER || 'tonmoyshajedul@gmail.com',
                to: 'tonmoyshajedul@gmail.com',
                subject: `New Contact: ${subject}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                    <hr>
                    <p><small>Sent from MSAT Portfolio</small></p>
                `
            });

            console.log('Email sent successfully');
        } catch (emailError) {
            console.error('Email sending failed:', emailError.message);
            // Continue even if email fails - contact is still saved
        }

        res.status(201).json({
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
            contactId: newContact.id
        });

    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.'
        });
    }
};

// Get all contacts (admin endpoint)
exports.getAllContacts = (req, res) => {
    res.json({
        success: true,
        count: contacts.length,
        contacts: [...contacts].reverse() // Most recent first
    });
};

// Helper function to save contacts to file
function saveContactsToFile() {
    const dataPath = path.join(__dirname, '../data/contacts.json');
    
    // Ensure data directory exists
    const dataDir = path.dirname(dataPath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(dataPath, JSON.stringify(buildContactStore(), null, 2));
}

// Load contacts from file on startup
function loadContactsFromFile() {
    const dataPath = path.join(__dirname, '../data/contacts.json');
    if (fs.existsSync(dataPath)) {
        try {
            const data = fs.readFileSync(dataPath, 'utf8');
            const parsedData = JSON.parse(data);

            if (Array.isArray(parsedData)) {
                contacts = parsedData;
            } else if (parsedData && Array.isArray(parsedData.contacts)) {
                contacts = parsedData.contacts;
            } else {
                contacts = [];
            }

            console.log(`Loaded ${contacts.length} contacts from file`);
        } catch (error) {
            console.error('Error loading contacts:', error);
            contacts = [];
        }
    } else {
        saveContactsToFile();
    }
}

// Initialize contacts on module load
loadContactsFromFile();

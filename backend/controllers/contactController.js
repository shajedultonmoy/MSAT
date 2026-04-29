// filepath: backend/controllers/contactController.js
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
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
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Submit contact form
exports.submitContact = async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0];
            return res.status(400).json({
                success: false,
                message: firstError.msg,
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

        // Send email notification if credentials are configured
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        const emailConfigured = emailUser && emailPass;

        if (emailConfigured) {
            try {
                const transporter = createTransporter();

                await transporter.sendMail({
                    from: emailUser,
                    to: emailUser,
                    subject: `New Contact: ${subject}`,
                    html: `
                        <div style="font-family: sans-serif; background-color: #F0F9FF; padding: 30px; border-radius: 12px;">
                            <div style="background-color: #4C3BCF; padding: 20px; border-radius: 10px 10px 0 0; border-bottom: 3px solid #4B70F5;">
                                <h2 style="margin: 0; color: #ffffff;">New Contact Form Submission</h2>
                            </div>
                            <div style="background-color: #ffffff; padding: 25px; border-radius: 0 0 10px 10px; color: #2c3e50; line-height: 1.6;">
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                                <p><strong>Subject:</strong> ${subject}</p>
                                <p style="margin-top: 20px;"><strong>Message:</strong></p>
                                <div style="background-color: #F8FAFC; padding: 15px; border-left: 5px solid #4C3BCF; font-style: italic;">${message}</div>
                                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                <p style="font-size: 0.8em; color: #777;">Sent from MSAT Portfolio</p>
                            </div>
                        </div>
                    `
                });

                console.log('Email sent successfully');
            } catch (emailError) {
                console.error('Email sending failed:', emailError.message);
                // Continue even if email fails - contact is still saved
            }
        } else {
            console.warn('Email notification skipped: EMAIL_USER or EMAIL_PASS is not configured properly.');
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
async function saveContactsToFile() {
    const dataPath = path.join(__dirname, '../data/contacts.json');

    // Ensure data directory exists
    const dataDir = path.dirname(dataPath);
    try {
        await fs.mkdir(dataDir, { recursive: true });
        await fs.writeFile(dataPath, JSON.stringify(buildContactStore(), null, 2));
    } catch (err) {
        console.error('Failed to save contacts:', err);
    }
}

// Load contacts from file on startup
async function loadContactsFromFile() {
    const dataPath = path.join(__dirname, '../data/contacts.json');
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        const parsedData = JSON.parse(data);
        contacts = parsedData.contacts || [];
        console.log(`Loaded ${contacts.length} contacts from file`);
    } catch (error) {
        // If file doesn't exist, we just start with empty array
        contacts = [];
    }
}

// Initialize contacts on module load
loadContactsFromFile();

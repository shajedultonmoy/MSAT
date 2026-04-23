# MSAT Portfolio Backend

Backend API for the MSAT Portfolio website built with Node.js and Express.

## Features

- **Contact Form API** - Handles form submissions and sends email notifications
- **Email Integration** - Nodemailer for sending contact notifications
- **Data Persistence** - Stores contacts in JSON file
- **Validation** - Server-side form validation with express-validator
- **CORS Support** - Cross-origin requests enabled

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Open `.env` file
   - Update `EMAIL_PASS` with your Gmail App Password
   - For Gmail: Enable 2-Step Verification, then generate an App Password

## Running the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all contacts (admin) |
| GET | `/api/health` | Health check |

## Request/Response Examples

### POST /api/contact

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a new project..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon.",
  "contactId": 1234567890
}
```

## Project Structure

```
MSAT/
├── backend/
│   ├── controllers/
│   │   └── contactController.js
│   ├── routes/
│   │   └── contact.js
│   ├── data/
│   │   └── contacts.json
│   ├── .env
│   ├── package.json
│   └── server.js
├── index.html
├── contact.html
├── services.html
├── skills.html
├── script.js
└── style.css
```

## Notes

- The backend serves static files from the root directory
- Contacts are stored in `backend/data/contacts.json`
- Email is sent via Gmail SMTP (configure App Password in `.env`)
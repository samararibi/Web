// backend/utils/emailService.js

const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP
const smtpConfig = {
  host: 'smtp.yoursmtpserver.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password'
  }
};

module.exports = { smtpConfig };

// backend/controllers/emailController.js

const nodemailer = require('nodemailer');
const { smtpConfig } = require('../utils/emailService');

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport(smtpConfig);

// Fonction pour envoyer un email
const sendEmail = async (to, subject, text) => {
  try {
    // Options de l'email
    let mailOptions = {
      from: 'your-email@example.com',
      to: to,
      subject: subject,
      text: text
    };

    // Envoi de l'email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé:', info.messageId);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
};

module.exports = { sendEmail };

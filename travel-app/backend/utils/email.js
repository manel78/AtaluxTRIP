// backend/utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou autre
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail({ to, subject, text, html }) {
  return transporter.sendMail({
    from: `"Ataleus Trip" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendMail };

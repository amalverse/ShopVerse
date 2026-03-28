const nodemailer = require("nodemailer");

/**
 * Sends an email using the configured SMTP transporter.
 * Requires EMAIL_SERVICE, EMAIL_USER, and EMAIL_PASS in .env
 * For Gmail: use an App Password (not your login password).
 * Generate at: https://myaccount.google.com/apppasswords
 */
const sendEmail = async (options) => {
  // Validate environment config before attempting to send
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "Email configuration missing! Set EMAIL_SERVICE, EMAIL_USER, and EMAIL_PASS in your .env file."
    );
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `ShopVerse <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;


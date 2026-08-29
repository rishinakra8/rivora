// Vercel Serverless Function — /api/contact
// Receives contact form submissions, forwards to Google Sheets webhook
// (which logs to sheet and sends auto-replies directly from rishi.rivora@gmail.com),
// and optionally dispatches via Nodemailer if SMTP is configured.

const nodemailer = require('nodemailer');

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    const { name, email, phone, projectType, location, budget, area, message } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    const cleanName        = name.trim();
    const cleanEmail       = email.trim();
    const cleanPhone       = (phone && typeof phone === 'string') ? phone.trim() : 'Not Provided';
    const cleanProjectType = (projectType && typeof projectType === 'string') ? projectType.trim() : 'General Enquiry';
    const cleanLocation    = (location && typeof location === 'string') ? location.trim() : 'Not Specified';
    const cleanBudget      = (budget && typeof budget === 'string') ? budget.trim() : 'Flexible / Discussion';
    const cleanArea        = (area && typeof area === 'string') ? area.trim() : 'Not Specified';
    const cleanMessage     = (message && typeof message === 'string') ? message.trim() : '(No message provided)';
    const timestampStr     = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const payload = {
      formattedDate: timestampStr,
      name:          cleanName,
      email:         cleanEmail,
      phone:         cleanPhone,
      projectType:   cleanProjectType,
      location:      cleanLocation,
      budget:        cleanBudget,
      area:          cleanArea,
      message:       cleanMessage,
      status:        'New Lead'
    };

    // 1. Forward to Google Sheets Webhook (which writes row and triggers Auto-Reply from rishi.rivora@gmail.com)
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload)
        });
        console.log('[Contact API] Sent to Google Sheets webhook successfully.');
      } catch (sheetErr) {
        console.error('[Contact API Sheets webhook error]', sheetErr.message);
      }
    }

    // 2. Optional direct SMTP backup
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || 'rishi.rivora@gmail.com';

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const port   = parseInt(process.env.SMTP_PORT, 10) || 587;
        const secure = process.env.SMTP_SECURE === 'true' || port === 465;

        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port,
          secure,
          auth: { user: smtpUser, pass: smtpPass }
        });

        await transporter.sendMail({
          from:    `"${cleanName} via Rivora Website" <${smtpUser}>`,
          replyTo: cleanEmail,
          to:      receiver,
          subject: `✨ New Enquiry: ${cleanProjectType} — ${cleanName}`,
          text: `New Enquiry from Rivora Website:\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone}\nProject: ${cleanProjectType}\nLocation: ${cleanLocation}\nBudget: ${cleanBudget}\nArea: ${cleanArea}\n\nMessage:\n${cleanMessage}\n\nDate: ${timestampStr}`
        });
      } catch (mErr) {
        console.error('[Contact API SMTP error]', mErr.message);
      }
    }

    return res.status(200).json({ success: true, message: "Sent — We'll be in touch shortly" });

  } catch (err) {
    console.error('[Contact API Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
};

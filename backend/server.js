const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Ensure data folder and CSV logging exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const csvFilePath = path.join(dataDir, 'enquiries.csv');
if (!fs.existsSync(csvFilePath)) {
  const csvHeaders = 'Timestamp,Client Name,Email Address,Project Type,Project Details / Message,Status\n';
  fs.writeFileSync(csvFilePath, csvHeaders, 'utf8');
}

// Email validation helper
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && re.test(email.trim());
}

// Helper to escape CSV values
function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, projectType, message } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Name is required.'
      });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanProjectType = (projectType && typeof projectType === 'string') ? projectType.trim() : 'Not Specified';
    const cleanMessage = (message && typeof message === 'string') ? message.trim() : '(No message provided)';
    const timestampStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 1. Log to local CSV spreadsheet backup
    try {
      const csvRow = `${escapeCsv(timestampStr)},${escapeCsv(cleanName)},${escapeCsv(cleanEmail)},${escapeCsv(cleanProjectType)},${escapeCsv(cleanMessage)},"New Lead"\n`;
      fs.appendFileSync(csvFilePath, csvRow, 'utf8');
      console.log(`[Contact API] Logged enquiry to CSV: ${cleanName}`);
    } catch (csvErr) {
      console.error('[Contact API CSV Error]:', csvErr.message);
    }

    // 2. Forward to Google Sheets Webhook (if configured)
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const payload = {
          formattedDate: timestampStr,
          name: cleanName,
          email: cleanEmail,
          projectType: cleanProjectType,
          message: cleanMessage,
          status: 'New Lead'
        };

        // Asynchronous webhook trigger
        fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(r => r.text())
          .then(data => console.log(`[Contact API] Google Sheet response:`, data))
          .catch(gErr => console.error(`[Contact API Google Sheet Webhook Error]:`, gErr.message));
      } catch (gErr) {
        console.error('[Contact API Google Sheet Trigger Error]:', gErr.message);
      }
    }

    // 3. Email Dispatch via Nodemailer
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT, 10) || 587;
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'rishi.rivora@gmail.com';

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass
        }
      });

      const mailOptions = {
        from: `"${cleanName} via Rivora Website" <${user}>`,
        replyTo: cleanEmail,
        to: receiverEmail,
        subject: `New Project Enquiry: ${cleanProjectType} — ${cleanName}`,
        text: `New enquiry received from the Rivora Design Studio website:\n\n` +
              `Name: ${cleanName}\n` +
              `Email: ${cleanEmail}\n` +
              `Project Type: ${cleanProjectType}\n` +
              `Message:\n${cleanMessage}\n\n` +
              `Date: ${timestampStr}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 4px; background-color: #ffffff; color: #14110f;">
            <h2 style="color: #b8925a; margin-top: 0; font-weight: 500; border-bottom: 1px solid #f0eae1; padding-bottom: 12px;">New Project Enquiry — Rivora Design Studio</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; width: 130px;">Name</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${cleanName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${cleanEmail}" style="color: #b8925a; text-decoration: none;">${cleanEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Project Type</td>
                <td style="padding: 8px 0; font-size: 15px;">${cleanProjectType}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background-color: #f8f6f2; border-left: 3px solid #b8925a; border-radius: 2px;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin-bottom: 6px;">Project Details / Message:</div>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #1c1814;">${cleanMessage}</p>
            </div>
            <div style="margin-top: 24px; font-size: 11px; color: #999; text-align: center; border-top: 1px solid #f0eae1; padding-top: 12px;">
              Received via Rivora Design Studio Website Contact Form &bull; ${timestampStr}
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Contact API] Email successfully sent for ${cleanName} (${cleanEmail})`);
    } else {
      console.log('--------------------------------------------------');
      console.log('[Contact API - DEV NOTICE] SMTP credentials not set in .env.');
      console.log('Form submission received:');
      console.log('Name:', cleanName);
      console.log('Email:', cleanEmail);
      console.log('Project Type:', cleanProjectType);
      console.log('Message:', cleanMessage);
      console.log('--------------------------------------------------');
    }

    return res.status(200).json({
      success: true,
      message: "Sent — We'll be in touch"
    });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// Project page routes
app.get('/project/:id', (req, res) => {
  res.sendFile(path.join(frontendPath, 'project.html'));
});

app.get('/project', (req, res) => {
  res.sendFile(path.join(frontendPath, 'project.html'));
});

// Fallback to index.html for root or SPA navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(` Rivora Design Studio Server running at:`);
  console.log(` http://localhost:${PORT}`);
  console.log(` Serving frontend from: ${frontendPath}`);
  console.log(` API Endpoint: http://localhost:${PORT}/api/contact`);
  console.log(` Enquiries Spreadsheet: ${csvFilePath}`);
  console.log(`==================================================\n`);
});

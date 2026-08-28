// Vercel Serverless Function — /api/contact
// Receives contact form submissions, sends email via Nodemailer,
// and optionally forwards to Google Sheets webhook.

const nodemailer = require('nodemailer');

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

module.exports = async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    const { name, email, projectType, message } = req.body;

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    const cleanName        = name.trim();
    const cleanEmail       = email.trim();
    const cleanProjectType = (projectType && typeof projectType === 'string') ? projectType.trim() : 'Not Specified';
    const cleanMessage     = (message    && typeof message    === 'string') ? message.trim()    : '(No message provided)';
    const timestampStr     = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // ── Google Sheets Webhook (optional) ─────────────────────────────────────
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          formattedDate: timestampStr,
          name:          cleanName,
          email:         cleanEmail,
          projectType:   cleanProjectType,
          message:       cleanMessage,
          status:        'New Lead',
        }),
      }).catch(err => console.error('[Sheets webhook error]', err.message));
    }

    // ── Email via Nodemailer ──────────────────────────────────────────────────
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || 'rishi.rivora@gmail.com';

    if (smtpHost && smtpUser && smtpPass) {
      const port   = parseInt(process.env.SMTP_PORT, 10) || 587;
      const secure = process.env.SMTP_SECURE === 'true' || port === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from:    `"${cleanName} via Rivora Website" <${smtpUser}>`,
        replyTo: cleanEmail,
        to:      receiver,
        subject: `New Enquiry: ${cleanProjectType} — ${cleanName}`,
        text: [
          `New enquiry from the Rivora Design Studio website:`,
          ``,
          `Name:         ${cleanName}`,
          `Email:        ${cleanEmail}`,
          `Project Type: ${cleanProjectType}`,
          ``,
          `Message:`,
          cleanMessage,
          ``,
          `Received: ${timestampStr}`,
        ].join('\n'),
        html: `
          <div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e0e0e0;border-radius:4px;background:#fff;color:#14110f">
            <h2 style="color:#b8925a;margin-top:0;font-weight:500;border-bottom:1px solid #f0eae1;padding-bottom:12px">
              New Project Enquiry — Rivora Design Studio
            </h2>
            <table style="width:100%;border-collapse:collapse;margin-top:16px">
              <tr>
                <td style="padding:8px 0;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:.05em;width:130px">Name</td>
                <td style="padding:8px 0;font-size:15px;font-weight:500">${cleanName}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:.05em">Email</td>
                <td style="padding:8px 0;font-size:15px"><a href="mailto:${cleanEmail}" style="color:#b8925a;text-decoration:none">${cleanEmail}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:.05em">Project Type</td>
                <td style="padding:8px 0;font-size:15px">${cleanProjectType}</td>
              </tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#f8f6f2;border-left:3px solid #b8925a;border-radius:2px">
              <div style="font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#888;margin-bottom:6px">Message</div>
              <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap;color:#1c1814">${cleanMessage}</p>
            </div>
            <div style="margin-top:24px;font-size:11px;color:#999;text-align:center;border-top:1px solid #f0eae1;padding-top:12px">
              Received via Rivora Design Studio Website &bull; ${timestampStr}
            </div>
          </div>`,
      });

      console.log(`[Contact] Email sent for ${cleanName} (${cleanEmail})`);
    } else {
      // Dev mode — log to console if SMTP not configured
      console.log('[Contact] SMTP not configured. Submission received:');
      console.log({ name: cleanName, email: cleanEmail, projectType: cleanProjectType, message: cleanMessage });
    }

    return res.status(200).json({ success: true, message: "Sent — We'll be in touch" });

  } catch (err) {
    console.error('[Contact] Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
};

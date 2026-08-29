/**
 * =========================================================================
 * RIVORA DESIGN STUDIO — GOOGLE APPS SCRIPT
 * SPREADSHEET: https://docs.google.com/spreadsheets/d/1LQKs1tkjLWUP9tVdrsLplm80B8_z4cAWJlkW19YmkiQ/edit
 * 
 * FEATURES:
 * 1. Automatically records every enquiry into your Google Sheet with all sub-columns.
 * 2. Sends the exact branded Auto-Reply email directly from rishi.rivora@gmail.com to the client.
 * 3. Sends a notification email to rishi.rivora@gmail.com with the new lead details.
 * 
 * HOW TO DEPLOY IN 2 MINUTES:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1LQKs1tkjLWUP9tVdrsLplm80B8_z4cAWJlkW19YmkiQ/edit
 * 2. Click "Extensions" > "Apps Script" in the top menu.
 * 3. Delete any code in the editor and PASTE THIS ENTIRE FILE.
 * 4. Click "Deploy" (top right blue button) > "New deployment".
 * 5. Click the gear icon next to "Select type" > choose "Web app".
 * 6. Set:
 *    - Description: "Rivora Website Webhook & Auto-Reply"
 *    - Execute as: "Me (rishi.rivora@gmail.com)"
 *    - Who has access: "Anyone"
 * 7. Click "Deploy" > "Authorize access" (choose your Google account and allow).
 * 8. Copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * =========================================================================
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-setup headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Timestamp",
        "Client Name",
        "Email Address",
        "Phone Number",
        "Project Type",
        "Location",
        "Approx. Budget",
        "Project Area",
        "Message / Details",
        "Lead Status"
      ];
      sheet.appendRow(headers);
      
      // Style header row in luxury dark aesthetic
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#1c1814");
      headerRange.setFontColor("#b8925a");
      headerRange.setFontWeight("bold");
      headerRange.setFontFamily("Arial");
      sheet.setFrozenRows(1);
    }
    
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      data = {};
    }
    
    const timestamp = data.formattedDate || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const name = data.name || "Valued Client";
    const email = data.email || "";
    const phone = data.phone || "Not Provided";
    const projectType = data.projectType || "General Enquiry";
    const location = data.location || "Not Specified";
    const budget = data.budget || "Flexible / Discussion";
    const area = data.area || "Not Specified";
    const message = data.message || "(No additional message)";
    const status = "New Lead";
    
    // 1. Append the row to Google Sheet
    sheet.appendRow([timestamp, name, email, phone, projectType, location, budget, area, message, status]);
    
    // Auto-fit columns
    for (let col = 1; col <= 10; col++) {
      sheet.autoResizeColumn(col);
    }
    
    // 2. Send Auto-Reply directly from rishi.rivora@gmail.com to the Client
    if (email && email.indexOf("@") > 0) {
      const clientSubject = "Thank you for contacting Rivora Design Studio";
      const clientBodyText = 
`Dear ${name},

Thank you for reaching out to Rivora Design Studio.

We’re delighted to learn about your project and appreciate the opportunity to be considered for creating your space.

At Rivora, we believe that exceptional designs are built on more than aesthetics. They are shaped by thoughtful design, honest communication, meticulous detailing, and uncompromising execution. Every project we take on is an opportunity to create something distinctive — a space that reflects its purpose, its people, and a sense of individuality.

We have received your enquiry and our team is currently reviewing the details you have shared. One of our team members will be in touch with you shortly to understand your requirements in greater detail and discuss how we can take your vision forward.

Your Enquiry:
----------------------------------------
Name: ${name}
Project: ${projectType}
Location: ${location}
Email: ${email}
Phone: ${phone}
Approx. Budget: ${budget}
Project Area: ${area}

Your Message:
${message}
----------------------------------------

We believe the best projects begin with a good conversation. Whether you are looking to create a refined residence, a distinctive hospitality space, or a thoughtfully designed commercial environment, we look forward to understanding your aspirations and exploring the possibilities together.

Thank you once again for choosing to connect with Rivora.

With regards,
Rivora Design Studio
Design. Detail. Execution.
www.rivoradesignstudio.com
+91 88755 83347`;

      const clientBodyHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; color: #1c1814; border: 1px solid #eae5dd; border-radius: 4px;">
          <div style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #f0eae1;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 500; letter-spacing: 0.15em; color: #b8925a; font-family: Georgia, serif;">RIVORA</h1>
            <div style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; margin-top: 4px;">Design Studio</div>
          </div>
          
          <div style="padding: 24px 0; font-size: 15px; line-height: 1.7; color: #2d2621;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to <strong>Rivora Design Studio</strong>.</p>
            <p>We’re delighted to learn about your project and appreciate the opportunity to be considered for creating your space.</p>
            <p>At Rivora, we believe that exceptional designs are built on more than aesthetics. They are shaped by thoughtful design, honest communication, meticulous detailing, and uncompromising execution. Every project we take on is an opportunity to create something distinctive — a space that reflects its purpose, its people, and a sense of individuality.</p>
            <p>We have received your enquiry and our team is currently reviewing the details you have shared. One of our team members will be in touch with you shortly to understand your requirements in greater detail and discuss how we can take your vision forward.</p>
            
            <div style="margin: 28px 0; padding: 20px; background-color: #f9f7f4; border-left: 3px solid #b8925a; border-radius: 2px;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #b8925a; font-weight: bold; margin-bottom: 14px;">Summary of Your Enquiry</div>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 5px 0; color: #888; width: 130px;">Name</td><td style="padding: 5px 0; font-weight: 500; color: #1c1814;">${name}</td></tr>
                <tr><td style="padding: 5px 0; color: #888;">Project Type</td><td style="padding: 5px 0; font-weight: 500; color: #1c1814;">${projectType}</td></tr>
                <tr><td style="padding: 5px 0; color: #888;">Location</td><td style="padding: 5px 0; color: #1c1814;">${location}</td></tr>
                <tr><td style="padding: 5px 0; color: #888;">Email</td><td style="padding: 5px 0; color: #1c1814;">${email}</td></tr>
                <tr><td style="padding: 5px 0; color: #888;">Phone</td><td style="padding: 5px 0; color: #1c1814;">${phone}</td></tr>
                <tr><td style="padding: 5px 0; color: #888;">Approx. Budget</td><td style="padding: 5px 0; color: #1c1814;">${budget}</td></tr>
                <tr><td style="padding: 5px 0; color: #888;">Project Area</td><td style="padding: 5px 0; color: #1c1814;">${area}</td></tr>
              </table>
              ${message ? `<div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #e8e2d8; font-size: 13px; color: #555;"><strong>Message:</strong> ${message}</div>` : ''}
            </div>
            
            <p>We believe the best projects begin with a good conversation. Whether you are looking to create a refined residence, a distinctive hospitality space, or a thoughtfully designed commercial environment, we look forward to understanding your aspirations and exploring the possibilities together.</p>
            <p>Thank you once again for choosing to connect with Rivora.</p>
          </div>
          
          <div style="border-top: 1px solid #f0eae1; padding-top: 20px; font-size: 13px; color: #777; line-height: 1.6;">
            <div>With regards,</div>
            <div style="font-weight: 600; color: #1c1814; font-size: 14px; margin-top: 4px;">Rivora Design Studio</div>
            <div style="color: #b8925a; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;">Design &bull; Detail &bull; Execution</div>
            <div style="margin-top: 8px;">
              <a href="https://www.rivoradesignstudio.com" style="color: #b8925a; text-decoration: none;">www.rivoradesignstudio.com</a> &bull; 
              <a href="tel:+918875583347" style="color: #666; text-decoration: none;">+91 88755 83347</a>
            </div>
          </div>
        </div>
      `;

      // Send to client
      GmailApp.sendEmail(email, clientSubject, clientBodyText, {
        htmlBody: clientBodyHtml,
        name: "Rivora Design Studio"
      });
    }
    
    // 3. Send Lead Alert Notification to Rishi
    const ownerEmail = "rishi.rivora@gmail.com";
    const ownerSubject = "⚡ New Website Lead: " + projectType + " — " + name;
    const ownerText = "New project enquiry received:\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + phone + "\n" +
      "Project: " + projectType + "\n" +
      "Location: " + location + "\n" +
      "Budget: " + budget + "\n" +
      "Area: " + area + "\n\n" +
      "Message:\n" + message + "\n\n" +
      "Spreadsheet: https://docs.google.com/spreadsheets/d/1LQKs1tkjLWUP9tVdrsLplm80B8_z4cAWJlkW19YmkiQ/edit";

    GmailApp.sendEmail(ownerEmail, ownerSubject, ownerText, {
      name: "Rivora Website"
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Enquiry logged and auto-reply sent" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Rivora Design Studio Google Sheets Webhook & Auto-Reply Service is Active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

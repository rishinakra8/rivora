/**
 * =========================================================================
 * RIVORA DESIGN STUDIO — GOOGLE APPS SCRIPT FOR GOOGLE SHEETS
 * =========================================================================
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new) and create a new spreadsheet.
 *    Name it: "Rivora Design Studio — Website Enquiries"
 * 2. Click "Extensions" > "Apps Script" in the top menu.
 * 3. Delete any code in the editor and paste THIS ENTIRE FILE.
 * 4. Click "Deploy" (top right) > "New deployment".
 * 5. Click the gear icon next to "Select type" > choose "Web app".
 * 6. Set Description: "Rivora Website Contact Form Webhook"
 *    Set "Execute as": "Me (your email)"
 *    Set "Who has access": "Anyone"
 * 7. Click "Deploy" and copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 8. Paste that URL into your backend/.env file:
 *    GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/...
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
        "Project Type",
        "Project Details / Scope",
        "Lead Status"
      ];
      sheet.appendRow(headers);
      
      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#1c1814");
      headerRange.setFontColor("#f4efe6");
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
    const name = data.name || "N/A";
    const email = data.email || "N/A";
    const projectType = data.projectType || "General";
    const message = data.message || "";
    const status = data.status || "New Lead";
    
    // Append the row
    sheet.appendRow([timestamp, name, email, projectType, message, status]);
    
    // Auto-fit columns
    for (let col = 1; col <= 6; col++) {
      sheet.autoResizeColumn(col);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Row added successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Rivora Design Studio Google Sheets Webhook is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

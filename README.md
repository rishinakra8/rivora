# Rivora Design Studio — Website

Architect-led turnkey interior design & build practice based in Gurgaon, NCR.

---

## 📁 Project Structure

```
WEBSITE/
├── frontend/                     # Frontend static assets and pages
│   ├── index.html                # Main homepage markup
│   ├── css/
│   │   └── styles.css            # Extracted stylesheet
│   ├── js/
│   │   └── main.js               # Frontend logic & contact form handler
│   └── images/
│       ├── projects/             # High-resolution project photography
│       └── services/             # Service category photography
├── backend/                      # Node.js + Express API server
│   ├── .env                      # Local environment variables (do not commit)
│   ├── .env.example              # Template for environment variables
│   ├── package.json              # Backend dependencies and scripts
│   └── server.js                 # Express server & contact endpoint
├── .gitignore                    # Git ignore file (excludes .env, node_modules)
└── README.md                     # Documentation & setup guide
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v16+ recommended)
- **npm** (comes with Node.js)

### 2. Backend Setup & Configuration

1. Open your terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` (if not already done):
   ```bash
   cp .env.example .env
   ```

4. Edit `backend/.env` with your SMTP mail server credentials:
   ```env
   PORT=5000

   # SMTP Configuration (Example: Gmail)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # Destination address for contact enquiries
   CONTACT_RECEIVER_EMAIL=rishi.rivora@gmail.com
   ```
   > **Note:** If SMTP credentials are left blank, the server will operate in development mode and log submissions directly to the console.

---

## 💻 Running the Site Locally

### Option A: Unified Server (Recommended)
The Express backend is configured to automatically serve the frontend static files along with the API.

1. In the `backend/` folder, run:
   ```bash
   npm start
   ```
   *(Or for live reloading during development: `npm run dev`)*

2. Open your browser and visit:
   ```
   http://localhost:5000
   ```

### Option B: Separate Frontend & Backend
If you prefer using VS Code Live Server or another local HTTP server for the frontend:
- Keep the backend running on `http://localhost:5000`
- Launch your frontend live server (e.g. `http://127.0.0.1:5500`)
- Cross-Origin Resource Sharing (CORS) is already enabled on the backend to accept requests.

---

## 📬 Contact Form API

- **Endpoint:** `POST /api/contact`
- **Payload:**
  ```json
  {
    "name": "Full Name",
    "email": "client@example.com",
    "projectType": "Residential Interior",
    "message": "Project specifications..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Sent — We'll be in touch"
  }
  ```

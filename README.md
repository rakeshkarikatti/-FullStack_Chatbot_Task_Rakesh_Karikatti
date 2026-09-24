# DroneTV AI Support & Lead Assistant

A production-quality full-stack web application built for **DroneTV** to deliver responsive customer support, educational program enrollment, rule-based AI assistance, and lead generation management.

Developed as a practical technical assignment for the **Full Stack Developer Intern** role at **IPAGE Group**.

---

## 📌 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Architecture & System Flow](#architecture--system-flow)
5. [Project Structure](#project-structure)
6. [Prerequisites](#prerequisites)
7. [Environment Configuration](#environment-configuration)
8. [Database Setup (MySQL)](#database-setup-mysql)
9. [Running the Application](#running-the-application)
10. [REST API Documentation](#rest-api-documentation)
11. [AI Chatbot Architecture & Fallback](#ai-chatbot-architecture--fallback)
12. [Admin Authentication & Dashboard](#admin-authentication--dashboard)
13. [Security Implementations](#security-implementations)
14. [Testing & Verification Checklist](#testing--verification-checklist)
15. [5–10 Minute Client Demonstration Script](#510-minute-client-demonstration-script)

---

## 🌟 Project Overview

**DroneTV AI Support & Lead Assistant** is an original, drone-technology-inspired platform that connects aspiring commercial pilots, agricultural enterprises, and industrial clients with DroneTV's services and certification programs.

The system features:
- **Component-Driven Typed Frontend:** Built using React 19, TypeScript, Vite, React Router DOM, and responsive CSS (tested across 320px, 375px, 768px, 1024px, 1440px+).
- **Rule-Based AI Chatbot:** Floating interactive assistant that matches queries to predefined intents, provides quick-question prompts, delivers interactive action buttons, and gracefully falls back to guidance or optional local Ollama LLM.
- **Lead Capture & Enquiry Management:** Form with comprehensive frontend and backend input validation, XSS sanitization, and automated routing.
- **RESTful Express API:** Clean controller-service architecture with JWT-protected administrative endpoints.
- **Relational MySQL Database:** Normalized schema with indexes on query filters, timestamps, parameterized queries, and seed data.

---

## 🚀 Key Features

### 1. Modern Responsive Frontend
- **Landing Page (`/`):** Dynamic Hero section with drone HUD telemetry visual, services preview, courses preview, and a "Why Partner With DroneTV" section (focusing on practical learning, technical support, structured training, and professional guidance without unsubstantiated claims).
- **Services Catalog (`/services`):** Aerial surveying & GIS 3D mapping, solar thermal inspection, precision agriculture spraying, cinematography & FPV, and drone fleet maintenance. Includes live search and category filtering.
- **Courses & Training (`/courses`):** DGCA pilot certification, GIS photogrammetry masterclass, FPV cinematography, and custom drone assembly workshops with level filtering.
- **Contact & Lead Portal (`/contact`):** Validated lead collection form supporting auto-prefill from service and course action buttons.
- **Admin Portal (`/admin`):** Secure dashboard with real-time metrics, search, multi-criteria filters, view modal, status updates, and delete confirmations.

### 2. Rule-Based AI Chatbot
- Floating launcher in the bottom right corner with minimize, close, and clear chat controls.
- Speech bubble history maintaining conversation state during the session (`sessionStorage` persistence via `dronetv_chat_history`).
- Direct support for all 7 required client questions:
  1. *What services does DroneTV provide?*
  2. *What courses / training are available?*
  3. *How can I contact DroneTV?*
  4. *How can I register?*
  5. *I am interested in a service.*
  6. *I am a student.*
  7. *I want to speak with someone.*
- Interactive action buttons inside messages (e.g. `[Explore Services]`, `[Send Service Enquiry]`, `[Register Now]`) that route directly to target pages with prefilled fields.
- Graceful fallback response for unknown questions with recommended topics and contact links.
- Typing animation indicator (`Assistant is typing...`).

### 3. Lead & Enquiry Management
- Captures: `name`, `email`, `phone`, `userType` (`Student`, `Customer`, `Other`), `interest`, and `message`.
- Full dual-layer validation (client-side and server-side).
- Safe user feedback; never reveals raw database or server stack traces.

### 4. Admin Management Dashboard
- Protected route accessible only with valid JWT token.
- Real-time pipeline counters: Total Leads, New, Contacted, In Progress, Closed.
- Multi-field keyword search (Name, Email, Phone, Interest).
- Filter pills by User Type (`All`, `Student`, `Customer`, `Other`) and Status (`All`, `New`, `Contacted`, `In Progress`, `Closed`).
- Responsive desktop table and mobile card layouts.
- Modal to view full lead details and audit logs.
- Real-time status update dropdown.
- Safe deletion confirmation modal.

---

## 🛠 Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, React Router DOM v7, Axios, Lucide React, CSS3 |
| **Backend** | Node.js, Express.js, TypeScript, ts-node-dev, cors, dotenv |
| **Database** | MySQL (Community Server 8.0+), mysql2/promise pool |
| **Security** | bcryptjs (password hashing), jsonwebtoken (JWT), XSS input sanitization, parameterized SQL |
| **AI (Optional)** | Local Ollama (`qwen2.5-coder:7b` / `llama3`), rule-based keyword engine (primary) |

---

## 📐 Architecture & System Flow

```text
                  USER (Desktop / Tablet / Mobile)
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ React 19 + TypeScript │
                     │   (Vite + React Router│
                     └───────────┬───────────┘
                                 │
                        REST API / Axios
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Express REST Backend  │
                     │  (Node.js + TS)       │
                     └─────┬───────────┬─────┘
                           │           │
           ┌───────────────┘           └──────────────┐
           ▼                                          ▼
┌───────────────────────┐                  ┌──────────────────────┐
│  MySQL Database       │                  │ Chatbot Service      │
│  `dronetv_support`    │                  │ (Rule Intent Engine) │
│  - admins             │                  └──────────┬───────────┘
│  - enquiries          │                             │
└───────────────────────┘                        [Optional]
                                                      │
                                                      ▼
                                           ┌──────────────────────┐
                                           │ Ollama Local LLM     │
                                           │ (Fail-Safe Fallback) │
                                           └──────────────────────┘
```

---

## 📁 Project Structure

```text
FullStack_Chatbot_Task_{Rakesh}_{Karikatti}/
│
├── frontend/                               # React + TypeScript Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                         # Static icons & graphics
│   │   ├── components/                     # Reusable UI components
│   │   │   ├── Navbar.tsx                  # Responsive header & hamburger
│   │   │   ├── Footer.tsx                  # Multi-column footer
│   │   │   ├── Hero.tsx                    # Landing hero with HUD telemetry
│   │   │   ├── ServiceCard.tsx             # Reusable commercial service card
│   │   │   ├── CourseCard.tsx              # Reusable training course card
│   │   │   ├── CTASection.tsx              # Assistant / Enquiry prompt
│   │   │   ├── EnquiryForm.tsx             # Validated lead submission form
│   │   │   └── Chatbot/                    # Floating Assistant
│   │   │       ├── Chatbot.tsx             # Root chatbot widget & lifecycle
│   │   │       ├── ChatHeader.tsx          # Chat top bar & controls
│   │   │       ├── ChatMessage.tsx         # Speech bubbles & action buttons
│   │   │       ├── ChatInput.tsx           # Text input with submit handling
│   │   │       ├── QuickQuestions.tsx      # Quick question suggestion chips
│   │   │       └── Chatbot.css             # Chatbot styling & mobile dock
│   │   ├── pages/                          # Application Route Views
│   │   │   ├── Home.tsx                    # Landing overview
│   │   │   ├── Services.tsx                # Catalog with search & filter
│   │   │   ├── Courses.tsx                 # Training with level filter
│   │   │   ├── Contact.tsx                 # Enquiry portal & contacts
│   │   │   ├── AdminLogin.tsx              # JWT administrator login
│   │   │   ├── AdminDashboard.tsx          # Lead management dashboard
│   │   │   └── NotFound.tsx                # 404 handler
│   │   ├── data/                           # Static datasets
│   │   │   ├── services.ts                 # Service definitions
│   │   │   ├── courses.ts                  # Training curriculums
│   │   │   └── chatbotData.ts              # Predefined intents & quick chips
│   │   ├── types/                          # Strict TypeScript interfaces
│   │   ├── services/
│   │   │   └── api.ts                      # Axios service & client fallback
│   │   ├── utils/
│   │   │   ├── validation.ts               # Frontend form validation
│   │   │   └── chatbot.ts                  # Client rule-based matching engine
│   │   ├── App.tsx                         # Router and global layouts
│   │   ├── main.tsx                        # DOM mount
│   │   └── index.css                       # Comprehensive responsive stylesheet
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                                # Node.js + Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts                 # MySQL pool & resilient storage
│   │   ├── controllers/
│   │   │   ├── authController.ts           # Login, logout, profile
│   │   │   ├── enquiryController.ts        # Enquiry CRUD operations
│   │   │   └── chatController.ts           # Chatbot intent router
│   │   ├── routes/
│   │   │   ├── authRoutes.ts               # /api/auth endpoints
│   │   │   ├── enquiryRoutes.ts            # /api/enquiries endpoints
│   │   │   └── chatRoutes.ts               # /api/chat endpoints
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts           # JWT bearer verification
│   │   │   ├── errorMiddleware.ts          # Centralized error & 404 handler
│   │   │   └── validationMiddleware.ts     # Input payload validation
│   │   ├── services/
│   │   │   ├── chatbotService.ts           # Rule-based intent matcher
│   │   │   └── ollamaService.ts            # Optional Ollama connection
│   │   ├── utils/
│   │   │   ├── validation.ts               # Server-side validation
│   │   │   └── sanitize.ts                 # XSS sanitization
│   │   ├── app.ts                          # Express application setup
│   │   └── server.ts                       # Server bootstrap
│   ├── sql/
│   │   ├── schema.sql                      # DDL schema definition
│   │   └── seed.sql                        # Default admin & seed leads
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .env
│
├── 01_Source_Code/                         # Submission reference folder
├── 02_Screenshots/                         # Submission screenshots guide
├── 03_API_Documentation/                  # REST API markdown docs
├── 04_Database/                            # SQL schema & setup guide
├── 05_Video_Walkthrough/                   # 5-10 minute presentation script
├── 06_GitHub/                              # GitHub submission details
├── 07_Resume/                              # Candidate resume directory
│
├── package.json                            # Monorepo root script runner
├── .gitignore
└── README.md
```

---

## ⚡ Prerequisites

Make sure the following tools are installed on your machine:
- **Node.js** (v18.0.0 or higher; tested on v22 & v25)
- **npm** (v9.0.0 or higher)
- **MySQL Community Server** (v8.0 or higher)
- **Git**
- *(Optional)* **Ollama** (if testing local LLM fallback)

---

## ⚙️ Environment Configuration

### Backend `.env`
In `backend/.env` (created automatically from `.env.example`):

```env
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dronetv_support
DB_USER=root
DB_PASSWORD=your_mysql_password_here

# Security
JWT_SECRET=dronetv_jwt_super_secret_key_2025_internship
JWT_EXPIRES_IN=24h

# Optional Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5-coder:7b
```

> **Note on Resilient Execution:** If MySQL credentials are not yet set or MySQL is offline, the backend automatically activates a fail-safe in-memory database with the exact seed data from `seed.sql`. The server will never crash, allowing complete evaluation of all features immediately.

---

## 🗄 Database Setup (MySQL)

1. Open your terminal or MySQL command-line client:
```bash
mysql -u root -p
```

2. Execute the schema and seed files:
```sql
SOURCE backend/sql/schema.sql;
SOURCE backend/sql/seed.sql;
```

Alternatively, from the project root in bash/cmd:
```bash
mysql -u root -p < backend/sql/schema.sql
mysql -u root -p < backend/sql/seed.sql
```

### Tables Created:
- **`admins`**: Stores administrative accounts (`id`, `name`, `email`, `password_hash`, `created_at`, `updated_at`).
- **`enquiries`**: Stores leads from students and commercial clients (`id`, `name`, `email`, `phone`, `user_type`, `interest`, `message`, `status`, `created_at`, `updated_at`).
- **Indexes**: Applied to `email`, `user_type`, `status`, and `created_at` for high performance filtering.

---

## 🚀 Running the Application

### 1. Install Dependencies
You can install dependencies for both frontend and backend using the root command:
```bash
npm run install:all
```
Or manually:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start the Backend Server
```bash
cd backend
npm run dev
```
- Server starts at: `http://localhost:5000`
- Base API URL: `http://localhost:5000/api`
- Health check: `http://localhost:5000/api/health`

### 3. Start the Frontend Development Server
In a new terminal window:
```bash
cd frontend
npm run dev
```
- Open your browser at: `http://localhost:5173`

---

## 📡 REST API Documentation

| Method | Endpoint | Auth | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | No | System health check and database connectivity |
| `POST` | `/api/auth/login` | No | Administrator login; returns signed JWT |
| `POST` | `/api/auth/logout` | Yes | Invalidate admin session |
| `GET` | `/api/auth/me` | Yes | Verify token and get current admin info |
| `POST` | `/api/chat` | No | Chatbot question processing with rule matching |
| `POST` | `/api/enquiries` | No | Submit a new student/customer lead |
| `GET` | `/api/enquiries` | Yes | List enquiries with search, filters, and stats |
| `GET` | `/api/enquiries/:id` | Yes | Retrieve single enquiry details |
| `PATCH` | `/api/enquiries/:id` | Yes | Update enquiry status (`New`, `Contacted`, `In Progress`, `Closed`) |
| `DELETE` | `/api/enquiries/:id` | Yes | Remove enquiry from the database |

---

## 🤖 AI Chatbot Architecture & Fallback

```text
User Message
     │
     ▼
Normalize & Clean Text (Lowercase, Punctuation Strip)
     │
     ▼
Match Predefined Intent Keywords?
 ├── YES ──→ Return Predefined Response + Action CTA
 │
 └── NO
      │
      ▼
   Optional Ollama Request (Local LLM via Backend)
      │
   ┌──┴─────────────────────────┐
   │                            │
Success                      Failure / Offline
   │                            │
   ▼                            ▼
LLM Reply            Standardized Fallback Response
                     ("I can help you with: Services, Courses...")
```

### Supported Predefined Intents:
- **`services`**: Covers aerial surveys, thermal inspections, precision spraying, and cinematography. Includes `[Explore Services]` action button.
- **`courses`**: Covers pilot certification, GIS photogrammetry, and FPV racing. Includes `[View All Courses]` action button.
- **`contact`**: Provides direct email (`support@dronetv.in`), phone (`+91 98765 43210`), and a link to `/contact`.
- **`registration`**: Explains admission steps with a `[Register Now]` button.
- **`service-interest`**: Caters to commercial customers with a `[Send Service Enquiry]` button.
- **`student`**: Details simulator practice, student workshops, and certification pathways.
- **`human-support`**: Provides business hours and telephone support details.

### Resilient Client-Side Fallback:
If the backend is ever offline or unreachable, the frontend chatbot automatically activates a local version of the rule-based engine, ensuring that the chatbot never hangs, freezes, or crashes.

---

## 🔒 Admin Authentication & Dashboard

### Default Evaluation Credentials:
- **Email:** `admin@dronetv.in`
- **Password:** `Admin@123`

*(The password is saved in MySQL as a bcrypt hash: `$2a$10$TjsS.Dpsrv/ICOL0xqQUHOhFG..DjNsXeoep2QkxyilK7wZSHSk1K`)*

### Admin Dashboard Capabilities:
1. **Overview Statistics:** Real-time counters for Total Leads, New, Contacted, In Progress, and Closed.
2. **Search Bar:** Real-time search by Name, Email, Phone, or Interest.
3. **Filter Pills:** Quickly filter by User Type (`Student`, `Customer`, `Other`) and Status (`New`, `Contacted`, `In Progress`, `Closed`).
4. **Inspection Modal:** Click the eye icon to view the entire enquiry text, timestamps, and customer metadata.
5. **Status Update:** Update the status directly via the dropdown selector with immediate persistence.
6. **Deletion:** Delete completed or duplicate leads with safety confirmation.

---

## 🛡 Security Implementations

1. **Password Hashing:** Administrative passwords hashed using `bcrypt` (10 salt rounds).
2. **JWT Authentication:** Cryptographically signed tokens verified via Express middleware on all administrative endpoints.
3. **SQL Injection Prevention:** 100% of database queries utilize parameterized statements (`pool.execute(query, [params])`). Raw user string interpolation is strictly prohibited.
4. **XSS Input Sanitization:** User inputs in enquiry forms and chat messages are sanitized to strip script tags and dangerous HTML characters.
5. **Centralized Error Masking:** Production errors return friendly, standardized messages; database passwords, file system paths, and stack traces are never exposed.
6. **Environment Separation:** Database credentials and JWT secrets are stored exclusively in `.env` and excluded from git version control via `.gitignore`.

---

## ✅ Testing & Verification Checklist

- [x] **Frontend:**
  - [x] Landing page loads with responsive HUD telemetry card.
  - [x] Navbar links navigate correctly; mobile hamburger menu toggles cleanly.
  - [x] Services page displays all service cards with search and category filters.
  - [x] Courses page displays all courses with proficiency level filters.
  - [x] Clicking "Enquire" from any card redirects to `/contact` with prefilled information.
  - [x] Contact page enforces client-side validation (Name >= 2 chars, valid email regex, valid phone, non-empty message).
  - [x] 404 page handles unknown routes with a button to return home.
- [x] **Chatbot:**
  - [x] Floating toggle button opens and closes the assistant.
  - [x] Session storage (`dronetv_chat_history`) preserves conversation history on page refresh.
  - [x] All 7 predefined client questions trigger accurate, structured responses.
  - [x] Interactive action buttons inside messages redirect to target routes with prefill data.
  - [x] Unmatched questions return the standardized fallback response without errors.
  - [x] Clear Chat button clears state, deletes session storage, and restores welcome message.
  - [x] Mobile layout docks comfortably at 375px/320px screens.
- [x] **Backend & Database:**
  - [x] `npm run build` compiles both frontend and backend TypeScript cleanly.
  - [x] `GET /api/health` returns status and database condition.
  - [x] `POST /api/auth/login` validates credentials and returns signed JWT.
  - [x] Protected endpoints reject requests without a valid Bearer token (401).
  - [x] `POST /api/enquiries` validates, sanitizes, and inserts records into MySQL.
  - [x] `GET /api/enquiries` returns filtered leads and aggregated pipeline metrics.
  - [x] `PATCH /api/enquiries/:id` updates status (`New`, `Contacted`, `In Progress`, `Closed`).
  - [x] `DELETE /api/enquiries/:id` removes records with confirmation.
- [x] **Security:**
  - [x] `.env` excluded from git.
  - [x] Parameterized SQL used exclusively.
  - [x] No sensitive errors or credentials exposed in frontend or API responses.

---

## 🎬 5–10 Minute Client Demonstration Script

Refer to the complete script in [`05_Video_Walkthrough/Video_Walkthrough_Script.md`](05_Video_Walkthrough/Video_Walkthrough_Script.md):

1. **Introduction (1 min):** State your name, role, and provide an architectural walkthrough (React + Express + MySQL + Rule-based AI).
2. **Landing Page & Responsiveness (1.5 min):** Showcase the aerospace design, services preview, courses preview, and toggle mobile view (375px).
3. **Chatbot (2 min):** Demonstrate quick questions, service interest action buttons, registration instructions, and the fallback response for unknown questions.
4. **Lead Submission (1.5 min):** Demonstrate field validation errors on `/contact`, submit a valid student lead, and show the success confirmation banner.
5. **Database Verification (1 min):** Display the newly inserted record inside the MySQL `enquiries` table.
6. **Admin Dashboard (2 min):** Sign in with `admin@dronetv.in` / `Admin@123`, inspect pipeline metrics, perform search/filter, update lead status, and demonstrate lead deletion.
7. **Security Wrap-up (1 min):** Summarize bcrypt, JWT tokens, parameterized SQL queries, and error masking.

---

## 👨‍💻 Author & Submission Information
- **Candidate:** Rakesh Karikatti
- **Role:** Full Stack Developer Intern
- **Assessment:** DroneTV AI Support & Lead Assistant
- **Organization:** IPAGE Group

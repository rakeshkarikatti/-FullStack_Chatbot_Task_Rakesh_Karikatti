# DroneTV AI Support & Lead Assistant — 5-10 Minute Video Walkthrough Script

Use this comprehensive walkthrough script to record or present your demonstration to the evaluators.

---

## Timing Overview
- **0:00 - 1:00** — Introduction & Architecture Overview (Demo 7)
- **1:00 - 2:30** — Landing Page, Services & Courses Navigation (Demo 1)
- **2:30 - 4:30** — Floating Rule-Based AI Chatbot Interaction & Fallback (Demo 2)
- **4:30 - 5:45** — Lead & Enquiry Form Submission & Validation (Demo 3 & 6)
- **5:45 - 6:30** — Database Persistence Verification (Demo 4)
- **6:30 - 8:30** — Admin Portal: JWT Login, Search, Filters, Status Updates, Deletion (Demo 5)
- **8:30 - 9:30** — Security, Error Handling & Code Structure Wrap-up

---

### Segment 1: Introduction & Architecture (0:00 - 1:00)
- *"Hello everyone, my name is Rakesh Karikatti. Today I am presenting my technical assignment: the **DroneTV AI Support & Lead Assistant**."*
- *"The architecture follows modern full-stack engineering standards:"*
  - **Frontend:** React with TypeScript, Vite, React Router DOM, Axios, and modular responsive CSS.
  - **Backend:** Node.js with Express and TypeScript, structured across controllers, services, middleware, and route handlers.
  - **Database:** MySQL relational database with foreign keys, constraints, and indexed queries.
  - **AI Chatbot:** High-speed rule-based keyword & intent engine with seamless optional Ollama local LLM integration and fail-safe fallback.

---

### Segment 2: Landing Page & Navigation (1:00 - 2:30)
- *"Here is the Landing page. It features an aerospace/drone-themed UI with a live telemetry HUD card."*
- *"We can view services loaded dynamically from our data model: Aerial Surveying, Solar Thermal Inspection, Precision Agriculture, and Cinematography."*
- *"Next, the Courses preview shows beginner to advanced pilot training modules."*
- *"Notice the 'Why Partner With DroneTV' section highlights practical learning, technical support, structured training, and professional guidance without any unsubstantiated company claims."*
- *"Demonstrate mobile responsiveness by resizing the browser or toggling DevTools to 375px: the hamburger menu, cards, and buttons re-layout cleanly."*

---

### Segment 3: Chatbot Functionality (2:30 - 4:30)
- *"Let's open the floating DroneTV Assistant in the bottom right corner."*
- *"Notice the quick question chips covering all 7 client requirements:"*
  1. Click: **"What services does DroneTV provide?"** -> Shows detailed drone solutions with an **[Explore Services]** button.
  2. Click: **"What courses / training are available?"** -> Shows pilot programs with a **[View All Courses]** button.
  3. Click: **"I am interested in a service."** -> Responds with consultation details and a **[Send Service Enquiry]** action button.
  4. Click: **"I am a student."** -> Gives academic and flight simulator guidance.
  5. Click: **"How can I register?"** -> Explains registration steps.
  6. Click: **"I want to speak with someone."** -> Provides direct phone hotline (+91 98765 43210) and email.
- *"Now let's test an unmatched question: 'What is the weather on Mars?'"*
  - The assistant gracefully triggers the fallback: explains what it can assist with and provides a direct link to the Contact form.
- *"Click **Clear Chat** at the top right to verify sessionStorage reset and history restoration."*

---

### Segment 4: Enquiry Submission & Frontend Validation (4:30 - 5:45)
- *"Let's navigate to the `/contact` page."*
- *"Notice that when clicking [Enquire] from a service or course card, the interest field and user type are pre-populated automatically."*
- *"Let's test frontend validation:"*
  - Submit empty form -> Highlights required fields with clear friendly messages.
  - Enter invalid email `test@` -> 'Please enter a valid email address.'
  - Enter short phone `123` -> 'Please enter a valid phone number (7–15 digits).'
- *"Now fill in valid details:"*
  - Name: Aarav Sharma
  - Email: aarav.sharma@example.com
  - Phone: +91 9876543210
  - User Type: Student
  - Interest: Certified Commercial Drone Pilot Program
  - Message: Inquiring about upcoming batch schedules and simulator sessions.
- *"Click [Submit Enquiry] -> Loading spinner appears -> Success alert is displayed and the form fields clear automatically."*

---

### Segment 5: Database Persistence (5:45 - 6:30)
- *"Now switch to MySQL CLI or Workbench to demonstrate that the record was persisted via a parameterized SQL query in the `enquiries` table with status 'New'."*

---

### Segment 6: Admin Dashboard (6:30 - 8:30)
- *"Now let's access the protected Admin portal at `/admin`."*
- *"If not authenticated, it automatically redirects to `/admin/login`."*
- *"Enter credentials: `admin@dronetv.in` / `Admin@123`."*
- *"Upon clicking Sign In, the backend verifies the bcrypt password hash, signs a JWT token, and logs us into the dashboard."*
- *"In the Admin Dashboard:"*
  - **Live Metrics:** Real-time counters for Total Leads, New, Contacted, In Progress, Closed.
  - **Search:** Search 'Aarav' or 'Agriculture' to filter leads instantly.
  - **Filters:** Filter by User Type (Student, Customer) and Status (New, Contacted, In Progress, Closed).
  - **View Details Modal:** Click the eye icon to view the full message, user type, and timestamps.
  - **Inline Status Update:** Change status from 'New' to 'Contacted' or 'In Progress' -> Updates the database in real-time.
  - **Delete Enquiry:** Click the trash icon -> Confirmation modal appears ('Are you sure you want to delete...?') -> Confirmed deletion removes the record from MySQL.
- *"Click Sign Out -> Destroys JWT session and returns safely to login."*

---

### Segment 7: Error Handling & Security Wrap-up (8:30 - 9:30)
- *"Security Highlights:"*
  - Passwords hashed using `bcrypt` (10 rounds).
  - Parameterized MySQL queries (`?` placeholders) prevent SQL injection.
  - Input sanitization strips dangerous HTML/script tags.
  - Secrets stored strictly in `backend/.env`.
  - Centralized Express error handler ensures no database credentials, stack traces, or server paths are exposed to end users.
  - Chatbot features automatic client-side fallback if backend is unreachable.
- *"Thank you for reviewing my project!"*

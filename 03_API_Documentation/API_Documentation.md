# DroneTV AI Support & Lead Assistant — API Documentation

This directory contains the REST API specification for the **DroneTV AI Support & Lead Assistant** application.

## Base URL
- **Development Base URL:** `http://localhost:5000/api`

## Centralized HTTP Status Codes & Error Formats

All API endpoints return consistent JSON responses.

### Success Response Format:
```json
{
  "success": true,
  "message": "Operation successful.",
  "data": { ... }
}
```

### Error Response Format:
```json
{
  "success": false,
  "message": "Specific human-friendly error message",
  "errors": {
    "field": "Specific field validation message"
  }
}
```

---

## Complete API Endpoints Table

| HTTP Method | Endpoint | Auth Required | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | No | System health and database connectivity status |
| `POST` | `/api/auth/login` | No | Administrator login with email & password, returns JWT |
| `POST` | `/api/auth/logout` | Yes (Admin) | Invalidate administrative session |
| `GET` | `/api/auth/me` | Yes (Admin) | Verify administrative JWT token & get profile info |
| `POST` | `/api/chat` | No | Rule-based chatbot matching with optional Ollama |
| `POST` | `/api/enquiries` | No | Public endpoint to submit lead / course inquiry |
| `GET` | `/api/enquiries` | Yes (Admin) | Retrieve enquiries with search, filtering, and stats |
| `GET` | `/api/enquiries/:id` | Yes (Admin) | Retrieve single enquiry by ID |
| `PATCH` | `/api/enquiries/:id` | Yes (Admin) | Update enquiry status (`New`, `Contacted`, `In Progress`, `Closed`) |
| `DELETE` | `/api/enquiries/:id` | Yes (Admin) | Delete an enquiry record |

---

## 1. Authentication Endpoints

### `POST /api/auth/login`
- **Description:** Verifies admin credentials using bcrypt and issues a signed JSON Web Token (JWT).
- **Request Body:**
```json
{
  "email": "admin@dronetv.in",
  "password": "Admin@123"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Authentication successful.",
  "token": "eyJhbGciOiJIUzI1NiIsIn...",
  "admin": {
    "id": 1,
    "name": "DroneTV Administrator",
    "email": "admin@dronetv.in"
  }
}
```

### `GET /api/auth/me`
- **Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Response (200 OK):**
```json
{
  "success": true,
  "admin": {
    "id": 1,
    "name": "DroneTV Administrator",
    "email": "admin@dronetv.in"
  }
}
```

---

## 2. Chatbot Endpoint

### `POST /api/chat`
- **Description:** Evaluates user inquiry against rule-based keyword intent engine. If unrecognized and Ollama is active, queries local LLM. Falls back to graceful predefined guidance if unavailable.
- **Request Body:**
```json
{
  "message": "What services does DroneTV provide?"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "reply": "DroneTV provides specialized end-to-end commercial drone solutions...",
  "intentId": "services",
  "category": "Services",
  "action": {
    "label": "Explore Services",
    "target": "/services",
    "prefill": {
      "userType": "Customer",
      "interest": "Commercial Drone Services"
    }
  },
  "source": "rule-based"
}
```

---

## 3. Enquiry & Lead Endpoints

### `POST /api/enquiries`
- **Description:** Creates and persists a student or customer enquiry.
- **Validation Rules:**
  - `name`: String, minimum 2 characters.
  - `email`: Valid email format.
  - `phone`: Valid telephone format (7–15 digits).
  - `userType`: Enum (`Student`, `Customer`, `Other`).
  - `interest`: String, minimum 2 characters.
  - `message`: String, minimum 5 characters.
- **Request Body:**
```json
{
  "name": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "phone": "+91 9876543210",
  "userType": "Student",
  "interest": "Commercial Drone Pilot Certification Program",
  "message": "I would like to apply for the next training batch."
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Thank you! Your enquiry has been submitted successfully. Our team will get back to you.",
  "data": {
    "id": 7,
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "phone": "+91 9876543210",
    "userType": "Student",
    "interest": "Commercial Drone Pilot Certification Program",
    "message": "I would like to apply for the next training batch.",
    "status": "New",
    "createdAt": "2026-09-24T16:30:00.000Z"
  }
}
```

### `GET /api/enquiries`
- **Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Query Parameters:**
  - `search` (optional): Case-insensitive keyword filter across name, email, phone, and interest.
  - `userType` (optional): `All`, `Student`, `Customer`, or `Other`.
  - `status` (optional): `All`, `New`, `Contacted`, `In Progress`, or `Closed`.
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Aarav Sharma",
      "email": "aarav.sharma@example.com",
      "phone": "+91 9876543210",
      "userType": "Student",
      "interest": "Drone Pilot Certification Program",
      "message": "I am a final-year engineering student...",
      "status": "New",
      "createdAt": "2026-09-22T10:00:00.000Z",
      "updatedAt": "2026-09-22T10:00:00.000Z"
    }
  ],
  "stats": {
    "total": 5,
    "new": 2,
    "contacted": 1,
    "inProgress": 1,
    "closed": 1,
    "student": 2,
    "customer": 2
  }
}
```

### `PATCH /api/enquiries/:id`
- **Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
```json
{
  "status": "Contacted"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Enquiry status updated successfully.",
  "data": {
    "id": 1,
    "status": "Contacted",
    "updatedAt": "2026-09-24T16:32:00.000Z"
  }
}
```

### `DELETE /api/enquiries/:id`
- **Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Enquiry deleted successfully."
}
```

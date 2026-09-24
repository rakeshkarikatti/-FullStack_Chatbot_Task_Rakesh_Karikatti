-- ==========================================================
-- DroneTV AI Support & Lead Assistant Seed Data
-- Database: dronetv_support
-- ==========================================================

USE dronetv_support;

-- ----------------------------------------------------------
-- Seed Admins
-- Default Dev Credentials:
-- Email: admin@dronetv.in
-- Password: Admin@123 (bcrypt hashed)
-- ----------------------------------------------------------
INSERT INTO admins (id, name, email, password_hash)
VALUES (
  1,
  'DroneTV Administrator',
  'admin@dronetv.in',
  '$2a$10$TjsS.Dpsrv/ICOL0xqQUHOhFG..DjNsXeoep2QkxyilK7wZSHSk1K'
)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  password_hash = VALUES(password_hash);

-- ----------------------------------------------------------
-- Seed Enquiries
-- Variety of Student, Customer, and Other leads
-- ----------------------------------------------------------
INSERT INTO enquiries (id, name, email, phone, user_type, interest, message, status, created_at)
VALUES
(
  1,
  'Aarav Sharma',
  'aarav.sharma@example.com',
  '+91 9876543210',
  'Student',
  'Drone Pilot Certification Program',
  'I am a final-year engineering student interested in enrolling in the certified drone pilot training course. Could you provide the upcoming batch dates and curriculum details?',
  'New',
  NOW() - INTERVAL 2 DAY
),
(
  2,
  'Priya Patel',
  'priya.patel@agritechcorp.in',
  '+91 9812345678',
  'Customer',
  'Agricultural Drone Survey & Multispectral Mapping',
  'We require drone survey services for 500 acres of agricultural land for crop health monitoring and yield estimation in Maharashtra. Please provide a quote and timeline.',
  'In Progress',
  NOW() - INTERVAL 1 DAY
),
(
  3,
  'Rahul Verma',
  'rahul.verma@infraview.com',
  '+91 9923456789',
  'Customer',
  'Infrastructure & Solar Panel Thermal Inspection',
  'Our firm manages high-voltage transmission lines and solar power plants. We are looking for thermal drone inspection services to detect hotspots.',
  'Contacted',
  NOW() - INTERVAL 3 DAY
),
(
  4,
  'Ananya Iyer',
  'ananya.iyer@student.edu',
  '+91 9734567890',
  'Student',
  'Aerial Cinematography & FPV Flying',
  'Looking to learn advanced FPV piloting techniques and commercial aerial photography for media production. Do you provide hands-on flight simulator practice?',
  'Closed',
  NOW() - INTERVAL 5 DAY
),
(
  5,
  'Vikram Malhotra',
  'vikram.m@skyviewmedia.in',
  '+91 9645678901',
  'Other',
  'Custom Drone Assembly & Maintenance',
  'We have custom hexacopters requiring regular calibration, avionics diagnostics, and motor maintenance support. Would like to discuss a service contract.',
  'New',
  NOW() - INTERVAL 4 HOUR
)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  email = VALUES(email),
  phone = VALUES(phone),
  user_type = VALUES(user_type),
  interest = VALUES(interest),
  message = VALUES(message),
  status = VALUES(status);

-- ==========================================================
-- DroneTV AI Support & Lead Assistant Database Schema
-- Database: dronetv_support
-- ==========================================================

CREATE DATABASE IF NOT EXISTS dronetv_support
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE dronetv_support;

-- ----------------------------------------------------------
-- Table: admins
-- Purpose: Store authenticated administrative accounts
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_admins_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: enquiries
-- Purpose: Store leads and enquiries from students & customers
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  user_type ENUM('Student', 'Customer', 'Other') NOT NULL,
  interest VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('New', 'Contacted', 'In Progress', 'Closed') DEFAULT 'New' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_enquiries_email (email),
  INDEX idx_enquiries_user_type (user_type),
  INDEX idx_enquiries_status (status),
  INDEX idx_enquiries_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

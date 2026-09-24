# MySQL Database Setup Guide

## 1. Prerequisites
- MySQL Community Server (8.0+)
- MySQL CLI or MySQL Workbench

## 2. Command Line Setup

Open your terminal or command prompt:

```bash
# 1. Log in to MySQL
mysql -u root -p

# 2. Create the Database and Tables
source backend/sql/schema.sql;

# 3. Seed Default Administrator & Sample Leads
source backend/sql/seed.sql;
```

Alternatively, run directly from bash/cmd:
```bash
mysql -u root -p < backend/sql/schema.sql
mysql -u root -p < backend/sql/seed.sql
```

## 3. Verify Import

```sql
USE dronetv_support;

-- Verify Admins
SELECT id, name, email FROM admins;

-- Verify Enquiries
SELECT id, name, email, user_type, interest, status FROM enquiries;
```

## 4. Environment Configuration
Update your `backend/.env` with your local database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dronetv_support
DB_USER=root
DB_PASSWORD=your_actual_password_here
```

*Note: If MySQL is not running or credentials are not yet configured, the application automatically activates a fail-safe in-memory database with the exact same seed data, so you can test all features without interruption!*

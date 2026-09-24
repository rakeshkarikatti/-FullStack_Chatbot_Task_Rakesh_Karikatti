import mysql, { Pool, PoolOptions } from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

export interface AdminRecord {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface EnquiryRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: 'Student' | 'Customer' | 'Other';
  interest: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  created_at: Date;
  updated_at: Date;
}

// In-Memory Seed Storage (Mirrors seed.sql for instant fail-safe demo without breaking)
export const inMemoryAdmins: AdminRecord[] = [
  {
    id: 1,
    name: 'DroneTV Administrator',
    email: 'admin@dronetv.in',
    // Password: Admin@123
    password_hash: '$2a$10$TjsS.Dpsrv/ICOL0xqQUHOhFG..DjNsXeoep2QkxyilK7wZSHSk1K',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const inMemoryEnquiries: EnquiryRecord[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 9876543210',
    user_type: 'Student',
    interest: 'Drone Pilot Certification Program',
    message: 'I am a final-year engineering student interested in enrolling in the certified drone pilot training course. Could you provide the upcoming batch dates and curriculum details?',
    status: 'New',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@agritechcorp.in',
    phone: '+91 9812345678',
    user_type: 'Customer',
    interest: 'Agricultural Drone Survey & Multispectral Mapping',
    message: 'We require drone survey services for 500 acres of agricultural land for crop health monitoring and yield estimation in Maharashtra. Please provide a quote and timeline.',
    status: 'In Progress',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    name: 'Rahul Verma',
    email: 'rahul.verma@infraview.com',
    phone: '+91 9923456789',
    user_type: 'Customer',
    interest: 'Infrastructure & Solar Panel Thermal Inspection',
    message: 'Our firm manages high-voltage transmission lines and solar power plants. We are looking for thermal drone inspection services to detect hotspots.',
    status: 'Contacted',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 4,
    name: 'Ananya Iyer',
    email: 'ananya.iyer@student.edu',
    phone: '+91 9734567890',
    user_type: 'Student',
    interest: 'Aerial Cinematography & FPV Flying',
    message: 'Looking to learn advanced FPV piloting techniques and commercial aerial photography for media production. Do you provide hands-on flight simulator practice?',
    status: 'Closed',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 5,
    name: 'Vikram Malhotra',
    email: 'vikram.m@skyviewmedia.in',
    phone: '+91 9645678901',
    user_type: 'Other',
    interest: 'Custom Drone Assembly & Maintenance',
    message: 'We have custom hexacopters requiring regular calibration, avionics diagnostics, and motor maintenance support. Would like to discuss a service contract.',
    status: 'New',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
];

let nextEnquiryId = 6;
export function getNextEnquiryId(): number {
  return nextEnquiryId++;
}

const poolConfig: PoolOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dronetv_support',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

export const pool: Pool = mysql.createPool(poolConfig);

export let isDatabaseConnected = false;

/**
 * Test database connectivity without leaking credentials in logs.
 * If credentials are not yet set or MySQL is offline, enables resilient fail-safe mode.
 */
export async function testDbConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    console.log(`[Database] Connected successfully to MySQL database "${poolConfig.database}" on ${poolConfig.host}:${poolConfig.port}`);
    connection.release();
    isDatabaseConnected = true;
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error';
    console.warn(`[Database] MySQL Connection Notice: ${errorMessage}`);
    console.warn('[Database] Activated fail-safe resilient memory storage with seed data.');
    console.warn('[Database] To connect to your MySQL instance, ensure MySQL is running and set valid DB_PASSWORD in backend/.env.');
    isDatabaseConnected = false;
    return false;
  }
}

export default pool;

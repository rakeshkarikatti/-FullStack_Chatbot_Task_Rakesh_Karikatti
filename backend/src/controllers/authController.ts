import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import pool, { isDatabaseConnected, inMemoryAdmins } from '../config/database';
import { validateLoginInput } from '../utils/validation';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

interface AdminRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    const validation = validateLoginInput({ email, password });
    if (!validation.isValid) {
      res.status(400).json({
        success: false,
        message: 'Invalid login details.',
        errors: validation.errors,
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    let admin: { id: number; name: string; email: string; password_hash: string } | null = null;

    if (isDatabaseConnected) {
      const [rows] = await pool.execute<AdminRow[]>(
        'SELECT id, name, email, password_hash FROM admins WHERE email = ? LIMIT 1',
        [cleanEmail]
      );
      if (rows && rows.length > 0) {
        admin = rows[0];
      }
    } else {
      const found = inMemoryAdmins.find((a) => a.email.toLowerCase() === cleanEmail);
      if (found) {
        admin = found;
      }
    }

    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, admin.password_hash);
    if (!passwordMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || 'dronetv_jwt_super_secret_key_2025_internship';
    const payload = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: (process.env.JWT_EXPIRES_IN || '24h') as jwt.SignOptions['expiresIn'],
    });

    res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
}

export async function getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.admin) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized access.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    admin: req.admin,
  });
}

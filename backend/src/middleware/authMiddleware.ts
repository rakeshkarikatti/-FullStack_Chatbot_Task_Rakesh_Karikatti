import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedAdmin {
  id: number;
  email: string;
  name: string;
}

export interface AuthenticatedRequest extends Request {
  admin?: AuthenticatedAdmin;
}

export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Access denied. Administrator authorization token required.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET || 'dronetv_jwt_super_secret_key_2025_internship';

  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthenticatedAdmin;
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Session expired or invalid token. Please log in again.',
    });
  }
}

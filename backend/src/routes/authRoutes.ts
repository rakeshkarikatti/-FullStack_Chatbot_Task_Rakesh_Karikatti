import { Router } from 'express';
import { login, logout, getMe } from '../controllers/authController';
import { requireAdminAuth } from '../middleware/authMiddleware';

const router = Router();

// Public route
router.post('/login', login);

// Protected routes
router.post('/logout', requireAdminAuth, logout);
router.get('/me', requireAdminAuth, getMe);

export default router;

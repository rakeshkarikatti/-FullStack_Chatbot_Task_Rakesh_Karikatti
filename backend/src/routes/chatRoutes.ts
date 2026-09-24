import { Router } from 'express';
import { processChatMessage } from '../controllers/chatController';

const router = Router();

// Public: send message to chatbot
router.post('/', processChatMessage);

export default router;

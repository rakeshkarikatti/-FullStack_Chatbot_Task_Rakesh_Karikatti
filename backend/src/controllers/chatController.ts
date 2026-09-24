import { Request, Response, NextFunction } from 'express';
import {
  matchPredefinedIntent,
  CHATBOT_FALLBACK_RESPONSE,
} from '../services/chatbotService';
import { askOllama } from '../services/ollamaService';
import { cleanPlainText } from '../utils/sanitize';

export async function processChatMessage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Message content is required.',
      });
      return;
    }

    const sanitizedMessage = cleanPlainText(message);

    // 1. Check Predefined Rules first
    const matchedIntent = matchPredefinedIntent(sanitizedMessage);
    if (matchedIntent) {
      res.status(200).json({
        success: true,
        reply: matchedIntent.response,
        intentId: matchedIntent.id,
        category: matchedIntent.category,
        action: matchedIntent.action,
        source: 'rule-based',
      });
      return;
    }

    // 2. If no predefined intent match, try Optional Ollama
    const ollamaResponse = await askOllama(sanitizedMessage);
    if (ollamaResponse) {
      res.status(200).json({
        success: true,
        reply: ollamaResponse,
        source: 'ollama-ai',
      });
      return;
    }

    // 3. Fallback to predefined fallback response
    res.status(200).json({
      success: true,
      reply: CHATBOT_FALLBACK_RESPONSE,
      source: 'fallback',
      action: {
        label: 'Go to Contact / Enquiry',
        target: '/contact',
      },
    });
  } catch (error) {
    next(error);
  }
}

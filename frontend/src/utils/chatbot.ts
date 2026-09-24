import { CHATBOT_INTENTS, CHATBOT_FALLBACK_RESPONSE } from '../data/chatbotData';
import { ChatbotIntent } from '../types/chatbot';

export interface BotResponseResult {
  text: string;
  intentId?: string;
  category?: string;
  action?: {
    label: string;
    target: string;
    prefill?: {
      userType?: 'Student' | 'Customer' | 'Other';
      interest?: string;
    };
  };
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Robust rule-based client matching engine
 * Used both for fast UI answers and as a resilient local fallback if backend is offline.
 */
export function getBotResponse(rawMessage: string): BotResponseResult {
  const clean = normalizeText(rawMessage);

  if (!clean) {
    return {
      text: CHATBOT_FALLBACK_RESPONSE,
      action: {
        label: 'Go to Contact / Enquiry',
        target: '/contact',
      },
    };
  }

  // 1. Direct question match
  for (const intent of CHATBOT_INTENTS) {
    if (normalizeText(intent.question) === clean) {
      return {
        text: intent.response,
        intentId: intent.id,
        category: intent.category,
        action: intent.action,
      };
    }
  }

  // 2. Keyword phrase search (longest phrase first)
  for (const intent of CHATBOT_INTENTS) {
    const sortedKeywords = [...intent.keywords].sort((a, b) => b.length - a.length);
    for (const kw of sortedKeywords) {
      const normKw = normalizeText(kw);
      if (normKw && (clean.includes(normKw) || clean === normKw)) {
        return {
          text: intent.response,
          intentId: intent.id,
          category: intent.category,
          action: intent.action,
        };
      }
    }
  }

  // 3. Word token overlap
  const words = clean.split(' ').filter((w) => w.length > 2);
  let bestIntent: ChatbotIntent | null = null;
  let highestScore = 0;

  for (const intent of CHATBOT_INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      const kwWords = normalizeText(kw).split(' ');
      for (const word of words) {
        if (kwWords.includes(word)) {
          score += 1;
        }
      }
    }
    if (score > highestScore && score >= 2) {
      highestScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent) {
    return {
      text: bestIntent.response,
      intentId: bestIntent.id,
      category: bestIntent.category,
      action: bestIntent.action,
    };
  }

  // Graceful fallback response
  return {
    text: CHATBOT_FALLBACK_RESPONSE,
    action: {
      label: 'Go to Contact / Enquiry',
      target: '/contact',
    },
  };
}

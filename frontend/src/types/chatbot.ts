export interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    target: string;
    prefill?: {
      userType?: 'Student' | 'Customer' | 'Other';
      interest?: string;
    };
  };
}

export interface ChatbotIntent {
  id: string;
  category: string;
  keywords: string[];
  question: string;
  response: string;
  action?: {
    label: string;
    target: string;
    prefill?: {
      userType?: 'Student' | 'Customer' | 'Other';
      interest?: string;
    };
  };
}

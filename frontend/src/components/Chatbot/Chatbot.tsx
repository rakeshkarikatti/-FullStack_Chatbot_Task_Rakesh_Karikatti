import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../../types/chatbot';
import { INITIAL_WELCOME_MESSAGE } from '../../data/chatbotData';
import { sendChatMessage } from '../../services/api';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import QuickQuestions from './QuickQuestions';
import ChatInput from './ChatInput';
import { MessageSquareText, Bot } from 'lucide-react';
import './Chatbot.css';

const STORAGE_KEY = 'dronetv_chat_history';

interface ChatbotProps {
  isOpenExternal?: boolean;
  onToggleExternal?: (isOpen: boolean) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  isOpenExternal,
  onToggleExternal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (_e) {
      // Ignore sessionStorage parsing errors
    }
    return [INITIAL_WELCOME_MESSAGE];
  });
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync with external opener (e.g. Hero CTA or Navbar CTA)
  useEffect(() => {
    if (typeof isOpenExternal === 'boolean') {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  // Persist messages to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (_e) {
      // Handle storage quota issues gracefully
    }
  }, [messages]);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (onToggleExternal) {
      onToggleExternal(nextState);
    }
  };

  const handleClearChat = () => {
    const resetList = [
      {
        ...INITIAL_WELCOME_MESSAGE,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(resetList);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (_e) {}
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text.trim());

      const botMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: response.action,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (_err) {
      // In case of any unhandled issue, display fallback
      const errorMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'I am temporarily unable to reach the knowledge base. Please visit our Contact page to send an enquiry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: {
          label: 'Contact Page',
          target: '/contact',
        },
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-root">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          className="chatbot-fab"
          onClick={handleToggle}
          aria-label="Open DroneTV Assistant"
          title="Open DroneTV Assistant"
        >
          <div className="fab-pulse" />
          <MessageSquareText size={26} className="fab-icon" />
          <span className="fab-tooltip">Chat with DroneTV</span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-modal="true" aria-label="DroneTV AI Support Assistant">
          <ChatHeader
            onClose={() => {
              setIsOpen(false);
              if (onToggleExternal) onToggleExternal(false);
            }}
            onClear={handleClearChat}
            onMinimize={() => {
              setIsOpen(false);
              if (onToggleExternal) onToggleExternal(false);
            }}
          />

          <div className="chatbot-messages-area">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onActionClick={() => {
                  setIsOpen(false);
                  if (onToggleExternal) onToggleExternal(false);
                }}
              />
            ))}

            {isLoading && (
              <div className="chat-message-row bot-row">
                <div className="avatar-bubble">
                  <Bot size={16} />
                </div>
                <div className="typing-indicator-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-label">Assistant is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-bottom-tray">
            <QuickQuestions
              onSelectQuestion={handleSendMessage}
              disabled={isLoading}
            />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Chatbot;

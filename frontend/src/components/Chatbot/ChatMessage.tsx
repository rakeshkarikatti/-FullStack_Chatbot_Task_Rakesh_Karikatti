import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../types/chatbot';
import { Bot, User, ArrowRight } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onActionClick?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onActionClick }) => {
  const isBot = message.sender === 'bot';
  const navigate = useNavigate();

  const handleAction = () => {
    if (message.action) {
      if (onActionClick) onActionClick();
      navigate(message.action.target, {
        state: message.action.prefill,
      });
    }
  };

  /**
   * Simple safe parser to convert markdown bold **text** and linebreaks cleanly
   */
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, lIdx) => {
      // Split by **
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={lIdx} className="msg-line">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
            }
            return <React.Fragment key={pIdx}>{part}</React.Fragment>;
          })}
          {lIdx < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className={`chat-message-row ${isBot ? 'bot-row' : 'user-row'}`}>
      <div className="avatar-bubble">
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>

      <div className="message-content-box">
        <div className="bubble-text">
          {renderFormattedText(message.text)}
        </div>

        {message.action && (
          <div className="msg-action-container">
            <button
              type="button"
              className="btn btn-sm btn-primary msg-action-btn"
              onClick={handleAction}
            >
              <span>{message.action.label}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        <span className="msg-timestamp">{message.timestamp}</span>
      </div>
    </div>
  );
};
export default ChatMessage;

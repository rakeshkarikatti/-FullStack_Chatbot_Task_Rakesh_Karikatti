import React from 'react';
import { Bot, RotateCcw, X, Minus } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
  onClear: () => void;
  onMinimize?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, onClear, onMinimize }) => {
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <div className="bot-avatar-badge">
          <Bot size={20} className="header-bot-icon" />
          <span className="online-indicator" title="Online" />
        </div>
        <div className="header-titles">
          <h4 className="header-bot-name">DroneTV Assistant</h4>
          <span className="header-status">Support & Lead Assistant</span>
        </div>
      </div>

      <div className="chat-header-controls">
        <button
          type="button"
          className="chat-ctrl-btn"
          onClick={onClear}
          title="Clear Conversation"
          aria-label="Clear Conversation"
        >
          <RotateCcw size={16} />
        </button>

        {onMinimize && (
          <button
            type="button"
            className="chat-ctrl-btn"
            onClick={onMinimize}
            title="Minimize Assistant"
            aria-label="Minimize Assistant"
          >
            <Minus size={16} />
          </button>
        )}

        <button
          type="button"
          className="chat-ctrl-btn close-btn"
          onClick={onClose}
          title="Close Assistant"
          aria-label="Close Assistant"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;

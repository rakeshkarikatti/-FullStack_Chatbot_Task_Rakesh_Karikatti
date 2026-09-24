import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="chat-text-input"
        placeholder="Type your message or enquiry..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isLoading}
        aria-label="Type your message"
      />
      <button
        type="submit"
        className="chat-send-btn"
        disabled={!inputValue.trim() || isLoading}
        aria-label="Send message"
      >
        {isLoading ? <Loader2 size={16} className="spinner" /> : <Send size={16} />}
      </button>
    </form>
  );
};
export default ChatInput;

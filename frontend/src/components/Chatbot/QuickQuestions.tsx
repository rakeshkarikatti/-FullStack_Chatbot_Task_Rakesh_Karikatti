import React from 'react';
import { QUICK_QUESTIONS } from '../../data/chatbotData';
import { Sparkles } from 'lucide-react';

interface QuickQuestionsProps {
  onSelectQuestion: (question: string) => void;
  disabled?: boolean;
}

export const QuickQuestions: React.FC<QuickQuestionsProps> = ({
  onSelectQuestion,
  disabled = false,
}) => {
  return (
    <div className="quick-questions-wrapper">
      <div className="quick-questions-label">
        <Sparkles size={12} className="sparkle-icon" />
        <span>Suggested Queries:</span>
      </div>
      <div className="quick-questions-scroll">
        {QUICK_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            type="button"
            className="quick-question-chip"
            onClick={() => onSelectQuestion(q)}
            disabled={disabled}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};
export default QuickQuestions;

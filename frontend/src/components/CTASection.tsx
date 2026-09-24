import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Send } from 'lucide-react';

interface CTASectionProps {
  onOpenChat: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenChat }) => {
  return (
    <section className="cta-section">
      <div className="cta-inner max-width-container">
        <div className="cta-card">
          <div className="cta-content">
            <span className="cta-pill">Immediate Support</span>
            <h2 className="cta-heading">Have a question?</h2>
            <p className="cta-subheading">
              Our AI support assistant can help you find the right course syllabus, service scope, or registration guidelines instantly.
            </p>
          </div>

          <div className="cta-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onOpenChat}
            >
              <Bot size={18} />
              <span>Ask the Assistant</span>
            </button>

            <Link to="/contact" className="btn btn-outline btn-lg">
              <Send size={18} />
              <span>Send an Enquiry</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTASection;

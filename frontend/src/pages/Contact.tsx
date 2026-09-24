import React from 'react';
import { useLocation } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import { UserType } from '../types/enquiry';
import { Mail, Phone, Clock, MapPin, MessageSquareText } from 'lucide-react';

interface ContactProps {
  onOpenChat: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenChat }) => {
  const location = useLocation();
  const prefillState = location.state as {
    userType?: UserType;
    interest?: string;
  } | null;

  return (
    <div className="contact-page">
      {/* Banner */}
      <section className="page-header-banner">
        <div className="max-width-container">
          <span className="section-pill">Get In Touch</span>
          <h1 className="page-title">Contact & Enquiry Portal</h1>
          <p className="page-subtitle">
            Submit your training admissions inquiry or commercial drone service request. Our engineering and admissions team will contact you promptly.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Info Cards */}
      <section className="section-container">
        <div className="max-width-container contact-split-grid">
          {/* Left: Contact Info & Support Assistant Callout */}
          <div className="contact-info-panel">
            <div className="info-block-card">
              <h3 className="info-card-title">Direct Communications</h3>
              <p className="info-card-desc">
                Have specific technical specifications or scheduling requirements? Reach out directly to our offices.
              </p>

              <div className="contact-details-list">
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Email Support</span>
                    <a href="mailto:support@dronetv.in" className="contact-value">
                      support@dronetv.in
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-box">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Phone Hotline</span>
                    <a href="tel:+919876543210" className="contact-value">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-box">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Operational Hours</span>
                    <span className="contact-value">Monday – Saturday: 9:00 AM – 6:00 PM IST</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Technical Hub</span>
                    <span className="contact-value">Technology Park, Karnataka, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant AI Assistant Card */}
            <div className="chat-support-callout-card">
              <div className="callout-header">
                <div className="callout-avatar">
                  <MessageSquareText size={20} />
                </div>
                <div>
                  <h4 className="callout-title">Need Instant Answers?</h4>
                  <p className="callout-subtitle">Ask our rule-based AI Assistant directly</p>
                </div>
              </div>
              <p className="callout-body">
                Our support bot can instantly answer questions on course syllabus, fees guidelines, DGCA requirements, or commercial services.
              </p>
              <button
                type="button"
                className="btn btn-outline btn-block callout-btn"
                onClick={onOpenChat}
              >
                <span>Launch Assistant</span>
              </button>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="contact-form-panel">
            <EnquiryForm
              initialUserType={prefillState?.userType || 'Student'}
              initialInterest={prefillState?.interest || ''}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Contact;

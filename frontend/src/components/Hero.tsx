import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Compass, ShieldCheck, Cpu } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  return (
    <section className="hero-section">
      <div className="hero-glow-blob hero-blob-1" aria-hidden="true" />
      <div className="hero-glow-blob hero-blob-2" aria-hidden="true" />

      <div className="hero-inner max-width-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <Cpu size={14} className="badge-icon" />
            <span>Next-Generation Drone Intelligence</span>
          </div>

          <h1 className="hero-title">
            Drone Technology <br />
            <span className="text-gradient">Support & Training</span>
          </h1>

          <p className="hero-subtitle">
            Explore commercial drone services, structured pilot training programs, and get instant guidance through our interactive AI support assistant.
          </p>

          <div className="hero-cta-group">
            <Link to="/services" className="btn btn-primary btn-lg">
              <span>Explore Services</span>
              <ArrowRight size={18} />
            </Link>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={onOpenChat}
            >
              <Bot size={18} />
              <span>Talk to Assistant</span>
            </button>
          </div>

          <div className="hero-trust-bar">
            <div className="trust-item">
              <ShieldCheck size={18} className="trust-icon" />
              <span>Structured Curriculum</span>
            </div>
            <div className="trust-item">
              <Compass size={18} className="trust-icon" />
              <span>Precision GIS Analytics</span>
            </div>
          </div>
        </div>

        {/* Right Visual Interactive Card */}
        <div className="hero-visual-wrapper">
          <div className="drone-hud-card">
            <div className="hud-card-header">
              <div className="hud-status-dot" />
              <span className="hud-status-text">UAV Telemetry Active</span>
              <span className="hud-frequency">5.8 GHz Low-Latency</span>
            </div>

            <div className="hud-telemetry-grid">
              <div className="telemetry-box">
                <span className="telemetry-label">Mission Status</span>
                <span className="telemetry-val">Operational</span>
              </div>
              <div className="telemetry-box">
                <span className="telemetry-label">Airspace Mode</span>
                <span className="telemetry-val">Certified / DGCA</span>
              </div>
              <div className="telemetry-box">
                <span className="telemetry-label">Sensors</span>
                <span className="telemetry-val">RGB + Thermal LiDAR</span>
              </div>
              <div className="telemetry-box">
                <span className="telemetry-label">Support Response</span>
                <span className="telemetry-val">Instant AI Assistant</span>
              </div>
            </div>

            <div className="hud-interactive-prompt">
              <div className="hud-prompt-bubble">
                <p className="hud-bubble-text">
                  "Hi! Ask me anything about drone surveying, certified courses, or quotation requests."
                </p>
                <button
                  type="button"
                  className="btn btn-sm btn-primary hud-prompt-btn"
                  onClick={onOpenChat}
                >
                  <Bot size={14} /> Quick Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;

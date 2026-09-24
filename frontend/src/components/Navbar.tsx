import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu, X, Shield, MessageSquareText } from 'lucide-react';

interface NavbarProps {
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem('dronetv_admin_token');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Contact & Enquiry', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="navbar-container">
      <div className="navbar-inner max-width-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-icon-wrapper">
            <Plane className="logo-plane-icon" size={24} />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Drone<span className="brand-accent">TV</span></span>
            <span className="brand-subtitle">AI Support & Leads</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Action Buttons */}
        <div className="navbar-actions">
          {onOpenChat && (
            <button
              type="button"
              className="btn btn-outline btn-sm chat-nav-btn"
              onClick={onOpenChat}
              title="Open AI Assistant"
            >
              <MessageSquareText size={16} />
              <span>AI Assistant</span>
            </button>
          )}

          {token ? (
            <Link to="/admin" className="btn btn-secondary btn-sm admin-btn">
              <Shield size={16} />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link to="/admin/login" className="btn btn-ghost btn-sm admin-btn">
              <Shield size={16} />
              <span>Admin Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {onOpenChat && (
              <li>
                <button
                  type="button"
                  className="mobile-nav-link mobile-chat-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenChat();
                  }}
                >
                  <MessageSquareText size={18} />
                  <span>Open AI Assistant</span>
                </button>
              </li>
            )}
            <li>
              {token ? (
                <Link
                  to="/admin"
                  className="mobile-nav-link admin-highlight"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield size={18} />
                  <span>Admin Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield size={18} />
                  <span>Admin Login</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
export default Navbar;

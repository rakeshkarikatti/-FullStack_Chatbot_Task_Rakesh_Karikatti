import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Mail, Phone, MapPin, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-inner max-width-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="brand-logo footer-logo">
            <div className="logo-icon-wrapper">
              <Plane className="logo-plane-icon" size={20} />
            </div>
            <span className="brand-title">Drone<span className="brand-accent">TV</span></span>
          </div>
          <p className="footer-description">
            Commercial drone solutions, precision aerial survey data, infrastructure inspections, and professional pilot training programs.
          </p>
          <div className="footer-contact-mini">
            <p><Mail size={14} /> support@dronetv.in</p>
            <p><Phone size={14} /> +91 98765 43210</p>
            <p><MapPin size={14} /> Technology Park, India</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Commercial Services</Link></li>
            <li><Link to="/courses">Training & Courses</Link></li>
            <li><Link to="/contact">Contact & Enquiry</Link></li>
          </ul>
        </div>

        {/* Services Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><Link to="/services">Aerial Survey & GIS Mapping</Link></li>
            <li><Link to="/services">Solar & Thermal Inspection</Link></li>
            <li><Link to="/services">Agriculture Drone Spraying</Link></li>
            <li><Link to="/services">Cinematography & FPV</Link></li>
          </ul>
        </div>

        {/* Courses & Admin Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Training & Admin</h4>
          <ul className="footer-links">
            <li><Link to="/courses">Certified Pilot Program</Link></li>
            <li><Link to="/courses">GIS Photogrammetry</Link></li>
            <li><Link to="/courses">FPV Racing Course</Link></li>
            <li><Link to="/admin/login" className="admin-link"><Shield size={14} /> Admin Portal</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom max-width-container">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} DroneTV AI Support & Lead Assistant. All rights reserved. Built for technical assessment.
        </p>
      </div>
    </footer>
  );
};
export default Footer;

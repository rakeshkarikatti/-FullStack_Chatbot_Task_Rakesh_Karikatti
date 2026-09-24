import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Service } from '../types/service';
import {
  MapPin,
  Activity,
  Sprout,
  Video,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();

  const renderIcon = (name: string) => {
    switch (name) {
      case 'MapPin':
        return <MapPin size={24} className="service-icon" />;
      case 'Activity':
        return <Activity size={24} className="service-icon" />;
      case 'Sprout':
        return <Sprout size={24} className="service-icon" />;
      case 'Video':
        return <Video size={24} className="service-icon" />;
      case 'Wrench':
      default:
        return <Wrench size={24} className="service-icon" />;
    }
  };

  const handleEnquire = () => {
    navigate('/contact', {
      state: {
        userType: 'Customer',
        interest: service.title,
      },
    });
  };

  return (
    <div className="service-card">
      <div className="service-card-top">
        <div className="service-icon-box">{renderIcon(service.iconName)}</div>
        <span className="service-category-tag">{service.category}</span>
      </div>

      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.description}</p>

      <div className="service-card-features">
        <h4 className="features-title">Core Capabilities:</h4>
        <ul className="features-list">
          {service.features.map((feat, idx) => (
            <li key={idx}>
              <CheckCircle2 size={14} className="feature-check-icon" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="service-card-footer">
        <button
          type="button"
          className="btn btn-outline service-enquire-btn"
          onClick={handleEnquire}
        >
          <span>Enquire for Service</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
export default ServiceCard;

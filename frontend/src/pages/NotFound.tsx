import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-card max-width-container">
        <div className="notfound-icon">
          <Plane size={48} className="plane-offtrack" />
        </div>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Airspace Waypoint Not Found</h2>
        <p className="notfound-desc">
          The requested coordinate or page does not exist or may have been repositioned.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <ArrowLeft size={18} />
          <span>Return to DroneTV Home</span>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;

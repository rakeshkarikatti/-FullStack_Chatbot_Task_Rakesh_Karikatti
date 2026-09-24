import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import { servicesData } from '../data/services';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ServicesProps {
  onOpenChat: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Surveying', 'Inspection', 'Agriculture', 'Media', 'Technical Support'];

  const filteredServices = servicesData.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="services-page">
      {/* Header Banner */}
      <section className="page-header-banner">
        <div className="max-width-container">
          <span className="section-pill">Enterprise Solutions</span>
          <h1 className="page-title">Commercial Drone Services</h1>
          <p className="page-subtitle">
            Engineered drone missions providing actionable aerial surveys, multispectral insights, and industrial asset inspection.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="filter-section max-width-container">
        <div className="filter-controls-row">
          <div className="search-input-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search services (e.g. mapping, thermal, agriculture)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-pills-row">
            <div className="cat-label">
              <SlidersHorizontal size={14} />
              <span>Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container">
        <div className="max-width-container">
          {filteredServices.length === 0 ? (
            <div className="empty-state-card">
              <p className="empty-text">No services match your search criteria.</p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="services-grid">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenChat={onOpenChat} />
    </div>
  );
};
export default Services;

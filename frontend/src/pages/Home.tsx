import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import CourseCard from '../components/CourseCard';
import CTASection from '../components/CTASection';
import { servicesData } from '../data/services';
import { coursesData } from '../data/courses';
import {
  Compass,
  GraduationCap,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HomeProps {
  onOpenChat: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenChat }) => {
  // Previews
  const previewServices = servicesData.slice(0, 3);
  const previewCourses = coursesData.slice(0, 2);

  const whyChooseUsItems = [
    {
      icon: <GraduationCap size={28} className="why-icon" />,
      title: 'Practical Learning',
      desc: 'Hands-on flight simulator sessions followed by live on-field multirotor pilot training.',
    },
    {
      icon: <Wrench size={28} className="why-icon" />,
      title: 'Technical Support',
      desc: 'End-to-end guidance for commercial drone missions, avionics diagnostics, and fleet tuning.',
    },
    {
      icon: <Compass size={28} className="why-icon" />,
      title: 'Structured Training',
      desc: 'Industry-standard curriculums covering regulatory compliance, photogrammetry, and safety.',
    },
    {
      icon: <ShieldCheck size={28} className="why-icon" />,
      title: 'Professional Guidance',
      desc: 'Experienced instructors and commercial drone specialists supporting students and enterprise clients.',
    },
  ];

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero onOpenChat={onOpenChat} />

      {/* 2. Services Preview Section */}
      <section className="section-container bg-surface">
        <div className="section-inner max-width-container">
          <div className="section-header">
            <span className="section-pill">
              <Sparkles size={14} /> Commercial Solutions
            </span>
            <h2 className="section-title">Drone Services Overview</h2>
            <p className="section-subtitle">
              Precision aerial surveying, thermal infrastructure inspections, and customized drone deployment.
            </p>
          </div>

          <div className="services-grid">
            {previewServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="section-bottom-action">
            <Link to="/services" className="btn btn-secondary">
              <span>View All Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Courses Preview Section */}
      <section className="section-container">
        <div className="section-inner max-width-container">
          <div className="section-header">
            <span className="section-pill">
              <GraduationCap size={14} /> Academy & Training
            </span>
            <h2 className="section-title">Professional Training Programs</h2>
            <p className="section-subtitle">
              Structured courses designed for students, engineering graduates, and aspiring commercial UAV pilots.
            </p>
          </div>

          <div className="courses-grid">
            {previewCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="section-bottom-action">
            <Link to="/courses" className="btn btn-secondary">
              <span>Explore All Courses</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="section-container bg-surface">
        <div className="section-inner max-width-container">
          <div className="section-header">
            <span className="section-pill">Our Commitment</span>
            <h2 className="section-title">Why Partner With DroneTV</h2>
            <p className="section-subtitle">
              Delivering dependable commercial drone solutions and structured technical skill-building.
            </p>
          </div>

          <div className="why-grid">
            {whyChooseUsItems.map((item, idx) => (
              <div key={idx} className="why-card">
                <div className="why-icon-box">{item.icon}</div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <CTASection onOpenChat={onOpenChat} />
    </div>
  );
};
export default Home;

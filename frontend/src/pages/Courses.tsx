import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import CTASection from '../components/CTASection';
import { coursesData } from '../data/courses';
import { Search, GraduationCap } from 'lucide-react';

interface CoursesProps {
  onOpenChat: () => void;
}

export const Courses: React.FC<CoursesProps> = ({ onOpenChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.modules.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="courses-page">
      {/* Header Banner */}
      <section className="page-header-banner">
        <div className="max-width-container">
          <span className="section-pill">
            <GraduationCap size={14} /> Drone Academy
          </span>
          <h1 className="page-title">Drone Pilot & Engineering Training</h1>
          <p className="page-subtitle">
            Industry-oriented certification courses combining aerodynamics theory, flight simulator drills, and hands-on multirotor flight experience.
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
              placeholder="Search courses (e.g. pilot, photogrammetry, FPV)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-pills-row">
            <div className="cat-label">
              <span>Proficiency Level:</span>
            </div>
            {levels.map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`category-pill-btn ${selectedLevel === lvl ? 'active' : ''}`}
                onClick={() => setSelectedLevel(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-container">
        <div className="max-width-container">
          {filteredCourses.length === 0 ? (
            <div className="empty-state-card">
              <p className="empty-text">No training programs match your search.</p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLevel('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
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
export default Courses;

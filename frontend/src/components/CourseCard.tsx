import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../types/course';
import { Clock, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleEnquire = () => {
    navigate('/contact', {
      state: {
        userType: 'Student',
        interest: course.title,
      },
    });
  };

  return (
    <div className="course-card">
      <div className="course-card-header">
        <span className={`badge-level level-${course.level.toLowerCase()}`}>
          {course.level}
        </span>
        <div className="course-duration">
          <Clock size={14} />
          <span>{course.duration}</span>
        </div>
      </div>

      <h3 className="course-title">{course.title}</h3>
      <p className="course-desc">{course.description}</p>

      <div className="course-format">
        <BookOpen size={14} className="format-icon" />
        <span>{course.format}</span>
      </div>

      <div className="course-modules">
        <h4 className="modules-heading">Syllabus Highlights:</h4>
        <ul className="modules-list">
          {course.modules.map((m, idx) => (
            <li key={idx}>
              <CheckCircle size={14} className="module-check" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="course-footer">
        <button
          type="button"
          className="btn btn-primary course-enquire-btn"
          onClick={handleEnquire}
        >
          <span>Enrol / Enquire</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
export default CourseCard;

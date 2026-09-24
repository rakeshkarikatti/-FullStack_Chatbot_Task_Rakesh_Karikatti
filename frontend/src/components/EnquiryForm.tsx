import React, { useState, useEffect } from 'react';
import { EnquiryInput, UserType } from '../types/enquiry';
import { validateEnquiryForm, FormErrors } from '../utils/validation';
import { createEnquiry, formatApiError } from '../services/api';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface EnquiryFormProps {
  initialUserType?: UserType;
  initialInterest?: string;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialUserType = 'Student',
  initialInterest = '',
  onSuccess,
}) => {
  const [formData, setFormData] = useState<EnquiryInput>({
    name: '',
    email: '',
    phone: '',
    userType: initialUserType,
    interest: initialInterest,
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Update initial fields if props change
  useEffect(() => {
    if (initialUserType) {
      setFormData((prev) => ({ ...prev, userType: initialUserType }));
    }
    if (initialInterest) {
      setFormData((prev) => ({ ...prev, interest: initialInterest }));
    }
  }, [initialUserType, initialInterest]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setApiError(null);

    const validation = validateEnquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createEnquiry(formData);
      setSuccessMessage(
        response.message ||
          'Thank you! Your enquiry has been submitted successfully. Our team will get back to you.'
      );
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        userType: 'Student',
        interest: '',
        message: '',
      });
      setErrors({});
      if (onSuccess) onSuccess();
    } catch (err) {
      setApiError(formatApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="enquiry-card">
      <div className="enquiry-header">
        <h3 className="enquiry-title">Submit an Enquiry / Lead</h3>
        <p className="enquiry-subtitle">
          Whether you are a student exploring drone certifications or a customer requiring commercial aerial solutions, send us your requirements.
        </p>
      </div>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          <CheckCircle2 size={20} className="alert-icon" />
          <div className="alert-content">
            <strong>Submission Received!</strong>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {apiError && (
        <div className="alert alert-error" role="alert">
          <AlertCircle size={20} className="alert-icon" />
          <div className="alert-content">
            <strong>Notice</strong>
            <p>{apiError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name <span className="req">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            placeholder="e.g. Aarav Sharma"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* Email & Phone Row */}
        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="req">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="e.g. aarav@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="req">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={`form-input ${errors.phone ? 'input-error' : ''}`}
              placeholder="e.g. +91 9876543210"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
        </div>

        {/* User Type & Interest */}
        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="userType" className="form-label">
              User Type <span className="req">*</span>
            </label>
            <select
              id="userType"
              name="userType"
              className={`form-select ${errors.userType ? 'input-error' : ''}`}
              value={formData.userType}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            >
              <option value="Student">Student (Training / Courses)</option>
              <option value="Customer">Customer (Commercial Drone Services)</option>
              <option value="Other">Other (General Query / Maintenance)</option>
            </select>
            {errors.userType && <span className="error-text">{errors.userType}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="interest" className="form-label">
              Service / Course Interest <span className="req">*</span>
            </label>
            <input
              id="interest"
              name="interest"
              type="text"
              className={`form-input ${errors.interest ? 'input-error' : ''}`}
              placeholder="e.g. Commercial Pilot Program or GIS Mapping"
              value={formData.interest}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            {errors.interest && <span className="error-text">{errors.interest}</span>}
          </div>
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Your Message / Query Details <span className="req">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`form-textarea ${errors.message ? 'input-error' : ''}`}
            placeholder="Tell us about your background, training goals, or specific project requirements..."
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary btn-block submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="spinner" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Submit Enquiry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
export default EnquiryForm;

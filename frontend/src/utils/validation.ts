import { EnquiryInput } from '../types/enquiry';

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  userType?: string;
  interest?: string;
  message?: string;
}

export function validateEnquiryForm(formData: EnquiryInput): {
  isValid: boolean;
  errors: FormErrors;
} {
  const errors: FormErrors = {};

  // Name validation
  if (!formData.name || formData.name.trim().length === 0) {
    errors.name = 'Please enter your name.';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || formData.email.trim().length === 0) {
    errors.email = 'Please enter a valid email.';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  // Phone validation
  const digitsOnly = formData.phone ? formData.phone.replace(/[^0-9]/g, '') : '';
  if (!formData.phone || formData.phone.trim().length === 0) {
    errors.phone = 'Please enter a valid phone number.';
  } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    errors.phone = 'Please enter a valid phone number (7–15 digits).';
  }

  // User Type validation
  if (!formData.userType || formData.userType.trim().length === 0) {
    errors.userType = 'Please select a user type.';
  } else if (!['Student', 'Customer', 'Other'].includes(formData.userType)) {
    errors.userType = 'Please select a valid user type (Student, Customer, or Other).';
  }

  // Interest validation
  if (!formData.interest || formData.interest.trim().length === 0) {
    errors.interest = 'Please select a service or course.';
  }

  // Message validation
  if (!formData.message || formData.message.trim().length === 0) {
    errors.message = 'Please enter your message.';
  } else if (formData.message.trim().length < 5) {
    errors.message = 'Please enter a message with at least 5 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

import validator from 'validator';

export interface ValidationErrorMap {
  [field: string]: string;
}

export type UserType = 'Student' | 'Customer' | 'Other';
export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';

export const VALID_USER_TYPES: UserType[] = ['Student', 'Customer', 'Other'];
export const VALID_STATUSES: EnquiryStatus[] = ['New', 'Contacted', 'In Progress', 'Closed'];

/**
 * Validate enquiry creation payload
 */
export function validateEnquiryInput(data: {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  userType?: unknown;
  interest?: unknown;
  message?: unknown;
}): { isValid: boolean; errors: ValidationErrorMap } {
  const errors: ValidationErrorMap = {};

  // Name
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.name = 'Please enter your name.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name cannot exceed 100 characters.';
  }

  // Email
  if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
    errors.email = 'Please enter a valid email.';
  } else if (!validator.isEmail(data.email.trim())) {
    errors.email = 'Please enter a valid email address format.';
  }

  // Phone
  if (!data.phone || typeof data.phone !== 'string' || data.phone.trim().length === 0) {
    errors.phone = 'Please enter a valid phone number.';
  } else {
    // Check reasonable international or local phone format (digits, +, -, spaces, parentheses, 7 to 15 digits)
    const digitsOnly = data.phone.replace(/[^0-9]/g, '');
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      errors.phone = 'Please enter a valid phone number (7-15 digits).';
    }
  }

  // User Type
  if (!data.userType || typeof data.userType !== 'string' || data.userType.trim().length === 0) {
    errors.userType = 'Please select a user type.';
  } else if (!VALID_USER_TYPES.includes(data.userType.trim() as UserType)) {
    errors.userType = 'User type must be Student, Customer, or Other.';
  }

  // Interest
  if (!data.interest || typeof data.interest !== 'string' || data.interest.trim().length === 0) {
    errors.interest = 'Please select a service or course.';
  } else if (data.interest.trim().length > 150) {
    errors.interest = 'Interest description cannot exceed 150 characters.';
  }

  // Message
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.message = 'Please enter your message.';
  } else if (data.message.trim().length < 5) {
    errors.message = 'Message must be at least 5 characters long.';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate status update
 */
export function validateStatusUpdate(status: unknown): { isValid: boolean; error?: string } {
  if (!status || typeof status !== 'string') {
    return { isValid: false, error: 'Status is required.' };
  }
  if (!VALID_STATUSES.includes(status.trim() as EnquiryStatus)) {
    return {
      isValid: false,
      error: `Invalid status. Allowed values are: ${VALID_STATUSES.join(', ')}.`,
    };
  }
  return { isValid: true };
}

/**
 * Validate Admin login
 */
export function validateLoginInput(data: {
  email?: unknown;
  password?: unknown;
}): { isValid: boolean; errors: ValidationErrorMap } {
  const errors: ValidationErrorMap = {};

  if (!data.email || typeof data.email !== 'string' || !validator.isEmail(data.email.trim())) {
    errors.email = 'Please enter a valid admin email address.';
  }

  if (!data.password || typeof data.password !== 'string' || data.password.length === 0) {
    errors.password = 'Please enter your password.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

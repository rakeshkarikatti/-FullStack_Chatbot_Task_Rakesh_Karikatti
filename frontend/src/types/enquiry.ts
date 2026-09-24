export type UserType = 'Student' | 'Customer' | 'Other';
export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';

export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryStats {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  closed: number;
  student: number;
  customer: number;
}

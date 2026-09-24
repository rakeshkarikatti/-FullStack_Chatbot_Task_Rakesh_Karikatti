import axios, { AxiosError } from 'axios';
import { EnquiryInput, Enquiry, EnquiryStatus, EnquiryStats } from '../types/enquiry';
import { getBotResponse } from '../utils/chatbot';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to administrative requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dronetv_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export function formatApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<ApiErrorResponse>;
    if (axiosErr.response?.data?.message) {
      return axiosErr.response.data.message;
    }
    if (axiosErr.code === 'ECONNABORTED') {
      return 'The request timed out. Please try again.';
    }
    if (!axiosErr.response) {
      return 'Unable to connect to the server. Please verify the backend is running.';
    }
  }
  return 'An unexpected error occurred. Please try again later.';
}

// -------------------------------------------------------------
// Authentication Services
// -------------------------------------------------------------

export async function loginAdmin(credentials: { email: string; password: string }): Promise<{
  token: string;
  admin: { id: number; name: string; email: string };
}> {
  const res = await api.post('/auth/login', credentials);
  if (res.data.token) {
    localStorage.setItem('dronetv_admin_token', res.data.token);
    localStorage.setItem('dronetv_admin_user', JSON.stringify(res.data.admin));
  }
  return res.data;
}

export async function logoutAdmin(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch (_e) {
    // Ignore server logout errors on client-side cleanup
  } finally {
    localStorage.removeItem('dronetv_admin_token');
    localStorage.removeItem('dronetv_admin_user');
  }
}

export async function getCurrentAdmin(): Promise<{ id: number; name: string; email: string } | null> {
  const token = localStorage.getItem('dronetv_admin_token');
  if (!token) return null;

  try {
    const res = await api.get('/auth/me');
    return res.data.admin;
  } catch (_err) {
    localStorage.removeItem('dronetv_admin_token');
    localStorage.removeItem('dronetv_admin_user');
    return null;
  }
}

// -------------------------------------------------------------
// Enquiry Management Services
// -------------------------------------------------------------

export async function createEnquiry(enquiryData: EnquiryInput): Promise<{
  success: boolean;
  message: string;
  data: Enquiry;
}> {
  const res = await api.post('/enquiries', enquiryData);
  return res.data;
}

export async function getEnquiries(params?: {
  search?: string;
  userType?: string;
  status?: string;
}): Promise<{
  success: boolean;
  data: Enquiry[];
  stats: EnquiryStats;
}> {
  const res = await api.get('/enquiries', { params });
  return res.data;
}

export async function getEnquiryById(id: number): Promise<{
  success: boolean;
  data: Enquiry;
}> {
  const res = await api.get(`/enquiries/${id}`);
  return res.data;
}

export async function updateEnquiry(
  id: number,
  status: EnquiryStatus
): Promise<{
  success: boolean;
  message: string;
  data: Enquiry;
}> {
  const res = await api.patch(`/enquiries/${id}`, { status });
  return res.data;
}

export async function deleteEnquiry(id: number): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await api.delete(`/enquiries/${id}`);
  return res.data;
}

// -------------------------------------------------------------
// Chatbot Service with Resilient Fallback
// -------------------------------------------------------------

export async function sendChatMessage(message: string): Promise<{
  reply: string;
  intentId?: string;
  action?: {
    label: string;
    target: string;
    prefill?: {
      userType?: 'Student' | 'Customer' | 'Other';
      interest?: string;
    };
  };
  source: string;
}> {
  try {
    const res = await api.post('/chat', { message });
    return {
      reply: res.data.reply,
      intentId: res.data.intentId,
      action: res.data.action,
      source: res.data.source || 'backend',
    };
  } catch (_error) {
    // Graceful client-side fallback if backend is offline/unreachable
    console.warn('[Chatbot] Backend unreachable; activating local rule-based response engine.');
    const localResult = getBotResponse(message);
    return {
      reply: localResult.text,
      intentId: localResult.intentId,
      action: localResult.action,
      source: 'client-fallback',
    };
  }
}

export default api;

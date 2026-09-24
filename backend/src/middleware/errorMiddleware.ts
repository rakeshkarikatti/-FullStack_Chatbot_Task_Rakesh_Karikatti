import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  errors?: Record<string, string>;
}

/**
 * Centralized Error Handling Middleware
 * Guarantees consistent JSON error structures and prevents leaking database credentials,
 * stack traces, or internal server details in production.
 */
export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  
  // Safe default client-friendly message
  let message = err.message || 'An unexpected internal error occurred. Please try again later.';

  // Mask database / system errors to avoid exposing internal infrastructure
  if (statusCode === 500) {
    console.error('[Server Internal Error]', err);
    message = 'An unexpected server error occurred. Our technical team has been notified.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.errors ? { errors: err.errors } : {}),
  });
}

/**
 * 404 Route Not Found Middleware
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
}

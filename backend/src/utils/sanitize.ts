/**
 * Strips HTML tags and script injections from string inputs
 * to prevent Stored & Reflected Cross-Site Scripting (XSS).
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    // Strip HTML tags
    .replace(/<[^>]*>?/gm, '')
    // Replace dangerous characters with safe entities
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Trims and cleans plain text without full entity escaping (for internal matching/logging)
 */
export function cleanPlainText(input: unknown): string {
  if (typeof input !== 'string') {
    return '';
  }
  return input.trim().replace(/<[^>]*>?/gm, '');
}

/**
 * Deep sanitization for structured object inputs
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (Object.prototype.hasOwnProperty.call(sanitized, key)) {
      const val = sanitized[key];
      if (typeof val === 'string') {
        (sanitized as Record<string, unknown>)[key] = sanitizeString(val);
      } else if (val && typeof val === 'object' && !Array.isArray(val)) {
        (sanitized as Record<string, unknown>)[key] = sanitizeObject(val as Record<string, unknown>);
      }
    }
  }
  return sanitized;
}

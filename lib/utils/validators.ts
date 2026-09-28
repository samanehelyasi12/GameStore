/**
 * Shared form validators.
 *
 * These regexes were duplicated across four forms. They are kept here so the
 * rule is written once — the patterns and the trim/replace preprocessing are
 * byte-identical to the previous per-file copies, so validation behaviour and
 * error messages are unchanged.
 */

/** Iranian postal code = 10 digits. */
export const POSTAL_RE = /^\d{10}$/;

/** Accepts 09xxxxxxxxx / +989xxxxxxxxx / 9xxxxxxxxx. */
export const PHONE_RE = /^(?:\+?98|0)?9\d{9}$/;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strips the separators users type into a phone number before testing it. */
export function normalizePhone(value: string): string {
  return value.trim().replace(/[\s-]/g, "");
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return PHONE_RE.test(normalizePhone(value));
}

export function isValidPostalCode(value: string): boolean {
  return POSTAL_RE.test(value.trim());
}

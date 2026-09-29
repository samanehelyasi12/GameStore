/**
 * The signed-in user.
 *
 * Kept deliberately small: it is the only shape the UI needs, and it is
 * exactly what a real `/me` endpoint would return. The demo session stored
 * in localStorage has this same shape, so swapping the provider for a real
 * auth API requires no change anywhere else.
 */
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  /** ISO timestamp. */
  createdAt: string;
};

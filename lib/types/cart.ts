/**
 * Cart domain types.
 *
 * A cart line is a *snapshot* of the product (title, price, image…) so the
 * cart keeps working on the client while the product is not in the store.
 * Once the backend is connected, `id` becomes the real product id and the
 * rest is re-hydrated from the API response.
 */

export type CartItem = {
  /** Stable product id (mock: slug — swap for the API id). */
  id: string;
  slug: string;
  title: string;
  /** Toman. */
  price: number;
  /** Original price when the product is on sale, otherwise null. */
  compareAtPrice: number | null;
  coverImage: string;
  /** Product page route, e.g. "/games/elden-ring". */
  href: string;
  quantity: number;
};

/** Everything the cart line needs to become a cart item. */
export type AddableProduct = Omit<CartItem, "quantity">;

export type CartTotals = {
  /** Sum of `price` for every line. */
  subtotal: number;
  /** Money saved vs `compareAtPrice`. */
  discount: number;
  /** subtotal − discount (digital delivery → no shipping cost). */
  total: number;
  /** Total number of items (sum of quantities). */
  count: number;
};

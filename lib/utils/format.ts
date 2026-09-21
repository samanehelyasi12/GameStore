export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-GB");
}
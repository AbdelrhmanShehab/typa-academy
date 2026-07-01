/**
 * Format a Firestore timestamp or ISO date string into a readable Arabic date.
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Convert a title string into a URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Truncate a string to a maximum length, appending '...' if truncated.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Format a price number to Arabic currency display.
 */
export function formatPrice(price: number, currency = 'USD'): string {
  if (price === 0) return 'مجاني';
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency,
  }).format(price);
}

export function sanitizeDate(date: string): string {

  const matches = date.match(/^(\d{2}:\d{2}:\d{2})(.*)/);
  if (matches) {
    date = `1970-01-01T${matches[1]}${matches[2] || '+00:00'}`;
  }

  return date;
}

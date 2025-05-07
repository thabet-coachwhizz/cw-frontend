export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidDate(value: string): boolean {
  return !isNaN(Date.parse(value));
}

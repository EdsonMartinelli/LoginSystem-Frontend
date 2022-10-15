export function emailConsistency(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

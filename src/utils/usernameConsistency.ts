export function usernameConsistency(username: string): boolean {
  return !(username.length < 3);
}

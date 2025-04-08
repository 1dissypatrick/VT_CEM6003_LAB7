import * as db from '../helpers/database';

// Get user by username (no password encryption)
export const findByUsername = async (username: string) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const result = await db.run_query(query, [username]);
  return result.length ? result[0] : null;
}

// Simple password verification (plaintext comparison)
export const verifyPassword = (user: any, password: string) => {
  return user.password === password;
}
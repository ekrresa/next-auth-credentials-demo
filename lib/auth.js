import { initialiseDB } from "./initialiseDB";

export async function login(credentials) {
  const db = await initialiseDB();
  const result = await db.get(
    `SELECT name, email, password FROM users WHERE email = ?`,
    [credentials.email]
  );

  if (!result) throw new Error("Invalid credentials");

  if (result.password !== credentials.password)
    throw new Error("Invalid credentials");

  return { name: result.name, email: result.email };
}

export async function signup(credentials) {
  const db = await initialiseDB();

  const existingUser = await db.get(`SELECT 1 FROM users WHERE email = ?`, [
    credentials.email,
  ]);

  if (existingUser) throw new Error("Email is already in use");

  const result = await db.run(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [credentials.name, credentials.email, credentials.password]
  );

  if (!result.changes) throw new Error("An error occurred");

  return await db.get(`SELECT name, email FROM users WHERE id = ?`, [
    result.lastID,
  ]);
}

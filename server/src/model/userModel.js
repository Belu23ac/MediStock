import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const db = await open({
  filename: '../server/src/db/users.db',
  driver: sqlite3.Database
});

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password INTEGER NOT NULL
  );
`);

export async function insertUser({ username, password }) {
  try {
    const result = await db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      username,
      password
    );
    return result.lastID; // returns new id
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT") {
      throw new Error("Username already taken");
    }
    throw err; // Re-throw other errors
  }
}

export async function loginUser(user) {
  console.log("loginUser", user);
  try {
    const dbUser = await db.get(
      "SELECT * FROM users WHERE username = ?",
      user
    );
    return dbUser;
  } catch (err) {
    console.log("Error fetching user:", err);
    throw err; // Re-throw errors
  }
}

import { connectToUsersDatabase } from "../db/db.js";

export const db = await connectToUsersDatabase();

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

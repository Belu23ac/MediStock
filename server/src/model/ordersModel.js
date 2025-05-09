import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open({
  filename: "../server/src/db/orders.db",
  driver: sqlite3.Database,
});
await db.exec(`
        CREATE TABLE IF NOT EXISTS orders (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        userId INTEGER NOT NULL,
                        userOrder TEXT NOT NULL,
                        isEmergency BOOLEAN NOT NULL DEFAULT 0,
                        time DATETIME DEFAULT CURRENT_TIMESTAMP
        );
`);

export async function insertOrder({ userId, order, isEmergency = false }) {
  try {
    console.log("insertOrder", userId, order, isEmergency);
    if (!userId || !order) {
      console.log("Bad input", userId, order);
      throw new Error("Bad input");
    }
    const result = await db.run(
      "INSERT INTO orders (userId, userOrder, isEmergency) VALUES (?, ?, ?)",
      userId,
      order,
      isEmergency ? 1 : 0
    );
    return result.lastID; // returns new id
  } catch (err) {
    throw err;
  }
}

export async function getOrderById(id) {
  try {
    const order = await db.get("SELECT * FROM orders WHERE id = ?", id);
    return order;
  } catch (err) {
    console.log("Error fetching order:", err);
    throw err; // Re-throw errors
  }
}
import { connectToOrdersDatabase } from "../db/db.js";

export const db = await connectToOrdersDatabase();

export async function insertOrder({ userId, order, isEmergency = false }) {
  try {
    if (!userId || !order) {
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
    const order = await db.get("SELECT * FROM orders WHERE orderId = ?", id);
    return order;
  } catch (err) {
    throw err; // Re-throw errors
  }
}
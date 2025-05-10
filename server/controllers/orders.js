import { insertOrder } from "../model/ordersModel.js";
import { getOrderById } from "../model/ordersModel.js";

export async function logOrder(req, res, next) {
  try {
    const { userId, orderItems, isEmergency } = req.body; // JSON body parsed by express.json()
    if (!userId || !orderItems) {
      return res.status(400).json({ message: "Bad input" });
    }
    // Create a new order instance
    const orderId = await insertOrder({
      userId,
      order: JSON.stringify(orderItems),
      isEmergency,
    });
    return res
      .status(201)
      .json({ message: "Order logged successfully", orderId });
  } catch (err) {
    next(err); // global error handler → 500
  }
}

export async function getOrder(req, res, next) {
  try {
    const { id } = req.params; // JSON body parsed by express.json()
    if (!id) {
      return res.status(400).json({ message: "Bad input" });
    }
    const order = await getOrderById(id); // talk to SQLite
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    next(err); // global error handler → 500
  }
}
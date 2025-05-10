import { insertOrder } from "../model/ordersModel.js";
import { getOrderById } from "../model/ordersModel.js";

export async function logOrder(req, res, next) {
  console.log("logOrder", req.body);
  try {
    console.log("logOrder", req.body);
    const { userId, orderItems, isEmergency } = req.body; // JSON body parsed by express.json()
    if (!userId || !orderItems) {
      console.log("Bad input", req.body);
      return res.status(400).json({ message: "Bad input" });
    }
    // Create a new order instance
    const orderId = await insertOrder({
      userId,
      order: JSON.stringify(orderItems),
      isEmergency,
    });
    console.log("Order logged", { orderId });
    return res
      .status(201)
      .json({ message: "Order logged successfully", orderId });
  } catch (err) {
    console.log("Error in logOrder", err);
    next(err); // global error handler → 500
  }
}

export async function getOrder(req, res, next) {
  console.log("getOrder", req.params);
  try {
    const { id } = req.params; // JSON body parsed by express.json()
    if (!id) {
      console.log("Bad input", req.params);
      return res.status(400).json({ message: "Bad input" });
    }
    const order = await getOrderById(id); // talk to SQLite
    if (!order) return res.status(404).json({ message: "Order not found" });
    console.log("Order found", order);
    return res.status(200).json(order);
  } catch (err) {
    console.log("Error in getOrder", err);
    next(err); // global error handler → 500
  }
}
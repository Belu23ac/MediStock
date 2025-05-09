import { Router } from "express";
import { logOrder } from "../controllers/orders.js";
import { getOrder } from "../controllers/orders.js";

const ordersRouter = Router();
export default ordersRouter;

ordersRouter.post("/add", logOrder);
ordersRouter.get("/:id", getOrder);
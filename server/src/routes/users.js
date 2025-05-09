import { Router } from "express";
import { createUser } from "../controllers/users.js";
import { loginUser } from "../controllers/users.js";
const usersRouter = Router();
export default usersRouter;

usersRouter.post("/login", loginUser);
usersRouter.post("/register", createUser);

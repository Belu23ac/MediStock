import { loginUser as loginUserModel } from "../model/userModel.js";
import { comparePassword } from "../utils/password.js";
import { insertUser } from "../model/userModel.js";

export async function loginUser(req, res, next) {
  try {
    const { username, password } = req.body; // JSON body parsed by express.json()
    if (!username || !password) {
      return res.status(400).json({ message: "Bad input" });
    }

    const dbUser = await loginUserModel(username); // talk to SQLite
    if (!dbUser) return res.status(401).json({ message: "Wrong credentials" });

    const isValid = await comparePassword(password, dbUser.password);
    if (!isValid) return res.status(401).json({ message: "Wrong credentials" });

    return res.status(200).json({ id: dbUser.id, username: dbUser.username });
  } catch (err) {
    next(err); // global error handler → 500
  }
}

export async function createUser(req, res, next) {
  try {
    const { username, password } = req.body; // JSON body parsed by express.json()
    if (!username || !password)
      return res.status(400).json({ message: "Bad input" });

    const id = await insertUser({ username, password }); // talk to SQLite
    return res.status(201).json({ id, username, password });
  } catch (err) {
    if (err.message === "Username already taken") {
      return res.status(409).json({ message: err.message }); // 409 Conflict
    }
    next(err); // global error handler → 500
  }
}

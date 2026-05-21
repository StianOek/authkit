import exporess from "express";
import { signUp, login } from "../controllers/authController.js";

const authRouter = exporess.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);

export default authRouter;

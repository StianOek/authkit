import exporess from "express";
import { signUp } from "../controllers/authController.js";

const authRouter = exporess.Router();

authRouter.post("/signup", signUp);

export default authRouter;

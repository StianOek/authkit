import exporess from "express";
import {
  signUp,
  login,
  logout,
  getUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = exporess.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.use(authMiddleware);

authRouter.get("/user", getUser);

export default authRouter;

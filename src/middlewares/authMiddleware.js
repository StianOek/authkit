import jwt from "jsonwebtoken";
import { prismaClient } from "../config/db.js";

// Lese bruker token fra request
// sjekke om bruker token er gyldig
export const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.user_token) {
    token = req.cookies.user_token;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prismaClient.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: "User no longer exist" });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
    next();
  } catch (error) {
    // Bygg en mer spesifik error håndtering
    return res.status(401).json({ error: "Not authorized, Token not found" });
  }
};

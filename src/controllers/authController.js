import { prismaClient } from "../config/db.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await prismaClient.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res
      .status(409)
      .json({ error: "There already exists a user with this email" });
  }

  const passwordHashed = await hashPassword(password);

  const createUser = await prismaClient.user.create({
    data: {
      name,
      email,
      password: passwordHashed,
    },
  });

  res.status(201).json({
    stauts: "success",
    data: {
      user: {
        id: createUser.id,
        name: name,
        email: email,
      },
    },
  });

  res.json(req.body);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await prismaClient.user.findUnique({
    where: { email: email },
  });

  if (!userExists) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isValidPassword = await verifyPassword(userExists.password, password);

  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Generere json web token

  res.status(201).json({
    stauts: "success",
    data: {
      user: {
        id: userExists.id,
        email: email,
      },
    },
  });
};

export { signUp, login };

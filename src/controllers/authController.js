import { prismaClient } from "../config/db.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { generateToken } from "../utils/generateJWT.js";
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

  // Generere json web token
  const token = generateToken(createUser.id, res);

  res.status(201).json({
    stauts: "success",
    data: {
      user: {
        id: createUser.id,
        name: name,
        email: email,
      },
      token,
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
  const token = generateToken(userExists.id, res);

  res.status(201).json({
    stauts: "success",
    data: {
      user: {
        id: userExists.id,
        email: email,
      },
      token,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("user_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

const getUser = async (req, res) => {
  console.log("Checking if req user is defined", req.user);
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

export { signUp, login, logout, getUser };

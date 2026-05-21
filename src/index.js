import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// auth import
import authRouter from "../src/routes/authRoutes.js";

config();
connectDB();

const app = express();

// parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

// Håndtere avvist promise ( eksempel: database tilkobling)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Håndtere ukontrollerte exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Kontrollert nedstenging
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

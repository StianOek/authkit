import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connectDB = async () => {
  try {
    await prismaClient.$connect();
    console.log("Connected to Database with prisma ");
  } catch (error) {
    console.error(`Connection went wrong: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prismaClient.$disconnect();
};

export { prismaClient, connectDB, disconnectDB };

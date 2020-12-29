import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";

let prisma: PrismaClient<PrismaClientOptions, never>;

const options: PrismaClientOptions = {
  log: ["query", "error", "info", "warn"],
};

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(options);
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(options);
  }
  prisma = global.prisma;
}

export default prisma;

export * from "@prisma/client";

import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  const g = globalThis as typeof globalThis & {
    cachedPrisma?: PrismaClient;
  };

  if (!g.cachedPrisma) {
    g.cachedPrisma = new PrismaClient();
  }

  prisma = g.cachedPrisma;
}

export const db = prisma;
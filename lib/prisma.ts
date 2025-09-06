import { PrismaClient } from "@/app/generated/prisma";

const globalPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalPrisma.prisma || new PrismaClient({
  log: ['query'],
});

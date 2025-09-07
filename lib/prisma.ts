import { PrismaClient } from "@/app/generated/prisma";

const globalPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalPrisma.prisma || new PrismaClient({
  log: ['query'],
});

type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  application: Application[],
  createdAt: Date,
};

type Application = {
  id: string,
  company: string,
  position: string,
  status: Status,
  location: string,
  appliedAt: Date,
  deadline: Date,
  notes: string,
  userId: string
}

enum Status {
  APPLIED,
  INTERVIEW,
  OFFER,
  REJECTED,
}

export default User;

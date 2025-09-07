import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user_id } = await req.json();

  const applications = await prisma.application.findMany({
    where: {
      userId: user_id,
    },
    orderBy: {
      appliedAt: "desc",
    },
  });

  return NextResponse.json({ applications });
}

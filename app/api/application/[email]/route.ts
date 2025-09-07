import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) return NextResponse.json({ error: true, message: "L'ute" })
}

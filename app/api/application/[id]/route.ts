import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(id: string) {
  const application = await prisma.application.findUnique({
    where: {
      id,
    },
  });

  if (!application) return NextResponse.json({ error: true, message: "Applicazione inesistente" }, { status: 404 });

  return NextResponse.json({ application });
}

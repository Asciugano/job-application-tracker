import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { user_id } = await req.json();
  return NextResponse.json({ user_id, message: "aggiorna status, note o deadline" });
}

export async function DELETE(req: Request) {
  const { user_id } = await req.json();
  return NextResponse.json({ user_id, messaeg: "elimina candidatura" });
}

export async function GET(id: string) {
  const application = await prisma.application.findUnique({
    where: {
      id,
    },
  });

  if (!application) return NextResponse.json({ error: true, message: "Applicazione inesistente" }, { status: 404 });

  return NextResponse.json({ application });
}

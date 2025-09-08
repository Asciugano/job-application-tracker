import { prisma, Status } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user_id, company, position, location, deadline, notes, status } = await req.json();

  const newApplication = await prisma.application.create({
    data: {
      userId: user_id,
      status,
      company,
      position,
      location,
      deadline: deadline ? new Date(deadline) : null,
      notes
    }
  });

  if (!newApplication) return NextResponse.json({ error: true, message: "Errore nella creazione dell'Applicazione" }, { status: 400 });

  return NextResponse.json({ newApplication });
}

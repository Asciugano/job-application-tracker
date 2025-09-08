import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user_id, limit } = await req.json();
  let applications = null;

  if (!limit) {
    applications = await prisma.application.findMany({
      where: {
        userId: user_id,
      },
      orderBy: {
        appliedAt: "desc",
      },
    });
  } else {
    applications = await prisma.application.findMany({
      where: { userId: user_id },
      orderBy: { appliedAt: "desc", },
      take: limit,
    });
  }

  // if (!applications) return NextResponse.json({ error: true, message: "Impossibile prendere le applicazioni per questo utente" }, { status: 500 });

  return NextResponse.json({ applications });
}

export async function DELETE(req: Request) {
  const { application } = await req.json();
  const removed = await prisma.application.delete({
    where: { id: application.id },
  });

  if (!removed) return NextResponse.json({ error: true, message: "Impossibile elimenare una applicazione inesistente" }, { status: 404 });

  return NextResponse.json({ removed, message: "candidatura eliminata con successo" });
}

export async function PATCH(req: Request) {
  const { id, company, position, location, deadline, notes, status } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: true, message: "Necessario l'ID dell'applicazione " },
      { status: 400 }
    );
  }

  const toUpdate: any = {};
  if (status) toUpdate.status = status;
  if (company) toUpdate.company = company;
  if (position) toUpdate.position = position;
  if (location) toUpdate.location = location;
  if (deadline) toUpdate.deadline = deadline;
  if (notes) toUpdate.notes = notes;

  const updateA = await prisma.application.update({
    where: { id },
    data: toUpdate,
  });

  if (!updateA) return NextResponse.json({ error: true, message: "Errore nell'agggiornamento dell'applicazione" });

  return NextResponse.json({ application: updateA });
}

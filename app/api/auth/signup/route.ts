import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) return NextResponse.json({ error: true, message: "Email gia' registrata" }, { status: 401 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });

  if (!user) return NextResponse.json({ error: true, message: "Errore nella creazione dell'utente" }, { status: 400 });

  const res = NextResponse.json({ message: "Sign up effettuato" });
  return generateToken(user.id, res);
};

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) return NextResponse.json({ error: true, message: "Email gia' registrata" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });

  if (!user) return NextResponse.json({ error: true, message: "Errore nella creazione dell'utente" });

  const res = NextResponse.json({ message: "Sign up effettuato" });
  const token = generateToken(user.id, res);

  return token;
};

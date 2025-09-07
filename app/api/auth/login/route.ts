import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    }
  });

  if (!user) return NextResponse.json({ error: true, message: "Credenziali non valide" });

  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
  if (isPasswordCorrect) return NextResponse.json({ error: true, message: "Credenziali non valide" });

  const res = NextResponse.json({ message: "Login effettuato" });
  const token = generateToken(user.id, res);

  return token;
}

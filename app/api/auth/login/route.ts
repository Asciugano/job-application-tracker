import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) return NextResponse.json({ error: true, message: "Credenziali non valide" }, { status: 401 });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return NextResponse.json({ error: true, message: "Credenziali non valide" }, { status: 401 });

  const res = NextResponse.json({ message: "Login effettuato" });
  return generateToken(user.id, res);

}

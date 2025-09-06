import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "tutte le candidature" });
}

export async function POST(req: Request) {
  return NextResponse.json({ body: req.body, message: "crea candidatura" });
}

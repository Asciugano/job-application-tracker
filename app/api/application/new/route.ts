import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user_id } = await req.json();
  return NextResponse.json({ user_id, message: "crea candidatura" });
}

import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { user_id } = await req.json();
  return NextResponse.json({ user_id, message: "aggiorna status, note o deadline" });
}

export async function DELETE(req: Request) {
  const { user_id } = await req.json();
  return NextResponse.json({ user_id, messaeg: "elimina candidatura" });
}

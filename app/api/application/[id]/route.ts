import { NextResponse } from "next/server";

export function PATCH(req: Request) {
  return NextResponse.json({ body: req.body, message: "aggiorna status, note o deadline" });
}

export function DELETE(req: Request) {
  return NextResponse.json({ body: req.body, messaeg: "elimina candidatura" });
}

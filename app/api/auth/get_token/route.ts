import { getIDFromToken } from "@/lib/utils";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET() {
  const userID = await getIDFromToken();
  if (!userID) {
    return NextResponse.json({ error: true }, { status: 401 });
  }

  return NextResponse.json({ userID });
}

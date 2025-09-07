import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const generateToken = async (userID: string, res: NextResponse) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookies.set("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};

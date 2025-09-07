import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
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

  return res;
};

export const getIDFromToken = async () => {
  const cookiesStore = cookies();
  const token = (await cookiesStore).get('jwt')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userID: string };
    return decoded.userID;
  } catch (e) {
    console.error(e);
    return null;
  }
}

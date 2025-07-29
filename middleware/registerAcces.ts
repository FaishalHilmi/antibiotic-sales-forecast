import { NextRequest, NextResponse } from "next/server";

export const registerAcces = async (req: NextRequest) => {
  const allowRegister = process.env.ALLOW_REGISTER === "true";
  const pathname = req.nextUrl.pathname;

  if (!allowRegister && pathname.startsWith("/auth/register")) {
    // Bisa redirect ke halaman lain
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
};

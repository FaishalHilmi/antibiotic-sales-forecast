import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = async (
  req: NextRequest
): Promise<NextResponse | void> => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;
  const role = token?.role;

  // Jika user sudah login, jangan izinkan akses halaman login
  if (token && pathname === "/auth/login") {
    const path = role === "PHARMACIST" ? "/dashboard" : "/pos";

    return NextResponse.redirect(new URL(path, req.url));
  }

  // Jika belum login, arahkan ke halaman login jika mencoba akses dashboard atau pos
  if (
    (!token && pathname.startsWith("/dashboard")) ||
    pathname.startsWith("/pos")
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Proteksi akses berdasarkan role
  // PHARMACHIST
  if (pathname.startsWith("/dashboard") && role !== "PHARMACIST") {
    return NextResponse.redirect(new URL("/pos", req.url));
  }

  // CASHIER
  if (pathname.startsWith("/pos") && role !== "CASHIER") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
};

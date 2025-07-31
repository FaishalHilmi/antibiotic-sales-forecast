import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middleware/auth";
import { registerAcces } from "./middleware/registerAcces";

export const middleware = async (req: NextRequest) => {
  const authResult = await authMiddleware(req);
  if (authResult) return authResult;

  const registerRedirect = registerAcces(req);
  if (registerRedirect) return registerRedirect;

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pos/:path*",
    "/auth/login",
    "/auth/register",
  ],
};

import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile"];
const publicRoutes = ["/login", "/register"];

export default function proxy(req: NextRequest) {
  console.log("Proxy is running:", req.nextUrl.pathname);
  const path = req.nextUrl.pathname;

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  console.log("accessToken", accessToken, "refreshToken", refreshToken)

  const isProtected = protectedRoutes.includes(path);
  const isPublic = publicRoutes.includes(path);

  if (isProtected && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublic && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

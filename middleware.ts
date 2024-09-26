import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("infinityui_session_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (token) {
    const payload = await verifyToken(token);

    if (payload) {
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.next();
    } else {
      const response = NextResponse.next();
      response.cookies.delete("infinityui_session_token");
      return response;
    }
  } else {
    if (isProtectedRoute) {
      const url = new URL("/sign-in", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

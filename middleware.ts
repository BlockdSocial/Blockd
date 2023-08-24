import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
  // get cookie token
  const hasToken = req.cookies.get("token");

  console.log("req.nextUrl.pathname", req.nextUrl.pathname);
  // login & register routes
  if (["/landingPage"].includes(req.nextUrl.pathname)) {
    if (hasToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (["/"].includes(req.nextUrl.pathname)) {
    if (!hasToken) {
     
      // return NextResponse.redirect(new URL('/landingPage', req.url))
      return NextResponse.redirect(new URL("/landingPage", req.url));
    }
  }
  if (["/auth/signup", "/auth/signin"].includes(req.nextUrl.pathname)) {
    if (hasToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

import { NextResponse } from "next/server";

export function middleware(request) {
  const host = request.headers.get("host") || "";
  if (host === "www.kaiyun.si" || host.startsWith("www.kaiyun.si:")) {
    const dest = new URL(request.nextUrl.pathname + request.nextUrl.search, "https://kaiyun.si");
    return NextResponse.redirect(dest, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

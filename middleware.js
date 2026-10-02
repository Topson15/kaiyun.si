import { NextResponse } from "next/server";

export function middleware(request) {
  const host = request.headers.get("host") || "";
  if (host === "www.kaiyun.si" || host.startsWith("www.kaiyun.si:")) {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = "kaiyun.si";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

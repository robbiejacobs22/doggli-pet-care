import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Enforce one canonical host: redirect www.doggli.com → doggli.com (308).
 * Done here because Vercel/Next serves the prerendered root index directly and
 * can skip `vercel.json` redirects for the bare "/" path. (Next 16 "proxy" =
 * the renamed middleware convention.)
 */
export function proxy(req: NextRequest) {
  const host = req.headers.get("host");
  if (host === "www.doggli.com") {
    const url = req.nextUrl.clone();
    url.hostname = "doggli.com";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Everything except Next's build assets and the image optimizer.
  matcher: ["/((?!_next/static|_next/image).*)"],
};

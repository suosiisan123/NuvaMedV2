import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiter for Edge Runtime
const ipRequestCounts = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120; // 120 requests/min

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.expiresAt) {
    ipRequestCounts.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  record.count += 1;
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

  // 1. Rate Limiting Check on API Endpoints
  if (pathname.startsWith("/api/")) {
    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please retry after 60 seconds.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }
  }

  // 2. Sanitize against malicious Path Traversal & XSS / SQLi patterns
  const decodeSearch = decodeURIComponent(search.toLowerCase());
  if (
    decodeSearch.includes("<script>") ||
    decodeSearch.includes("javascript:") ||
    decodeSearch.includes("../") ||
    decodeSearch.includes("..\\") ||
    decodeSearch.includes("union select")
  ) {
    return new NextResponse(
      JSON.stringify({ error: "Bad Request", message: "Malicious input payload detected." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3. Add Correlation ID & Security Headers
  const response = NextResponse.next();
  const requestId = crypto.randomUUID();
  response.headers.set("x-request-id", requestId);
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("x-frame-options", "DENY");

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};

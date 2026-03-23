import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "db-photo-admin-secret-change-in-prod";
const ADMIN_USER = process.env.ADMIN_USER || "dhruv";

async function hmacSha256Hex(key: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    keyData,
    encoder.encode(data)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifySession(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const payload = atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"));
    const sig = parts[1];
    if (!payload.startsWith(`auth:${ADMIN_USER}:`)) return false;
    const expectedSig = await hmacSha256Hex(ADMIN_SESSION_SECRET, payload);
    return sig === expectedSig;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    const token = request.cookies.get("admin_session")?.value;
    if (token && (await verifySession(token))) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_session")?.value;
    if (!token || !(await verifySession(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

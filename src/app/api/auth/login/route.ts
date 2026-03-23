import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const ADMIN_USER = process.env.ADMIN_USER || "dhruv";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "dbphotography";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "db-photo-admin-secret-change-in-prod";

async function validateCredentials(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USER) return false;
  if (ADMIN_PASSWORD_HASH) {
    return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  }
  return password === ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "");

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const valid = await validateCredentials(username, password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const payload = `auth:${ADMIN_USER}:${Date.now()}`;
    const crypto = require("crypto");
    const sig = crypto.createHmac("sha256", ADMIN_SESSION_SECRET).update(payload).digest("hex");
    const token = Buffer.from(payload).toString("base64") + "." + sig;

    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

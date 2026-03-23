import { cookies } from "next/headers";

const ADMIN_USER = process.env.ADMIN_USER || "dhruv";
const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "db-photo-admin-secret-change-in-prod";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const payload = Buffer.from(parts[0], "base64").toString();
  const sig = parts[1];

  if (!payload.startsWith(`auth:${ADMIN_USER}:`)) return false;

  const crypto = await import("crypto");
  const expectedSig = crypto
    .createHmac("sha256", ADMIN_SESSION_SECRET)
    .update(payload)
    .digest("hex");

  return sig === expectedSig;
}

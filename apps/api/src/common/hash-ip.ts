import * as crypto from "crypto";

/** GDPR: raw IPs are never stored. The salt rotates monthly and lives in IP_HASH_SALT. */
export function hashIp(ip: string, salt: string): string {
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

/**
 * Railway terminates TLS at its edge, so the socket address is always the proxy.
 * The first entry of X-Forwarded-For is the original client.
 */
export function clientIp(headers: Record<string, unknown>, fallback: string): string {
  const forwarded = headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return fallback;
}

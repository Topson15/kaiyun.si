import crypto from "node:crypto";
import { append, limited, since, validSession } from "../../../lib/support-store";
import { pushVisitor, startPolling } from "../../../lib/telegram-bridge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const hits = new Map();

function secret() {
  return process.env.SUPPORT_SECRET || process.env.TELEGRAM_BOT_TOKEN || "kaiyun-support";
}

function sign(sessionId) {
  return crypto.createHmac("sha256", secret()).update(sessionId).digest("hex");
}

function cookies(req) {
  const out = {};
  for (const part of (req.headers.get("cookie") || "").split(";")) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function authed(req, sessionId) {
  const jar = cookies(req);
  return validSession(sessionId) && jar.ky_sid === sessionId && jar.ky_sig === sign(sessionId);
}

function allowed(req) {
  if (req.headers.get("sec-fetch-site") === "same-origin") return true;
  const origin = req.headers.get("origin");
  if (!origin) return false;
  let host = "";
  try {
    host = new URL(origin).host.toLowerCase();
  } catch {
    return false;
  }
  const self = (req.headers.get("host") || "").toLowerCase();
  return host === self || host === "kaiyun.si" || host === "www.kaiyun.si";
}

function ipOf(req) {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  return (forwarded.split(",")[0] || req.headers.get("x-real-ip") || "local").trim();
}

function tooMany(key, limit, windowMs) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (list.length >= limit) {
    hits.set(key, list);
    return true;
  }
  list.push(now);
  hits.set(key, list);
  return false;
}

function reply(body, status = 200, sessionId) {
  const headers = new Headers({
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store",
  });
  if (sessionId) {
    const base = "HttpOnly; Path=/; SameSite=Strict; Max-Age=2592000";
    headers.append("set-cookie", `ky_sid=${sessionId}; ${base}`);
    headers.append("set-cookie", `ky_sig=${sign(sessionId)}; ${base}`);
  }
  return Response.json(body, { status, headers });
}

export async function GET(req) {
  if (!allowed(req)) return reply({ ok: false }, 403);
  const ip = ipOf(req);
  if (tooMany(`get:${ip}`, 40, 60 * 1000)) return reply({ ok: false, error: "请求太频繁" }, 429);
  startPolling();
  const sessionId = new URL(req.url).searchParams.get("session") || "";
  if (!authed(req, sessionId)) return reply({ ok: false }, 401);
  const sinceId = new URL(req.url).searchParams.get("since");
  return reply({ ok: true, messages: since(sessionId, sinceId) });
}

export async function POST(req) {
  if (!allowed(req)) return reply({ ok: false }, 403);
  const ip = ipOf(req);
  const body = await req.json().catch(() => ({}));
  if (body.op === "open") {
    if (tooMany(`open:${ip}`, 20, 10 * 60 * 1000)) return reply({ ok: false, error: "请求太频繁" }, 429);
    const existing = cookies(req).ky_sid || "";
    if (authed(req, existing)) return reply({ ok: true, sessionId: existing });
    const sessionId = crypto.randomBytes(16).toString("hex");
    return reply({ ok: true, sessionId }, 200, sessionId);
  }
  startPolling();
  const sessionId = String(body.sessionId || "");
  const text = String(body.text || "");
  if (text.length > 1000) return reply({ ok: false, error: "内容太长" }, 400);
  if (!authed(req, sessionId)) return reply({ ok: false }, 401);
  if (limited(sessionId) || tooMany(`post:${ip}`, 20, 60 * 1000)) return reply({ ok: false, error: "发送太频繁，请稍后再试" }, 429);
  let message;
  try {
    message = append(sessionId, "visitor", text);
  } catch {
    return reply({ ok: false, error: "请输入内容" }, 400);
  }
  try {
    await pushVisitor(sessionId, message.text);
  } catch {
    return reply({ ok: true, message, notice: "消息已留下，客服暂时没有收到，请稍后再试。" });
  }
  return reply({ ok: true, message });
}

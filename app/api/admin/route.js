import crypto from "node:crypto";
import { deletePost, listPosts, savePost } from "../../../lib/news-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const hits = new Map();

function password() {
  return String(process.env.NEWS_ADMIN_PASSWORD || "");
}

function token() {
  return crypto.createHmac("sha256", password()).update("kaiyun-admin").digest("hex");
}

function authed(req) {
  if (!password()) return false;
  const raw = req.headers.get("cookie") || "";
  const found = raw.split(";").map((part) => part.trim()).find((part) => part.startsWith("ky_admin="));
  const value = found ? found.slice("ky_admin=".length) : "";
  const expected = token();
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function allowed(req) {
  if (req.headers.get("sec-fetch-site") === "same-origin") return true;
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const host = new URL(origin).host.toLowerCase();
    const self = (req.headers.get("host") || "").toLowerCase();
    return host === self || host === "kaiyun.si" || host === "www.kaiyun.si";
  } catch {
    return false;
  }
}

function tooMany(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (list.length >= 8) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
}

function reply(body, status = 200, cookie) {
  const headers = new Headers({ "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" });
  if (cookie) headers.append("set-cookie", cookie);
  return Response.json(body, { status, headers });
}

export async function GET(req) {
  if (!allowed(req) || !authed(req)) return reply({ ok: false }, 401);
  return reply({ ok: true, posts: listPosts() });
}

export async function POST(req) {
  if (!allowed(req)) return reply({ ok: false }, 403);
  const body = await req.json().catch(() => ({}));
  if (body.op === "login") {
    const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
    if (tooMany(ip)) return reply({ ok: false, error: "尝试太频繁" }, 429);
    if (!password()) return reply({ ok: false, error: "请先在 Railway 设置 NEWS_ADMIN_PASSWORD" }, 503);
    const given = Buffer.from(String(body.password || ""));
    const expected = Buffer.from(password());
    if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) {
      return reply({ ok: false, error: "密码不正确" }, 401);
    }
    return reply({ ok: true }, 200, `ky_admin=${token()}; HttpOnly; Path=/; SameSite=Strict; Max-Age=1209600`);
  }
  if (body.op === "logout") {
    return reply({ ok: true }, 200, "ky_admin=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0");
  }
  if (!authed(req)) return reply({ ok: false }, 401);
  try {
    if (body.op === "delete") {
      deletePost(String(body.id || ""));
      return reply({ ok: true, posts: listPosts() });
    }
    const post = savePost(body.post || {});
    return reply({ ok: true, post, posts: listPosts() });
  } catch (error) {
    return reply({ ok: false, error: error.message || "保存失败" }, 400);
  }
}

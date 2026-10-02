import crypto from "node:crypto";
import { saveMedia } from "../../../../lib/news-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const types = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };

function authed(req) {
  const password = String(process.env.NEWS_ADMIN_PASSWORD || "");
  if (!password) return false;
  const raw = req.headers.get("cookie") || "";
  const found = raw.split(";").map((part) => part.trim()).find((part) => part.startsWith("ky_admin="));
  if (!found) return false;
  const expected = crypto.createHmac("sha256", password).update("kaiyun-admin").digest("hex");
  const value = found.slice("ky_admin=".length);
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req) {
  if (req.headers.get("sec-fetch-site") && req.headers.get("sec-fetch-site") !== "same-origin") {
    return Response.json({ ok: false }, { status: 403 });
  }
  if (!authed(req)) return Response.json({ ok: false }, { status: 401 });
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || typeof file === "string") return Response.json({ ok: false, error: "请选择图片" }, { status: 400 });
  const ext = types[file.type];
  if (!ext) return Response.json({ ok: false, error: "只支持 JPG、PNG、WEBP、GIF" }, { status: 400 });
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > 2 * 1024 * 1024) return Response.json({ ok: false, error: "图片不能超过 2MB" }, { status: 400 });
  return Response.json({ ok: true, url: saveMedia(bytes, ext) });
}

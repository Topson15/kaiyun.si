import { getPost, recordView } from "../../../../lib/news-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cookies(req) {
  const out = {};
  for (const part of (req.headers.get("cookie") || "").split(";")) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const id = String(body.id || "");
  const post = /^[1-9]\d{0,5}$/.test(id) ? getPost(id) : null;
  if (!post) return Response.json({ error: "not found" }, { status: 404 });
  const current = Number(post.views) || 0;
  const ua = req.headers.get("user-agent") || "";
  if (/bot|spider|crawler|preview/i.test(ua)) return Response.json({ views: current });
  const seen = (cookies(req).ky_read || "").split(",").filter(Boolean);
  if (seen.includes(id)) return Response.json({ views: current });
  const views = recordView(id);
  const next = seen.slice(-39);
  next.push(id);
  return Response.json(
    { views },
    { headers: { "set-cookie": `ky_read=${next.join(",")}; Path=/; Max-Age=86400; SameSite=Lax; Secure` } },
  );
}

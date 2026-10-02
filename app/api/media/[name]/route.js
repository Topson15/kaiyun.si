import fs from "node:fs";
import { mediaFile } from "../../../../lib/news-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const mime = { jpg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };

export async function GET(_req, { params }) {
  const { name } = await params;
  const target = mediaFile(name);
  if (!target) return new Response("Not found", { status: 404 });
  const ext = name.split(".").pop();
  return new Response(fs.readFileSync(target), {
    headers: { "content-type": mime[ext] || "application/octet-stream", "cache-control": "public, max-age=86400" },
  });
}

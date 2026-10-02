import fs from "node:fs";
import path from "node:path";

const seed = path.join(process.cwd(), "data", "posts.json");

function file() {
  const mount = process.env.RAILWAY_VOLUME_MOUNT_PATH;
  return mount ? path.join(mount, "posts.json") : seed;
}

function read() {
  const target = file();
  try {
    if (!fs.existsSync(target) && target !== seed && fs.existsSync(seed)) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(seed, target);
    }
    const data = JSON.parse(fs.readFileSync(target, "utf8"));
    return Array.isArray(data.posts) ? data.posts : [];
  } catch {
    return [];
  }
}

function write(posts) {
  const target = file();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify({ posts }, null, 2));
}

export function mediaDir() {
  return path.join(path.dirname(file()), "uploads");
}

export function saveMedia(bytes, ext) {
  const name = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const dir = mediaDir();
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), bytes);
  return `/api/media/${name}`;
}

export function mediaFile(name) {
  if (!/^[a-z0-9]+\.(jpg|png|webp|gif)$/.test(name)) return "";
  const target = path.join(mediaDir(), name);
  return target.startsWith(mediaDir()) && fs.existsSync(target) ? target : "";
}

export function safeImage(url) {
  const value = String(url || "").trim();
  if (/^\/api\/media\/[a-z0-9]+\.(jpg|png|webp|gif)$/.test(value)) return value;
  if (/^https:\/\/\S+$/.test(value)) return value;
  return "";
}

export function listPosts() {
  return read().sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

export function getPost(id) {
  return read().find((post) => post.id === id) || null;
}

export function savePost(input) {
  const posts = read();
  const title = String(input.title || "").trim().slice(0, 80);
  const excerpt = String(input.excerpt || "").trim().slice(0, 180);
  const body = String(input.body || "").trim().slice(0, 20000);
  const category = input.category === "招商活动" ? "招商活动" : "新闻资讯";
  const publishedAt = Number.isNaN(Date.parse(input.publishedAt)) ? new Date().toISOString() : new Date(input.publishedAt).toISOString();
  if (!title || !body) throw new Error("标题和正文不能为空");
  let id = String(input.id || "").trim().toLowerCase();
  if (!/^[a-z0-9-]{2,40}$/.test(id)) id = `n${Date.now().toString(36)}`;
  const cover = safeImage(input.cover);
  const next = { id, title, excerpt: excerpt || body.slice(0, 72), body, category, publishedAt, cover };
  const index = posts.findIndex((post) => post.id === id);
  if (index >= 0) posts[index] = next;
  else posts.push(next);
  write(posts);
  return next;
}

export function deletePost(id) {
  write(read().filter((post) => post.id !== id));
}

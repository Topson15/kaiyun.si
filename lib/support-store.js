import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), ".support-data.json");
const hits = new Map();
let seq = Date.now();
let db = { sessions: {} };

try {
  db = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!db.sessions) db.sessions = {};
} catch {
  db = { sessions: {} };
}

function save() {
  try {
    fs.writeFileSync(file, JSON.stringify(db));
  } catch {
    /* Railway 磁盘偶发不可写时，内存里的会话仍然有效 */
  }
}

export function validSession(id) {
  return /^[a-f0-9]{8,32}$/i.test(String(id || ""));
}

export function limited(sessionId) {
  const now = Date.now();
  const recent = (hits.get(sessionId) || []).filter((t) => now - t < 30000);
  if (recent.length >= 8) return true;
  recent.push(now);
  hits.set(sessionId, recent);
  return false;
}

export function append(sessionId, from, text) {
  const clean = String(text || "").replace(/\s+/g, " ").trim().slice(0, 1000);
  if (!validSession(sessionId) || !clean) {
    const error = new Error("bad message");
    throw error;
  }
  const list = db.sessions[sessionId] || (db.sessions[sessionId] = []);
  const msg = { id: ++seq, from, text: clean, ts: Date.now() };
  list.push(msg);
  if (list.length > 200) list.splice(0, list.length - 200);
  save();
  return msg;
}

export function since(sessionId, after) {
  if (!validSession(sessionId)) return [];
  const n = Number(after) || 0;
  return (db.sessions[sessionId] || []).filter((m) => m.id > n);
}

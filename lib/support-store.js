import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), ".support-data.json");

export const DEFAULT_GREETING = [
  "您好，开云体育祝您财源广进，事事顺利！",
  "您可以在此处发消息咨询客服，也可以添加客服联系方式：",
  "Telegram @a8802717 https://t.me/a8802717",
  "QQ：946901189 https://wpa.qq.com/msgrd?v=3&uin=946901189&site=qq&menu=yes",
  "点击加入开云体育交流群 https://t.me/jinliqun",
].join("\n");

function state() {
  if (!globalThis.__kySupport) {
    const fresh = { db: { sessions: {}, offset: 0 }, seq: Date.now(), hits: new Map() };
    try {
      const saved = JSON.parse(fs.readFileSync(file, "utf8"));
      if (saved.sessions) fresh.db = { offset: saved.offset || 0, sessions: saved.sessions, greeting: saved.greeting || "" };
    } catch {
      /* 第一次启动还没有记录 */
    }
    globalThis.__kySupport = fresh;
  }
  return globalThis.__kySupport;
}

function save() {
  try {
    fs.writeFileSync(file, JSON.stringify(state().db));
  } catch {
    /* 磁盘不可写时仍使用内存 */
  }
}

export function validSession(id) {
  return /^[a-f0-9]{8,32}$/i.test(String(id || ""));
}

export function limited(sessionId) {
  const box = state();
  const now = Date.now();
  const recent = (box.hits.get(sessionId) || []).filter((t) => now - t < 30000);
  if (recent.length >= 8) return true;
  recent.push(now);
  box.hits.set(sessionId, recent);
  return false;
}

export function append(sessionId, from, text) {
  const clean = redact(String(text || "").replace(/\s+/g, " ").trim().slice(0, 1000));
  if (!validSession(sessionId) || !clean) throw new Error("bad message");
  const box = state();
  const list = box.db.sessions[sessionId] || (box.db.sessions[sessionId] = []);
  const msg = { id: ++box.seq, from, text: clean, ts: Date.now() };
  list.push(msg);
  if (list.length > 200) list.splice(0, list.length - 200);
  save();
  return msg;
}

export function hasSession(sessionId) {
  return validSession(sessionId) && Array.isArray(state().db.sessions[sessionId]);
}

function redact(text) {
  return text
    .replace(/\b\d{6,}:[A-Za-z0-9_-]{20,}\b/g, "[已隐藏]")
    .replace(/\b(?:TELEGRAM_BOT_TOKEN|TELEGRAM_CHAT_ID|SUPPORT_SECRET)\b\s*[:=]\s*\S+/gi, "[已隐藏]")
    .replace(/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, "[已隐藏]");
}

export function since(sessionId, after) {
  if (!validSession(sessionId)) return [];
  const n = Number(after) || 0;
  return (state().db.sessions[sessionId] || []).filter((m) => m.id > n);
}

export function recentSessions(withinMs = 6 * 60 * 60 * 1000) {
  const now = Date.now();
  return Object.entries(state().db.sessions)
    .filter(([, list]) => list.some((m) => m.from === "visitor" && now - m.ts < withinMs))
    .map(([id, list]) => ({ id, ts: list[list.length - 1].ts }))
    .sort((a, b) => b.ts - a.ts);
}

export function getGreeting() {
  const text = state().db.greeting;
  return typeof text === "string" && text.trim() ? text : DEFAULT_GREETING;
}

export function setGreeting(text) {
  const clean = String(text || "").replace(/\r\n/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, 1200);
  if (clean.length < 2) throw new Error("empty greeting");
  state().db.greeting = clean;
  save();
  return clean;
}

export function resetGreeting() {
  delete state().db.greeting;
  save();
  return DEFAULT_GREETING;
}

export function getOffset() {
  return state().db.offset || 0;
}

export function setOffset(offset) {
  state().db.offset = offset;
  save();
}

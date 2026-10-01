import { append } from "./support-store";

const token = process.env.TELEGRAM_BOT_TOKEN || "";
const chatId = String(process.env.TELEGRAM_CHAT_ID || "");

export function configured() {
  return Boolean(token && chatId);
}

async function api(method, body) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  return res.json();
}

function sessionFrom(text) {
  const found = String(text || "").match(/#([a-f0-9]{8,32})/i);
  return found ? found[1] : "";
}

export async function pushVisitor(sessionId, text) {
  const res = await api("sendMessage", {
    chat_id: chatId,
    text: `新咨询 #${sessionId}\n${text}\n\n直接回复这条消息，只会发给这个访客。`,
  });
  if (!res.ok) throw new Error(res.description || "telegram send failed");
  return res;
}

async function handle(update) {
  const msg = update.message;
  if (!msg || String(msg.chat?.id) !== chatId) return;
  const text = String(msg.text || "").trim();
  if (!text) return;

  if (text === "/start" || text === "/help") {
    await api("sendMessage", {
      chat_id: chatId,
      text: "客服机器人已就绪。\n访客留言会发到这里。请直接回复某一条咨询，回复只会送到那一个访客，多人同时咨询不会串线。\n也可以发送：/reply 会话号 回复内容",
    });
    return;
  }

  const command = text.match(/^\/reply\s+([a-f0-9]{8,32})\s+([\s\S]+)/i);
  if (command) {
    append(command[1], "agent", command[2]);
    await api("sendMessage", { chat_id: chatId, text: `已发给 #${command[1]}` });
    return;
  }

  const session = sessionFrom(msg.reply_to_message?.text);
  if (!session) {
    await api("sendMessage", {
      chat_id: chatId,
      reply_to_message_id: msg.message_id,
      text: "请直接回复某一条访客消息，这样才会送到对应的人，不会和别人串线。",
    });
    return;
  }

  append(session, "agent", text);
}

export function startPolling() {
  if (!configured() || globalThis.__kySupportPoll) return;
  globalThis.__kySupportPoll = true;
  void loop();
}

async function loop() {
  await api("deleteWebhook");
  let offset = 0;
  for (;;) {
    try {
      const res = await api("getUpdates", { timeout: 25, offset, allowed_updates: ["message"] });
      for (const update of res.result || []) {
        offset = update.update_id + 1;
        await handle(update);
      }
      if (res.ok === false) await new Promise((r) => setTimeout(r, 3000));
    } catch {
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

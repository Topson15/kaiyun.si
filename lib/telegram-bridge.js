import { append, getGreeting, getOffset, hasSession, recentSessions, resetGreeting, setGreeting, setOffset } from "./support-store";

function readChatId() {
  const found = String(process.env.TELEGRAM_CHAT_ID || "").match(/-?\d{5,}/);
  return found ? found[0] : "";
}

const token = String(process.env.TELEGRAM_BOT_TOKEN || "").trim();
const chatId = readChatId();

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
  return found ? found[1].toLowerCase() : "";
}

export async function pushVisitor(sessionId, text) {
  const res = await api("sendMessage", {
    chat_id: chatId,
    text: `新咨询#${sessionId}\n\n${text}`,
  });
  if (!res.ok) throw new Error(res.description || "telegram send failed");
  return res;
}

async function deliver(session, text) {
  if (!hasSession(session)) {
    await api("sendMessage", { chat_id: chatId, text: "这个会话不存在，没有发给网页。" });
    return;
  }
  append(session, "agent", text);
  await api("sendMessage", { chat_id: chatId, text: `已发到网页 #${session}` });
}

async function handle(update) {
  const msg = update.message;
  if (!msg || String(msg.chat?.id) !== chatId) return;
  if (msg.from?.is_bot) return;
  const text = String(msg.text || "").trim();
  if (!text) return;

  if (text === "/start" || text === "/help") {
    await api("sendMessage", {
      chat_id: chatId,
      text: "客服机器人已就绪。\n只有一个访客时，直接打字就会发到他的网页。\n同时有多个人时，点对应那条咨询的“回复”再打字，这样不会串线。\n也可以发送：/reply 会话号 回复内容\n\n改网页上的第一条预留消息：\n/welcome\n新的消息\n一行里写成「显示文字 空格 网址」，网址会变成可点击链接。\n只查看当前内容：/welcome\n恢复原来那条：/resetwelcome",
    });
    return;
  }

  if (/^\/resetwelcome(?:@\w+)?$/i.test(text)) {
    const next = resetGreeting();
    await api("sendMessage", { chat_id: chatId, text: `已恢复原来的第一条消息。\n\n${next}` });
    return;
  }

  const welcome = text.match(/^\/welcome(?:@\w+)?(?:\s+([\s\S]+))?$/i);
  if (welcome) {
    const nextText = (welcome[1] || "").trim();
    if (!nextText) {
      await api("sendMessage", { chat_id: chatId, text: `当前第一条消息：\n\n${getGreeting()}\n\n要修改就发送：\n/welcome\n新的消息内容` });
      return;
    }
    try {
      const next = setGreeting(nextText);
      await api("sendMessage", { chat_id: chatId, text: `已更新。打开网页的人会看到：\n\n${next}` });
    } catch {
      await api("sendMessage", { chat_id: chatId, text: "内容太短，没有改。" });
    }
    return;
  }

  const command = text.match(/^\/reply\s+#?([a-f0-9]{8,32})\s+([\s\S]+)/i);
  if (command) {
    await deliver(command[1].toLowerCase(), command[2]);
    return;
  }

  const replied = sessionFrom(msg.reply_to_message?.text);
  if (replied) {
    await deliver(replied, text);
    return;
  }

  const recent = recentSessions();
  if (recent.length === 1) {
    await deliver(recent[0].id, text);
    return;
  }

  await api("sendMessage", {
    chat_id: chatId,
    reply_to_message_id: msg.message_id,
    text: recent.length
      ? "现在有多个人在咨询。请点其中一条访客消息，选“回复”，再输入内容。"
      : "还没有访客留言，或留言已超过 6 小时。请先让对方在网页上发送一句。",
  });
}

export function startPolling() {
  if (!configured() || globalThis.__kySupportPoll) return;
  globalThis.__kySupportPoll = true;
  void loop();
}

async function loop() {
  await api("deleteWebhook");
  let offset = getOffset();
  for (;;) {
    try {
      const res = await api("getUpdates", { timeout: 25, offset, allowed_updates: ["message"] });
      for (const update of res.result || []) {
        offset = update.update_id + 1;
        setOffset(offset);
        await handle(update);
      }
      if (res.ok === false) await new Promise((r) => setTimeout(r, 3000));
    } catch {
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

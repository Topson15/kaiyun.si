import { append, limited, since, validSession } from "../../../lib/support-store";
import { configured, pushVisitor, startPolling } from "../../../lib/telegram-bridge";

export const dynamic = "force-dynamic";

export async function GET(req) {
  startPolling();
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session") || "";
  if (!validSession(sessionId)) return Response.json({ ok: false }, { status: 400 });
  return Response.json({ ok: true, configured: configured(), messages: since(sessionId, searchParams.get("since")) });
}

export async function POST(req) {
  startPolling();
  const body = await req.json().catch(() => ({}));
  const sessionId = String(body.sessionId || "");
  const text = String(body.text || "");
  if (!validSession(sessionId)) return Response.json({ ok: false, error: "会话无效" }, { status: 400 });
  if (limited(sessionId)) return Response.json({ ok: false, error: "发送太频繁，请稍后再试" }, { status: 429 });
  let message;
  try {
    message = append(sessionId, "visitor", text);
  } catch {
    return Response.json({ ok: false, error: "请输入内容" }, { status: 400 });
  }
  if (!configured()) {
    return Response.json({ ok: true, configured: false, message, notice: "客服通道还没配置。请在 Railway 填写 TELEGRAM_BOT_TOKEN 和 TELEGRAM_CHAT_ID。" });
  }
  try {
    await pushVisitor(sessionId, message.text);
  } catch {
    return Response.json({ ok: true, configured: true, message, notice: "消息已留下，但发到 Telegram 失败，请检查机器人配置。" });
  }
  return Response.json({ ok: true, configured: true, message });
}

import { append, limited, since, validSession } from "../../../lib/support-store";
import { configured, pushVisitor, startPolling } from "../../../lib/telegram-bridge";

export const dynamic = "force-dynamic";

function reply(body, status = 200) {
  return Response.json(body, { status, headers: { "X-Robots-Tag": "noindex, nofollow" } });
}

export async function GET(req) {
  startPolling();
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session") || "";
  if (!validSession(sessionId)) return reply({ ok: false }, 400);
  return reply({ ok: true, configured: configured(), messages: since(sessionId, searchParams.get("since")) });
}

export async function POST(req) {
  startPolling();
  const body = await req.json().catch(() => ({}));
  const sessionId = String(body.sessionId || "");
  const text = String(body.text || "");
  if (!validSession(sessionId)) return reply({ ok: false, error: "会话无效" }, 400);
  if (limited(sessionId)) return reply({ ok: false, error: "发送太频繁，请稍后再试" }, 429);
  let message;
  try {
    message = append(sessionId, "visitor", text);
  } catch {
    return reply({ ok: false, error: "请输入内容" }, 400);
  }
  if (!configured()) {
    return reply({ ok: true, configured: false, message, notice: "客服通道还没配置。请在 Railway 填写 TELEGRAM_BOT_TOKEN 和 TELEGRAM_CHAT_ID。" });
  }
  try {
    await pushVisitor(sessionId, message.text);
  } catch {
    return reply({ ok: true, configured: true, message, notice: "消息已留下，但发到 Telegram 失败，请检查机器人配置。" });
  }
  return reply({ ok: true, configured: true, message });
}

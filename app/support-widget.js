"use client";
import { useEffect, useRef, useState } from "react";

function sessionId() {
  const key = "ky_support_sid";
  let id = "";
  try {
    id = localStorage.getItem(key) || "";
  } catch {
    id = "";
  }
  if (!/^[a-f0-9]{8,32}$/i.test(id)) {
    id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
    try {
      localStorage.setItem(key, id);
    } catch {
      /* 隐私模式也能继续聊，只是刷新后换成新会话 */
    }
  }
  return id;
}

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [unread, setUnread] = useState(0);
  const [sending, setSending] = useState(false);
  const sid = useRef("");
  const since = useRef(0);
  const openRef = useRef(false);
  const logRef = useRef(null);

  useEffect(() => {
    sid.current = sessionId();
    let stop = false;
    const tick = async () => {
      if (!sid.current) return;
      try {
        const res = await fetch(`/api/support?session=${sid.current}&since=${since.current}`, { cache: "no-store" });
        const data = await res.json();
        const incoming = data.messages || [];
        if (!incoming.length) return;
        since.current = incoming[incoming.length - 1].id;
        setMsgs((list) => {
          const next = [...list];
          for (const msg of incoming) {
            const pending = next.findIndex((item) => String(item.id).startsWith("local-") && item.text === msg.text && item.from === msg.from);
            if (pending >= 0) next.splice(pending, 1);
            if (!next.some((item) => item.id === msg.id)) next.push(msg);
          }
          return next;
        });
        const replies = incoming.filter((m) => m.from === "agent").length;
        if (replies && !openRef.current) setUnread((n) => n + replies);
      } catch {
        /* 预览或网络断开时保持窗口可用 */
      }
    };
    tick();
    const timer = setInterval(() => {
      if (!stop) tick();
    }, 3000);
    return () => {
      stop = true;
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    openRef.current = open;
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [msgs, open]);

  async function send(event) {
    event.preventDefault();
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    setText("");
    const mine = { id: `local-${Date.now()}`, from: "visitor", text: value };
    setMsgs((list) => [...list, mine]);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: sid.current, text: value }),
      });
      const data = await res.json();
      if (data.message?.id) since.current = Math.max(since.current, data.message.id);
      if (data.notice) setMsgs((list) => [...list, { id: `sys-${Date.now()}`, from: "sys", text: data.notice }]);
      if (data.error) setMsgs((list) => [...list, { id: `sys-${Date.now()}`, from: "sys", text: data.error }]);
    } catch {
      setMsgs((list) => [...list, { id: `sys-${Date.now()}`, from: "sys", text: "网络异常，请稍后再试。" }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="csDock">
      {open && (
        <section className="csPanel" aria-label="在线客服">
          <header className="csHead">
            <b>在线客服</b>
            <span>留言后会在这里收到回复</span>
          </header>
          <div className="csLog" ref={logRef}>
            {msgs.length === 0 && <p className="csMsg sys">有问题直接留言，客服会在这个窗口回复你。</p>}
            {msgs.map((m) => (
              <p className={`csMsg ${m.from}`} key={m.id}>{m.text}</p>
            ))}
          </div>
          <form className="csForm" onSubmit={send}>
            <input value={text} maxLength={1000} placeholder="输入内容…" onChange={(e) => setText(e.target.value)} />
            <button type="submit" disabled={sending}>发送</button>
          </form>
        </section>
      )}
      <button className="csFab" type="button" aria-label="打开客服" onClick={() => setOpen((v) => !v)}>
        {open ? "×" : "客服"}
        {unread > 0 && !open && <i>{unread}</i>}
      </button>
    </div>
  );
}

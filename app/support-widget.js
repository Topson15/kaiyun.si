"use client";
import { useEffect, useRef, useState } from "react";

function playDing() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const tone = (freq, start, dur) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + dur);
  };
  const start = ctx.currentTime + 0.02;
  tone(784, start, 0.16);
  tone(1046, start + 0.14, 0.28);
  ctx.resume().catch(() => {});
  if (ctx.state === "suspended") {
    const unlock = () => {
      ctx.resume().catch(() => {});
      window.removeEventListener("pointerdown", unlock);
    };
    window.addEventListener("pointerdown", unlock);
  }
}

function Welcome() {
  return (
    <>
      <p>您好，开云体育祝您财源广进，事事顺利！</p>
      <p>您可以在此处发消息咨询客服，也可以添加客服联系方式：</p>
      <p><a href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">Telegram @a8802717</a></p>
      <p><a href="https://wpa.qq.com/msgrd?v=3&uin=946901189&site=qq&menu=yes" target="_blank" rel="noopener noreferrer">QQ：946901189</a></p>
    </>
  );
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
    try {
      if (sessionStorage.getItem("ky_support_ding")) return;
      sessionStorage.setItem("ky_support_ding", "1");
    } catch {
      /* 隐私模式仍播放一次 */
    }
    playDing();
  }, []);

  useEffect(() => {
    let stop = false;
    let timer = 0;
    let fails = 0;
    const tick = async () => {
      if (stop || !sid.current) return;
      try {
        const res = await fetch(`/api/support?session=${sid.current}&since=${since.current}`, { cache: "no-store", credentials: "same-origin" });
        if (!res.ok) {
          fails += 1;
          if (fails >= 3) window.clearInterval(timer);
          return;
        }
        fails = 0;
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
        /* 网络断开时保持窗口可用 */
      }
    };
    (async () => {
      try {
        const res = await fetch("/api/support", {
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ op: "open" }),
        });
        const data = await res.json();
        if (!data.sessionId || stop) return;
        sid.current = data.sessionId;
      } catch {
        return;
      }
      tick();
      timer = window.setInterval(tick, 3000);
    })();
    return () => {
      stop = true;
      window.clearInterval(timer);
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
        credentials: "same-origin",
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
    <div className={open ? "csDock is-open" : "csDock"}>
      {open && (
        <section className="csPanel" aria-label="在线客服">
          <header className="csHead">
            <b>在线客服</b>
            <span>留言后会在这里收到回复</span>
          </header>
          <div className="csLog" ref={logRef}>
            <div className="csMsg agent"><Welcome /></div>
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
        {open ? <span className="csClose">×</span> : <span className="csMark"><img src="/brand/mark.webp" alt="" /><b>客服</b></span>}
        {unread > 0 && !open && <i>{unread}</i>}
      </button>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function IntroGate() {
  const [phase, setPhase] = useState("in");

  const leave = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      window.scrollTo(0, 0);
      return;
    }
    setPhase((p) => (p === "in" ? "out" : p));
  };

  useEffect(() => {
    if (phase !== "out") return;
    const t = window.setTimeout(() => {
      setPhase("done");
      window.scrollTo(0, 0);
    }, 760);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (phase !== "in") return () => {
      document.body.style.overflow = prev;
    };
    let touchY = 0;
    const onWheel = (e) => {
      if (e.deltaY <= 0) return;
      e.preventDefault();
      leave();
    };
    const onTouchStart = (e) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      const y = e.touches[0]?.clientY ?? touchY;
      if (touchY - y > 28) {
        e.preventDefault();
        leave();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <section className={phase === "out" ? "hero heroIntro introGate is-leaving" : "hero heroIntro introGate"} aria-label="开云体育">
      <div className="logoDrop">
        <img className="logoDropImg" src="/intro/logo-base.webp?v=4" width="848" height="256" alt="开云体育 kaiyun.si" />
        <span className="logoBallFly">
          <img className="logoBall" src="/intro/logo-ball.webp" width="135" height="133" alt="" />
        </span>
      </div>
      <p className="logoDropTitle">开云体育官方代理合作</p>
      <div className="actions logoDropActions">
        <a className="btn" href="http://4003y.com" target="_blank" rel="sponsored noopener noreferrer">开云体育注册</a>
        <a className="heroSecondBtn" href="https://t.me/a8802717" target="_blank" rel="noopener noreferrer">了解代理合作</a>
      </div>
      <button className="introMore" type="button" onClick={leave}>
        <span>查看详情</span>
        <i />
      </button>
    </section>
  );
}

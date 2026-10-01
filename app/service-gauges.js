"use client";
import { useEffect, useRef, useState } from "react";

const gauges = [
  ["CURRENT SPEED", 60, "秒", "平均存款时间", "AVERAGE TIME OF DEPOSIT"],
  ["TOTALLY AMOUNT", 80, "家", "合作支付平台", "PAYMENT PLATFORM PARTNERS"],
  ["CURRENT SPEED", 90, "秒", "平均取款时间", "AVERAGE TIME OF WITHDRAW"],
  ["TOTALLY AMOUNT", 35, "家", "合作游戏平台", "GAMING PROVIDER PARTNERS"],
];

export default function ServiceGauges() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [vals, setVals] = useState([0, 0, 0, 0]);
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setOn(true);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!on) return;
    const targets = gauges.map((item) => item[1]);
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const ease = (t) => {
      const c1 = 1.35;
      const c3 = c1 + 1;
      return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
    };
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = Math.max(0, ease(t));
      setVals(targets.map((n) => Math.round(n * e)));
      setSweep(Math.min(270, 246 * e));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setVals(targets);
        setSweep(246);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  return (
    <ul className="svcStats" ref={ref}>
      {gauges.map(([kicker, , unit, title, en], i) => (
        <li key={title}>
          <div className="svcRing">
            <i className="svcTicks"></i>
            <i className="svcArc" style={{ "--sweep": `${sweep}deg` }}></i>
            <div>
              <p>{kicker}</p>
              <b>{vals[i]}</b>
              <span>{unit}</span>
            </div>
          </div>
          <h3>{title}</h3>
          <small>{en}</small>
        </li>
      ))}
    </ul>
  );
}

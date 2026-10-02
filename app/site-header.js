"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  ["/", "开云体育首页"],
  ["/cooperation", "开云APP下载"],
  ["/commission", "开云代理招商"],
  ["/faq", "开云常见问题"],
  ["/news", "开云新闻资讯"],
];

export default function SiteHeader() {
  const barRef = useRef(null);
  const barH = useRef(92);
  const [stuck, setStuck] = useState(false);
  const path = usePathname();

  useEffect(() => {
    let on = false;
    const onScroll = () => {
      const y = window.scrollY;
      const limit = (barRef.current?.offsetHeight ?? barH.current) + 100;
      const next = on ? y > 2 : y > limit;
      if (next !== on) {
        if (next) barH.current = barRef.current?.offsetHeight ?? barH.current;
        on = next;
        setStuck(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={stuck ? "is-stuck" : undefined} style={stuck ? { height: barH.current } : undefined}>
      <div className="nav" ref={barRef}>
        <a className="brand" href="/" aria-label="KAIYUN.SI">
          <img src="/logo.png" alt="开云体育 kaiyun.si" style={{ height: 58, width: "auto", display: "block" }} />
        </a>
        <nav>
          {links.map(([href, label]) => (
            <a key={href} href={href} className={path === href ? "is-on" : undefined}>{label}</a>
          ))}
        </nav>
        <div className="navActions">
          <a className="registerBtn" href="http://5257y.com/" target="_blank" rel="noopener noreferrer">立即注册</a>
          <a className="serviceBtn" href="https://t.me/caijin101" target="_blank" rel="noopener noreferrer">彩金客服</a>
        </div>
      </div>
    </header>
  );
}

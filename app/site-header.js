"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  ["/", "开云体育首页"],
  ["/cooperation", "开云APP下载"],
  ["/commission", "开云代理招商"],
  ["/faq", "开云代理常见问题"],
  ["/news", "开云新闻资讯"],
];

export default function SiteHeader() {
  const barRef = useRef(null);
  const barH = useRef(92);
  const [stuck, setStuck] = useState(false);
  const [menu, setMenu] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setMenu(false);
  }, [path]);

  useEffect(() => {
    let on = false;
    const limit = (barRef.current?.offsetHeight ?? 92) + 100;
    const onScroll = () => {
      const y = window.scrollY;
      const next = on ? y > 2 : y > limit;
      if (next !== on) {
        on = next;
        setStuck(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={[stuck ? "is-stuck" : "", menu ? "is-menu" : ""].filter(Boolean).join(" ") || undefined} style={stuck ? { height: barH.current } : undefined}>
      <div className="nav" ref={barRef}>
        <a className="brand" href="/" aria-label="KAIYUN.SI">
          <img decoding="async" fetchPriority="low" width="360" height="109" src="/brand/logo.webp" alt="开云体育 kaiyun.si" style={{ height: 58, width: "auto", display: "block" }} />
        </a>
        <nav>
          {links.map(([href, label]) => (
            <a key={href} href={href} className={path === href ? "is-on" : undefined}>{label}</a>
          ))}
        </nav>
        <div className="navActions">
          <a className="registerBtn" href="http://4003y.com" target="_blank" rel="sponsored noopener noreferrer">立即注册</a>
          <a className="serviceBtn" href="https://t.me/caijin101" target="_blank" rel="noopener noreferrer">彩金客服</a>
          <button className={menu ? "menuBtn is-open" : "menuBtn"} type="button" aria-label={menu ? "关闭菜单" : "打开菜单"} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function back() {
  try {
    const ref = document.referrer;
    if (ref && new URL(ref).host === window.location.host) {
      window.history.back();
      return;
    }
  } catch {
    /* 直接打开时回到新闻列表 */
  }
  window.location.href = "/news";
}

export default function ArticleView({ category, title, label, cover, body }) {
  const [shot, setShot] = useState(null);
  const blocks = String(body || "").split(/\n{2,}/);

  useEffect(() => {
    if (!shot) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setShot(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [shot]);

  return (
    <div className="wrap narrow">
      <button className="articleBack" type="button" onClick={back}>返回上一级</button>
      <p className="eyebrow blue">{category}</p>
      <h1>{title}</h1>
      <p className="newsMeta">{label}</p>
      {cover && <img loading="lazy" decoding="async" className="newsHero" src={cover} alt={title} />}
      {blocks.map((paragraph) => {
        const image = paragraph.trim().match(/^!\[([^\]]*)\]\((\/api\/media\/[a-z0-9]+\.(?:jpg|png|webp|gif)|https:\/\/\S+)\)$/);
        if (image) {
          const src = image[2];
          const alt = image[1] || "文内配图";
          return (
            <button className="newsShot" type="button" key={src} onClick={() => setShot({ src, alt })}>
              <img loading="lazy" decoding="async" className="newsInline" src={src} alt={alt} />
            </button>
          );
        }
        return <p key={paragraph.slice(0, 24)}>{paragraph}</p>;
      })}
      <Link className="more" href="/news">返回开云新闻资讯</Link>
      {shot && (
        <div className="newsZoom" role="dialog" aria-modal="true" aria-label={shot.alt} onClick={() => setShot(null)}>
          <img src={shot.src} alt={shot.alt} />
        </div>
      )}
    </div>
  );
}

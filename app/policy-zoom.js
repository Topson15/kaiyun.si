"use client";
import { useState } from "react";

const slides = [
  { src: "/policy/sheet.webp", alt: "开云体育佣金政策" },
  { src: "/policy/venues.webp", alt: "开云体育游戏场馆" },
  { src: "/policy/brands.webp", alt: "开云体育集团旗下品牌" },
];

function Arrow({ dir, onClick }) {
  return (
    <button type="button" className={`policyNav ${dir}`} aria-label={dir === "prev" ? "上一张" : "下一张"} onClick={onClick}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={dir === "prev" ? "M14.5 5 L8 12 L14.5 19" : "M9.5 5 L16 12 L9.5 19"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function offset(i, index) {
  const n = slides.length;
  let d = i - index;
  d = ((d % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

export default function PolicyZoom({ label }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [open, setOpen] = useState(false);
  const slide = slides[index];
  const step = (direction) => (event) => {
    event.stopPropagation();
    setDir(direction);
    setIndex((i) => (i + direction + slides.length) % slides.length);
  };

  return (
    <div className="policyZoom">
      <div className="policyFrame">
        {slides.map((item, i) => (
          <button key={item.src} type="button" className="policyShotBtn" style={{ transform: `translateX(${offset(i, index) * 100}%)`, zIndex: i === index ? 1 : 0 }} onClick={() => setOpen(true)} aria-label="放大查看" tabIndex={i === index ? 0 : -1}>
            <img loading="lazy" decoding="async" width="860" height="678" className="policyShot" src={item.src} alt={item.alt} />
          </button>
        ))}
        <Arrow dir="prev" onClick={step(-1)} />
        <Arrow dir="next" onClick={step(1)} />
      </div>
      {label ? <p className="policyCaption">{label}</p> : null}
      <p className="policyHint">点击图片可放大查看</p>
      {open && (
        <div className="policyLight" onClick={() => setOpen(false)}>
          <Arrow dir="prev" onClick={step(-1)} />
          <div className="policyStage"><img key={slide.src} className={dir > 0 ? "from-next" : "from-prev"} loading="lazy" decoding="async" width="860" height="678" src={slide.src} alt={slide.alt} /></div>
          <Arrow dir="next" onClick={step(1)} />
        </div>
      )}
    </div>
  );
}

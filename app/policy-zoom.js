"use client";
import { useState } from "react";

const slides = [
  { src: "/policy/sheet.webp", alt: "开云体育佣金政策" },
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

export default function PolicyZoom({ label }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const slide = slides[index];
  const step = (dir) => (event) => {
    event.stopPropagation();
    setIndex((i) => (i + dir + slides.length) % slides.length);
  };

  return (
    <div className="policyZoom">
      <div className="policyFrame">
        <Arrow dir="prev" onClick={step(-1)} />
        <button type="button" className="policyShotBtn" onClick={() => setOpen(true)} aria-label="放大查看开云体育佣金政策">
          <img loading="lazy" decoding="async" width="860" height="678" className="policyShot" src={slide.src} alt={slide.alt} />
        </button>
        <Arrow dir="next" onClick={step(1)} />
      </div>
      {label ? <p className="policyCaption">{label}</p> : null}
      <p className="policyHint">点击图片可放大查看</p>
      {open && (
        <div className="policyLight" onClick={() => setOpen(false)}>
          <Arrow dir="prev" onClick={step(-1)} />
          <img loading="lazy" decoding="async" width="860" height="678" src={slide.src} alt={slide.alt} />
          <Arrow dir="next" onClick={step(1)} />
        </div>
      )}
    </div>
  );
}

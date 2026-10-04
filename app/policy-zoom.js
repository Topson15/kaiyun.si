"use client";
import { useEffect, useRef, useState } from "react";

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

function span(touches) {
  return Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
}

export default function PolicyZoom({ label }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 });
  const [pinching, setPinching] = useState(false);
  const frameRef = useRef(null);
  const stageRef = useRef(null);
  const zoomRef = useRef(zoom);
  const blockClick = useRef(false);
  const slide = slides[index];

  const go = (direction) => {
    setDir(direction);
    setIndex((i) => (i + direction + slides.length) % slides.length);
  };
  const step = (direction) => (event) => {
    event.stopPropagation();
    go(direction);
  };

  useEffect(() => {
    const next = { scale: 1, x: 0, y: 0 };
    zoomRef.current = next;
    setZoom(next);
  }, [index, open]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    let start = null;
    const onStart = (event) => {
      if (event.touches.length !== 1) return;
      start = { x: event.touches[0].clientX, y: event.touches[0].clientY, moved: false };
    };
    const onMove = (event) => {
      if (!start || event.touches.length !== 1) return;
      const dx = event.touches[0].clientX - start.x;
      const dy = event.touches[0].clientY - start.y;
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        start.moved = true;
        event.preventDefault();
      }
    };
    const onEnd = (event) => {
      if (!start) return;
      const dx = event.changedTouches[0].clientX - start.x;
      const dy = event.changedTouches[0].clientY - start.y;
      if (start.moved && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        blockClick.current = true;
        go(dx < 0 ? 1 : -1);
      }
      start = null;
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!open || !el) return;
    let gesture = null;
    const apply = (next) => {
      zoomRef.current = next;
      setZoom(next);
    };
    const onStart = (event) => {
      if (event.touches.length === 2) {
        gesture = { type: "pinch", dist: span(event.touches), ...zoomRef.current };
        setPinching(true);
        event.preventDefault();
      } else if (event.touches.length === 1) {
        gesture = { type: "pan", x: event.touches[0].clientX, y: event.touches[0].clientY, ox: zoomRef.current.x, oy: zoomRef.current.y, scale: zoomRef.current.scale, moved: false };
      }
    };
    const onMove = (event) => {
      if (!gesture) return;
      if (event.touches.length === 2 && gesture.type === "pinch") {
        event.preventDefault();
        const scale = Math.min(4, Math.max(1, gesture.scale * (span(event.touches) / gesture.dist)));
        apply({ scale, x: scale === 1 ? 0 : gesture.x, y: scale === 1 ? 0 : gesture.y });
      } else if (event.touches.length === 1 && gesture.type === "pan") {
        const dx = event.touches[0].clientX - gesture.x;
        const dy = event.touches[0].clientY - gesture.y;
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) gesture.moved = true;
        if (gesture.scale > 1) {
          event.preventDefault();
          apply({ scale: gesture.scale, x: gesture.ox + dx, y: gesture.oy + dy });
        }
      }
    };
    const onEnd = (event) => {
      if (gesture?.type === "pan" && gesture.scale <= 1 && gesture.moved && event.changedTouches[0]) {
        const dx = event.changedTouches[0].clientX - gesture.x;
        const dy = event.changedTouches[0].clientY - gesture.y;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      }
      if (zoomRef.current.scale <= 1.02) apply({ scale: 1, x: 0, y: 0 });
      gesture = null;
      setPinching(false);
    };
    el.addEventListener("touchstart", onStart, { passive: false });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [open]);

  return (
    <div className="policyZoom">
      <div className="policyFrame" ref={frameRef}>
        {slides.map((item, i) => (
          <button key={item.src} type="button" className="policyShotBtn" style={{ transform: `translateX(${offset(i, index) * 100}%)`, zIndex: i === index ? 1 : 0 }} onClick={() => { if (blockClick.current) { blockClick.current = false; return; } setOpen(true); }} aria-label="放大查看" tabIndex={i === index ? 0 : -1}>
            <img loading="lazy" decoding="async" width="860" height="678" className="policyShot" src={item.src} alt={item.alt} />
          </button>
        ))}
        <Arrow dir="prev" onClick={step(-1)} />
        <Arrow dir="next" onClick={step(1)} />
      </div>
      {label ? <p className="policyCaption">{label}</p> : null}
      <p className="policyHint">左右滑动切换，点击放大后可双指缩放</p>
      {open && (
        <div className="policyLight" onClick={() => setOpen(false)}>
          <Arrow dir="prev" onClick={step(-1)} />
          <div className={pinching ? "policyStage is-pinch" : "policyStage"} ref={stageRef} onClick={(event) => event.stopPropagation()}>
            <img key={slide.src} className={zoom.scale > 1 ? "zoomed" : dir > 0 ? "from-next" : "from-prev"} style={{ transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})` }} loading="lazy" decoding="async" width="860" height="678" src={slide.src} alt={slide.alt} />
          </div>
          <Arrow dir="next" onClick={step(1)} />
        </div>
      )}
    </div>
  );
}

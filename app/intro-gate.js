"use client";
import { useEffect, useRef, useState } from "react";

const phi = (1 + Math.sqrt(5)) / 2;
const norm = (v) => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

function soccerFaces() {
  const raw = [];
  for (const a of [-1, 1]) {
    for (const b of [-1, 1]) raw.push([0, a, b * phi], [a, b * phi, 0], [b * phi, 0, a]);
  }
  const V = raw.map(norm);
  const edges = [];
  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) edges.push([Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]), i, j]);
  }
  edges.sort((a, b) => a[0] - b[0]);
  const E = edges.slice(0, 30).map((e) => [e[1], e[2]]);
  const N = Array.from({ length: 12 }, () => []);
  for (const [i, j] of E) {
    N[i].push(j);
    N[j].push(i);
  }
  const edgePts = new Map();
  for (const [i, j] of E) {
    const a = V[i];
    const b = V[j];
    edgePts.set(`${i}-${j}`, [a.map((v, k) => (2 * v + b[k]) / 3), a.map((v, k) => (v + 2 * b[k]) / 3)]);
  }
  const closer = (i, j) => {
    const key = i < j ? `${i}-${j}` : `${j}-${i}`;
    const [p, q] = edgePts.get(key);
    return i < j ? p : q;
  };
  const faces = [];
  for (let i = 0; i < 12; i++) {
    const pts = N[i].map((j) => closer(i, j));
    const axis = V[i];
    let t0 = sub(pts[0], axis.map((v) => v * dot(pts[0], axis)));
    t0 = norm(t0);
    const t1 = cross(axis, t0);
    const ang = (r) => {
      const t = sub(r, axis.map((v) => v * dot(r, axis)));
      return Math.atan2(dot(t, t1), dot(t, t0));
    };
    pts.sort((p, q) => ang(p) - ang(q));
    faces.push({ dark: true, pts });
  }
  const seen = new Set();
  for (let i = 0; i < 12; i++) {
    for (const j of N[i]) {
      for (const k of N[j]) {
        if (k === i || !N[i].includes(k)) continue;
        const key = [i, j, k].sort((a, b) => a - b).join("-");
        if (seen.has(key)) continue;
        seen.add(key);
        const a = V[i];
        const b = V[j];
        const c = V[k];
        let seq = [i, j, k];
        if (dot(cross(sub(b, a), sub(c, a)), a.map((v, t) => (v + b[t] + c[t]) / 3)) < 0) seq = [i, k, j];
        const poly = [];
        for (const [u, v] of [[seq[0], seq[1]], [seq[1], seq[2]], [seq[2], seq[0]]]) poly.push(closer(u, v), closer(v, u));
        faces.push({ dark: false, pts: poly });
      }
    }
  }
  return faces;
}

const FACES = soccerFaces();
const LIGHT = norm([-0.32, -0.58, 0.75]);
const PATH = [[56, 62], [34, 52], [10, 40], [-16, 28], [-34, 18], [-46, 9], [-36, 2.2], [-16, 0.3], [0, 0]];

function rot(v, ax, ay) {
  let x = v[0];
  let y = v[1];
  let z = v[2];
  let c = Math.cos(ax);
  let s = Math.sin(ax);
  const y1 = y * c - z * s;
  const z1 = y * s + z * c;
  y = y1;
  z = z1;
  c = Math.cos(ay);
  s = Math.sin(ay);
  const x2 = x * c + z * s;
  const z2 = -x * s + z * c;
  return [x2, y, z2];
}

function paintPanels(ctx, c, R, yaw, alpha) {
  const drawn = [];
  for (const face of FACES) {
    const pts = face.pts.map((p) => rot(p, 0, yaw));
    let cx = 0;
    let cy = 0;
    let cz = 0;
    for (const p of pts) {
      cx += p[0];
      cy += p[1];
      cz += p[2];
    }
    cx /= pts.length;
    cy /= pts.length;
    cz /= pts.length;
    const n = norm(rot(cross(sub(face.pts[1], face.pts[0]), sub(face.pts[2], face.pts[0])), 0, yaw));
    const nn = dot(n, [cx, cy, cz]) < 0 ? [-n[0], -n[1], -n[2]] : n;
    const shade = Math.max(0, dot(nn, LIGHT));
    const col = face.dark ? Math.round(10 + shade * 48) : Math.round(226 + shade * 29);
    drawn.push({ z: cz, pts, col });
  }
  drawn.sort((a, b) => a.z - b.z);
  ctx.globalAlpha = alpha;
  for (const face of drawn) {
    const m = face.pts.reduce((s, p) => [s[0] + p[0], s[1] + p[1], s[2] + p[2]], [0, 0, 0]).map((v) => v / face.pts.length);
    ctx.beginPath();
    face.pts.forEach((p, i) => {
      const x = m[0] + (p[0] - m[0]) * 0.94;
      const y = m[1] + (p[1] - m[1]) * 0.94;
      const sx = c + x * R;
      const sy = c + y * R;
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    });
    ctx.closePath();
    ctx.fillStyle = `rgb(${face.col},${face.col},${face.col})`;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawBall(ctx, spin, omega) {
  const S = ctx.canvas.width;
  const c = S / 2;
  const R = S * 0.46;
  const smear = Math.min(2.1, 0.35 + (omega || 0) * 0.028);
  ctx.clearRect(0, 0, S, S);
  ctx.save();
  ctx.beginPath();
  ctx.arc(c, c, R, 0, Math.PI * 2);
  ctx.clip();
  const g = ctx.createRadialGradient(c - R * 0.32, c - R * 0.38, R * 0.08, c, c, R);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.7, "#e7edf2");
  g.addColorStop(1, "#b7c3cf");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  const steps = 9;
  for (let i = steps; i >= 1; i--) {
    paintPanels(ctx, c, R, spin - smear * (i / steps), 0.12 + 0.32 * (1 - i / steps));
  }
  paintPanels(ctx, c, R, spin, 1);
  const hl = ctx.createRadialGradient(c - R * 0.34, c - R * 0.4, R * 0.02, c - R * 0.1, c - R * 0.16, R * 0.55);
  hl.addColorStop(0, "rgba(255,255,255,.72)");
  hl.addColorStop(0.45, "rgba(255,255,255,.16)");
  hl.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hl;
  ctx.fillRect(0, 0, S, S);
  ctx.restore();
  ctx.beginPath();
  ctx.arc(c, c, R - 0.5, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(16,24,36,.28)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function curve(u) {
  const n = PATH.length;
  const segs = n - 1;
  const x = Math.min(segs - 1e-6, Math.max(0, u * segs));
  const i = Math.floor(x);
  const t = x - i;
  const p = (k) => PATH[Math.max(0, Math.min(n - 1, k))];
  const cm = (a, b, c, d) => 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
  const p0 = p(i - 1);
  const p1 = p(i);
  const p2 = p(i + 1);
  const p3 = p(i + 2);
  return [cm(p0[0], p1[0], p2[0], p3[0]), cm(p0[1], p1[1], p2[1], p3[1])];
}

const MARKS = [[0, 0], [0.1, 0.012], [0.32, 0.56], [0.46, 0.66], [0.54, 0.692], [0.73, 0.708], [0.86, 0.9], [1, 1]];

function easeFlight(t) {
  let i = 1;
  while (i < MARKS.length && MARKS[i][0] < t) i += 1;
  const a = MARKS[i - 1];
  const b = MARKS[Math.min(MARKS.length - 1, i)];
  const span = b[0] - a[0] || 1;
  const k = Math.min(1, Math.max(0, (t - a[0]) / span));
  const s = k * k * (3 - 2 * k);
  return a[1] + (b[1] - a[1]) * s;
}

function playKick(fly, canvas, logo) {
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    canvas.style.display = "none";
    logo.style.opacity = "1";
    fly.style.transform = "none";
    return () => {};
  }
  const FLIGHT = 3400;
  const COAST = 980;
  const FADE = 380;
  let roll = 0;
  let omega = 8;
  let last = null;
  let lastNow = performance.now();
  let fade = 0;
  const t0 = lastNow;
  let raf = 0;
  const frame = (now) => {
    const elapsed = now - t0;
    const dt = Math.min(0.05, (now - lastNow) / 1000);
    lastNow = now;
    const u = elapsed < FLIGHT ? easeFlight(elapsed / FLIGHT) : 1;
    const [x, y] = curve(u);
    const px = (x / 100) * window.innerWidth;
    const py = (y / 100) * window.innerHeight;
    const radius = Math.max(22, fly.offsetWidth * 0.46);
    const dist = last ? Math.hypot(px - last[0], py - last[1]) : 0;
    last = [px, py];
    if (elapsed < FLIGHT) {
      const kicked = dist / Math.max(dt, 0.001) / radius;
      const target = Math.min(78, Math.max(58, kicked * 3.6));
      omega += (target - omega) * Math.min(1, dt * 7);
    } else {
      omega *= Math.exp(-1.7 * dt);
    }
    roll += omega * dt;
    const scale = 1.14 - 0.14 * Math.min(1, u);
    fly.style.transform = `translate3d(${x}vw, ${y}vh, 0) scale(${scale})`;
    drawBall(ctx, roll, omega);
    if (elapsed >= FLIGHT + COAST) {
      fade = Math.min(1, (elapsed - FLIGHT - COAST) / FADE);
      canvas.style.opacity = String(1 - fade);
      logo.style.opacity = String(fade);
    }
    if (fade < 1) raf = requestAnimationFrame(frame);
  };
  drawBall(ctx, 0, 0);
  fly.style.transform = `translate3d(${PATH[0][0]}vw, ${PATH[0][1]}vh, 0) scale(1.14)`;
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

export default function IntroGate() {
  const [phase, setPhase] = useState("in");
  const flyRef = useRef(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);

  const leave = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      window.scrollTo(0, 0);
      return;
    }
    setPhase((p) => (p === "in" ? "out" : p));
  };

  useEffect(() => {
    if (phase !== "in") return;
    const fly = flyRef.current;
    const canvas = canvasRef.current;
    const logo = logoRef.current;
    if (!fly || !canvas || !logo) return;
    return playKick(fly, canvas, logo);
  }, [phase]);

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
        <span className="logoBallFly" ref={flyRef}>
          <canvas className="ballReal" ref={canvasRef} width="320" height="320" aria-hidden="true" />
          <img className="logoBall" ref={logoRef} src="/intro/logo-ball.webp" width="135" height="133" alt="" />
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

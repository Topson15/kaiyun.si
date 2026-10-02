"use client";
import { useState } from "react";

export default function PolicyZoom({ label }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="policyZoom">
      <button type="button" className="policyShotBtn" onClick={() => setOpen(true)} aria-label="放大查看开云体育佣金政策">
        <img loading="lazy" decoding="async" width="860" height="678" className="policyShot" src="/policy-sheet.webp" alt="开云体育佣金政策" />
      </button>
      {label ? <p className="policyCaption">{label}</p> : null}
      <p className="policyHint">点击图片可放大查看</p>
      {open && (
        <div className="policyLight" onClick={() => setOpen(false)}>
          <img loading="lazy" decoding="async" width="860" height="678" src="/policy-sheet.webp" alt="开云体育佣金政策" />
        </div>
      )}
    </div>
  );
}

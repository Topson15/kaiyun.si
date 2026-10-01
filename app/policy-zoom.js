"use client";
import { useState } from "react";

export default function PolicyZoom() {
  const [open, setOpen] = useState(false);
  return (
    <div className="policyZoom">
      <button type="button" className="policyShotBtn" onClick={() => setOpen(true)} aria-label="放大查看开云体育佣金政策">
        <img className="policyShot" src="/policy-sheet.png" alt="开云体育佣金政策" />
      </button>
      <p className="policyHint">点击图片可放大查看</p>
      {open && (
        <div className="policyLight" onClick={() => setOpen(false)}>
          <img src="/policy-sheet.png" alt="开云体育佣金政策" />
        </div>
      )}
    </div>
  );
}

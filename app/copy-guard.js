"use client";
import { useEffect } from "react";

function editable(target) {
  return target instanceof Element && !!target.closest("input, textarea, [contenteditable='true']");
}

export default function CopyGuard() {
  useEffect(() => {
    const block = (event) => {
      if (editable(event.target)) return;
      event.preventDefault();
    };
    const onKey = (event) => {
      const key = event.key.toLowerCase();
      const meta = event.ctrlKey || event.metaKey;
      if (key === "f12" || (meta && event.shiftKey && ["i", "j", "c"].includes(key))) {
        event.preventDefault();
        return;
      }
      if (!meta) return;
      if (["u", "s", "p"].includes(key) || (!editable(event.target) && ["a", "c", "x"].includes(key))) {
        event.preventDefault();
      }
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}

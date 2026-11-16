"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pequeno disco de vidro que segue o rato sobre elementos com data-cursor="Texto".
 * Só em ecrãs com rato; em ecrãs tácteis fica escondido por CSS.
 */
export default function CursorTag() {
  const ref = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    let raf = 0;
    let pos = null;
    const onMove = (e) => {
      pos = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const t = pos.target?.closest?.("[data-cursor]");
        el.style.setProperty("--cx", `${pos.clientX}px`);
        el.style.setProperty("--cy", `${pos.clientY}px`);
        el.style.setProperty("--cs", t ? "1" : "0");
        if (t) setLabel(t.dataset.cursor);
      });
    };
    const onLeave = () => el.style.setProperty("--cs", "0");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-tag" aria-hidden="true">
      <span className="grid size-20 place-items-center rounded-full border border-champagne/40 bg-obsidian/60 font-mono text-[10px] uppercase tracking-[0.18em] text-champagne backdrop-blur-md">
        {label}
      </span>
    </div>
  );
}

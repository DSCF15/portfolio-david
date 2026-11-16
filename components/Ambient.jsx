"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Camada invisível que dá vida à página:
 * - a luz dourada que segue o cursor (ou o scroll, em ecrãs tácteis);
 * - a aresta dos painéis .glass que acende onde a luz toca;
 * - o scroll suave (Lenis) e as revelações ao fazer scroll.
 * Com "reduzir movimento" ativo, só as revelações ficam (e aparecem logo).
 */
export default function Ambient() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Revelações
    const els = document.querySelectorAll(".reveal");
    let io;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      els.forEach((el) => io.observe(el));
    }

    if (reduce) return () => io?.disconnect();

    // Luz + arestas de vidro
    let frame = 0;
    let last = null;
    const paint = () => {
      frame = 0;
      if (!last) return;
      root.style.setProperty("--mx", `${last.x}px`);
      root.style.setProperty("--my", `${last.y}px`);
      const glass = last.target?.closest?.(".glass");
      if (glass) {
        const r = glass.getBoundingClientRect();
        glass.style.setProperty("--px", `${last.x - r.left}px`);
        glass.style.setProperty("--py", `${last.y - r.top}px`);
      }
    };
    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY, target: e.target };
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Scroll suave + âncoras
    const lenis = new Lenis({ lerp: 0.1 });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    const onAnchor = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -24 });
      history.replaceState(null, "", a.getAttribute("href"));
    };
    document.addEventListener("click", onAnchor);
    window.__lenis = lenis;

    return () => {
      io?.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("click", onAnchor);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <div className="light-field" aria-hidden="true" />;
}

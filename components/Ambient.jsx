"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Camada invisível que dá vida à página:
 * - luz dourada que segue o cursor e acende as arestas dos painéis .glass;
 * - barra de progresso de leitura (--scroll no <html>);
 * - paralaxe: cada [data-parallax] recebe --p entre -1 (abaixo do ecrã) e 1 (acima);
 * - secção atual: envia o evento "section-change" com o id da <section data-chapter>;
 * - scroll suave (Lenis) e revelações ao entrar no ecrã.
 * Com "reduzir movimento", ficam só as revelações (e aparecem logo).
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

    // Secção atual (funciona também com movimento reduzido)
    const chapters = [...document.querySelectorAll("[data-chapter]")];
    let current = "";
    const spy = () => {
      const mid = window.innerHeight * 0.4;
      let found = "";
      for (const c of chapters) {
        const r = c.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) found = c.dataset.chapter;
      }
      if (found !== current) {
        current = found;
        window.dispatchEvent(new CustomEvent("section-change", { detail: found }));
      }
    };

    // Progresso + paralaxe
    // [data-parallax] move-se com --p; [data-progress] só recebe --p para o CSS usar à sua maneira
    const parallax = [...document.querySelectorAll("[data-parallax], [data-progress]")];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--scroll", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
        spy();
        if (reduce) return;
        const vh = window.innerHeight;
        for (const el of parallax) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          const center = r.top + r.height / 2;
          const p = Math.max(-1, Math.min(1, (vh / 2 - center) / (vh / 2 + r.height / 2)));
          el.style.setProperty("--p", p.toFixed(4));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    if (reduce) {
      return () => {
        io?.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

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
    lenis.on("scroll", onScroll);
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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("click", onAnchor);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <>
      <div className="light-field" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
    </>
  );
}

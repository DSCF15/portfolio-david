"use client";

import { useEffect, useRef, useState } from "react";
import { field } from "@/lib/content";
import { useLightbox } from "./Lightbox";

const small = (src) => src.replace(/\.webp$/, "-sm.webp");

/**
 * "Em campo": em ecrãs grandes a secção fica presa ao ecrã e as fotografias
 * correm na horizontal enquanto se faz scroll. Em telemóvel, ou com movimento
 * reduzido, é uma faixa normal que se desliza com o dedo.
 */
export default function Field() {
  const { open } = useLightbox();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    let raf = 0;

    const layout = () => {
      // Altura da secção = distância horizontal a percorrer + um ecrã
      const distance = track.scrollWidth - window.innerWidth;
      section.style.height = `${distance + window.innerHeight}px`;
      onScroll();
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = section.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
        const distance = track.scrollWidth - window.innerWidth;
        track.style.transform = `translate3d(${-p * distance}px,0,0)`;
        setProgress(p);
      });
    };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    const lenis = window.__lenis;
    lenis?.on?.("scroll", onScroll);
    // As imagens podem mudar a largura da faixa quando carregam
    const ro = new ResizeObserver(layout);
    ro.observe(track);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      lenis?.off?.("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
      section.style.height = "";
      track.style.transform = "";
    };
  }, [pinned]);

  const items = field.photos.map((p) => ({ ...p, project: field.title }));
  const current = Math.min(field.photos.length, Math.floor(progress * field.photos.length) + 1);

  return (
    <section id="campo" ref={sectionRef} data-chapter="Em campo" className="relative border-t border-line bg-obsidian">
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-8 pt-24" : "py-24"}>
        {/* Luz de estádio */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, rgb(245 179 66 / 0.16), transparent 70%), radial-gradient(40% 50% at 100% 100%, rgb(255 122 77 / 0.12), transparent 70%)",
          }}
        />

        <div className="relative mx-auto mb-8 flex w-full max-w-[1280px] flex-wrap items-end justify-between gap-6 px-5 md:px-10">
          <div className="max-w-[36rem]">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Fora do ecrã</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.6vw,4.2rem)] font-normal italic leading-[0.95] tracking-[-0.02em] text-sunset">
              {field.title}
            </h2>
            <p className="mt-4 text-smoke">{field.lead}</p>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.16em]">
            {pinned && (
              <span className="tabular-nums text-smoke">
                <span className="text-champagne">{String(current).padStart(2, "0")}</span> /{" "}
                {String(field.photos.length).padStart(2, "0")}
              </span>
            )}
            <a href={field.zerozero} target="_blank" rel="noreferrer" className="link-line text-champagne">
              Ficha no zerozero ↗
            </a>
          </div>
        </div>

        <ul
          ref={trackRef}
          className={`relative flex gap-5 px-5 md:gap-8 md:px-10 ${
            pinned ? "w-max will-change-transform" : "snap-x snap-mandatory scroll-pl-5 overflow-x-auto pb-4"
          }`}
        >
          {field.photos.map((p, i) => (
            <li
              key={p.src}
              className={`shrink-0 snap-start ${i % 3 === 1 ? "md:mt-10" : ""}`}
            >
              <button
                type="button"
                onClick={() => open(items, i)}
                data-cursor="Ver"
                className="media-zoom group block text-left"
              >
                <span className="block h-[56vw] max-h-[460px] overflow-hidden md:h-[44vh] md:min-h-[240px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={small(p.src)}
                    srcSet={`${small(p.src)} 900w, ${p.src} 1800w`}
                    sizes="(min-width: 900px) 60vw, 85vw"
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-auto max-w-none object-cover"
                    style={{ aspectRatio: "3 / 2" }}
                  />
                </span>
                <span className="mt-3 flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
                  <span className="text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-smoke transition-colors group-hover:text-ivory">{p.caption}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Barra de progresso da galeria */}
        {pinned && (
          <div className="relative mx-auto mt-8 w-full max-w-[1280px] px-5 md:px-10" aria-hidden="true">
            <div className="h-px w-full bg-line">
              <div className="h-px origin-left bg-gold" style={{ transform: `scaleX(${progress})` }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

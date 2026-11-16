"use client";

import { useEffect, useState } from "react";
import { projects } from "@/lib/content";

const slides = projects
  .filter((p) => p.media)
  .map((p) => ({ id: p.id, title: p.title, client: p.client.split(" · ")[0], ...p.media.hero }));

/**
 * Montra do topo: uma janela de vidro inclinada que se endireita ao fazer scroll
 * e vai mostrando, em rotação, o ecrã principal de cada projeto.
 */
export default function HeroStage() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 4200);
    return () => clearInterval(id);
  }, [paused]);

  const s = slides[i];

  return (
    <div
      data-progress
      className="defog-3 relative mx-auto max-w-[1280px] px-5 [perspective:1600px] md:px-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="origin-bottom transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform:
            "rotateX(calc(max(0, var(--p, 0) * -1) * 26deg)) scale(calc(1 - max(0, var(--p, 0) * -1) * 0.06))",
        }}
      >
        <a
          href={`#caso-${s.id}`}
          data-cursor="Ver caso"
          className="glass block overflow-hidden bg-basalt shadow-[0_60px_140px_-40px_rgb(201_164_92/0.25)]"
          aria-label={`Ver o caso ${s.title}`}
        >
          <div className="flex items-center gap-3 border-b border-line px-4 py-2.5" aria-hidden="true">
            <span className="flex gap-1.5">
              <span className="size-2 rounded-full bg-ivory/15" />
              <span className="size-2 rounded-full bg-ivory/15" />
              <span className="size-2 rounded-full bg-ivory/15" />
            </span>
            <span className="mx-auto font-mono text-[10px] tracking-[0.06em] text-smoke">{s.client}</span>
          </div>
          <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[16/8]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={1600}
              height={1000}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="showcase-slide absolute inset-0 size-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
          </div>
        </a>
      </div>

      {/* Legenda + seletor */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em]">
        <p className="text-smoke" aria-live="polite">
          <span className="text-gold">Agora:</span> {s.title}
        </p>
        <div className="flex gap-2" role="tablist" aria-label="Escolher projeto na montra">
          {slides.map((sl, n) => (
            <button
              key={sl.id}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={sl.title}
              onClick={() => setI(n)}
              className="group py-2"
            >
              <span
                className={`block h-px transition-all duration-500 ${
                  n === i ? "w-10 bg-champagne" : "w-5 bg-ivory/25 group-hover:bg-ivory/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

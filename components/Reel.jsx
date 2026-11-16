"use client";

import { reel } from "@/lib/content";
import { useLightbox } from "./Lightbox";

const smallSrc = (src) => src.replace(/\.webp$/, "-sm.webp");

/**
 * Duas filas de ecrãs que deslizam em sentidos opostos enquanto se faz scroll.
 * Cada imagem abre o lightbox com o arquivo completo.
 */
export default function Reel() {
  const { open } = useLightbox();
  const half = Math.ceil(reel.length / 2);
  const rows = [reel.slice(0, half), reel.slice(half)];

  return (
    <section aria-label="Arquivo de ecrãs" className="relative overflow-hidden border-t border-line py-20 md:py-28">
      <div className="mx-auto mb-10 flex max-w-[1280px] flex-wrap items-end justify-between gap-4 px-5 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">Arquivo de ecrãs</p>
        <p className="font-display text-xl italic text-champagne md:text-2xl">
          {reel.length} ecrãs reais, de {new Set(reel.map((r) => r.id)).size} projetos
        </p>
      </div>

      <div data-progress className="grid gap-5">
        {rows.map((row, ri) => (
          <ul key={ri} className={`flex w-max gap-5 ${ri === 0 ? "reel-track" : "reel-track-rev"}`}>
            {[...row, ...row].map((r, n) => {
              const idx = reel.indexOf(r);
              return (
                <li key={`${r.src}-${n}`} className="w-[62vw] shrink-0 sm:w-[40vw] lg:w-[28vw]">
                  <button
                    type="button"
                    onClick={() => open(reel, idx)}
                    data-cursor="Abrir"
                    tabIndex={n >= row.length ? -1 : 0}
                    aria-hidden={n >= row.length ? "true" : undefined}
                    className="media-zoom group block w-full overflow-hidden border border-line text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={smallSrc(r.src)}
                      alt={n >= row.length ? "" : r.alt}
                      width={800}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="block aspect-[16/10] w-full object-cover object-top opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ))}
      </div>

      {/* Esbatimento nas margens */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-obsidian to-transparent" />
    </section>
  );
}

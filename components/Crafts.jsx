"use client";

import { useState } from "react";
import { crafts } from "@/lib/content";
import SectionHead from "./SectionHead";

/** A única secção do site sobre o percurso fora da área. */
export default function Crafts() {
  const [open, setOpen] = useState(0);

  return (
    <section id="antes" data-chapter="Antes do código" className="theme-saffron relative border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40">
        <SectionHead id="antes" label="Antes do código" title="Antes de desenhar interfaces," accent="estive do outro lado delas.">
          <p>
            Montei vidros, distribuí cartas, entreguei pizzas, servi ao balcão e trabalhei em obra. Cada trabalho
            ensinou-me algo sobre pessoas que hoje aplico a produtos.
          </p>
        </SectionHead>

        <ul className="reveal mt-16 border-t border-line md:ml-[268px] md:mt-20">
          {crafts.map((c, i) => {
            const isOpen = open === i;
            const id = `oficio-${i}`;
            return (
              <li key={c.name} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={id}
                  className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 py-5 text-left"
                >
                  <span
                    className={`font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight transition-all duration-500 ease-glass group-hover:translate-x-2.5 group-hover:text-champagne ${
                      isOpen ? "translate-x-2.5 italic text-champagne" : ""
                    }`}
                  >
                    {c.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">{c.tag}</span>
                </button>
                <div id={id} className="fold" data-open={isOpen} inert={!isOpen}>
                  <div>
                    {c.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={c.photo.src}
                        alt={c.photo.alt}
                        width={450}
                        height={800}
                        loading="lazy"
                        decoding="async"
                        className="mb-6 ml-2.5 aspect-[4/5] w-[min(260px,70%)] -rotate-2 border-[6px] border-[#faf4ea] object-cover object-top shadow-[0_24px_50px_-20px_rgb(29_24_18/0.6)]"
                      />
                    )}
                    <p className="max-w-[40rem] pb-7 pl-2.5 text-smoke">
                      {c.lesson}
                      {c.href && (
                        <>
                          {" "}
                          <a
                            href={c.href}
                            target="_blank"
                            rel="noreferrer"
                            className="link-line whitespace-nowrap text-champagne"
                          >
                            Ficha no zerozero ↗
                          </a>
                        </>
                      )}
                      {c.more && (
                        <>
                          {" · "}
                          <a href={c.more.href} className="link-line whitespace-nowrap text-champagne">
                            {c.more.label} ↓
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { projects, githubProfile } from "@/lib/content";
import SectionHead from "./SectionHead";
import Plate from "./Plate";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { useLightbox } from "./Lightbox";

const storyParts = [
  ["contexto", "Contexto"],
  ["tensao", "Tensão"],
  ["decisao", "Decisão"],
  ["resultado", "Resultado"],
];

const smallSrc = (src) => src.replace(/\.webp$/, "-sm.webp");

/** Todas as imagens de um projeto, prontas para o lightbox. */
function projectImages(p) {
  if (!p.media) return [];
  const { hero, gallery, mobile } = p.media;
  return [hero, ...gallery, mobile].filter(Boolean).map((m) => ({ ...m, project: p.title }));
}

function Stage({ p, flip }) {
  const { open } = useLightbox();
  const images = projectImages(p);

  if (!p.media) {
    return (
      <div className="mx-auto w-full max-w-[880px]">
        <Plate kind={p.plate} label={`Ilustração do projeto ${p.title}`} />
      </div>
    );
  }

  return (
    <div className={`relative ${flip ? "md:pl-[14%]" : "md:pr-[14%]"} pb-14 md:pb-20`}>
      <button
        type="button"
        onClick={() => open(images, 0)}
        data-cursor="Ver"
        className="media-zoom block w-full text-left"
        aria-label={`Ver imagens do projeto ${p.title}`}
      >
        <BrowserFrame src={p.media.hero.src} alt={p.media.hero.alt} url={p.frameLabel} />
      </button>

      {p.media.mobile && (
        <div
          data-parallax
          style={{ "--depth": "70px" }}
          className={`absolute bottom-0 w-[30%] max-w-[230px] md:w-[20%] ${flip ? "left-[3%] md:left-0" : "right-[3%] md:right-0"}`}
        >
          <button
            type="button"
            onClick={() => open(images, images.length - 1)}
            data-cursor="Ver"
            className="media-zoom block w-full"
            aria-label={`Ver a versão de telemóvel de ${p.title}`}
          >
            <PhoneFrame src={p.media.mobile.src} alt={p.media.mobile.alt} />
          </button>
        </div>
      )}
    </div>
  );
}

function Case({ p, flip }) {
  const [open, setOpen] = useState(false);
  const { open: openLightbox } = useLightbox();
  const panelId = `detalhe-${p.id}`;
  const images = projectImages(p);

  return (
    <article id={`caso-${p.id}`} className="scroll-mt-24 border-t border-line pt-10 md:pt-14">
      {/* Cabeçalho do caso */}
      <div className="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-gold">Caso {p.index}</span>
          <span className="text-smoke">{p.client}</span>
          {p.status && <span className="border border-gold/40 px-2 py-0.5 text-[10px] text-champagne">{p.status}</span>}
        </div>
        <span className="text-smoke tabular-nums">{p.year}</span>
      </div>

      <h3 className="reveal mt-5 max-w-[22ch] font-display text-[clamp(2.2rem,5vw,4.5rem)] font-normal italic leading-[1] tracking-[-0.02em]">
        {p.title}
      </h3>

      {/* Imagens */}
      <div className="reveal mt-10 md:mt-14">
        <Stage p={p} flip={flip} />
      </div>

      {/* Resumo */}
      <div className="reveal mt-10 grid gap-8 md:mt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
        <p className="max-w-[36rem] text-lg leading-relaxed text-ivory/85">{p.summary}</p>
        <div className="min-w-0">
          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-2 text-sm">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">Papel</dt>
            <dd>{p.role}</dd>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">Stack</dt>
            <dd className="text-smoke">{p.stack.join(" · ")}</dd>
          </dl>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group mt-8 inline-flex items-center gap-4 border-b border-gold/50 pb-1.5 text-sm tracking-wide text-champagne transition-colors hover:border-champagne"
          >
            {open ? "Fechar o caso" : "Ler o caso completo"}
            <span
              aria-hidden="true"
              className={`inline-block transition-transform duration-500 ease-glass ${open ? "rotate-45" : "group-hover:rotate-90"}`}
            >
              +
            </span>
          </button>
        </div>
      </div>

      {/* Caso completo */}
      <div id={panelId} className="fold" data-open={open} inert={!open}>
        <div>
          <div className="mt-12 grid gap-px bg-line pt-px md:grid-cols-2 lg:grid-cols-4">
            {storyParts.map(([key, label], i) => (
              <div key={key} className="bg-obsidian py-8 md:px-7 md:first:pl-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                  {String(i + 1).padStart(2, "0")} · {label}
                </p>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-ivory/85">{p.story[key]}</p>
              </div>
            ))}
          </div>

          {p.media?.gallery?.length > 0 && (
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {p.media.gallery.map((g, gi) => (
                <li key={g.src}>
                  <button
                    type="button"
                    onClick={() => openLightbox(images, gi + 1)}
                    data-cursor="Abrir"
                    className="media-zoom group block w-full text-left"
                  >
                    <span className="block overflow-hidden border border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={smallSrc(g.src)}
                        alt={g.alt}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="block aspect-[16/10] w-full object-cover object-top"
                      />
                    </span>
                    <span className="mt-3 block text-sm leading-relaxed text-smoke transition-colors group-hover:text-ivory">
                      {g.caption}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pb-4 pt-8">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="link-line font-mono text-[11px] uppercase tracking-[0.16em] text-smoke hover:text-champagne"
              >
                {l.label} ↗
              </a>
            ))}
            {p.media?.note && <span className="font-mono text-[11px] text-smoke/70">{p.media.note}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section
      id="projetos"
      data-chapter="Projetos"
      className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40"
    >
      <SectionHead
        id="projetos"
        label="Projetos"
        title={`${["Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis"][projects.length] ?? projects.length} problemas,`}
        accent="contados do princípio ao fim."
      >
        <p>
          Cada caso segue a mesma estrutura: o contexto, a tensão que tornava o problema difícil, a decisão que tomei e o
          que resultou dela. Clica nas imagens para as ver em grande.
        </p>
      </SectionHead>

      {/* Índice rápido dos casos */}
      <ol className="reveal mt-14 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.14em] md:ml-[268px]">
        {projects.map((p) => (
          <li key={p.id}>
            <a href={`#caso-${p.id}`} className="link-line text-smoke hover:text-champagne">
              <span className="text-gold">{p.index}</span> {p.client.split(" · ")[0]}
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-28 md:mt-28 md:gap-40">
        {projects.map((p, i) => (
          <Case key={p.id} p={p} flip={i % 2 === 1} />
        ))}
      </div>

      <p className="reveal mt-28 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
        Mais código em{" "}
        <a href={githubProfile} target="_blank" rel="noreferrer" className="link-line text-champagne">
          github.com/DSCF15 ↗
        </a>
      </p>
    </section>
  );
}

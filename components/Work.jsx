"use client";

import { useState } from "react";
import { projects, moreWork } from "@/lib/content";
import SectionHead from "./SectionHead";
import Plate from "./Plate";

const storyParts = [
  ["contexto", "Contexto"],
  ["tensao", "Tensão"],
  ["decisao", "Decisão"],
  ["resultado", "Resultado"],
];

function Case({ p, flip }) {
  const [open, setOpen] = useState(false);
  const panelId = `caso-${p.id}`;

  return (
    <article className="reveal border-t border-line pt-10 md:pt-14">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className={flip ? "md:order-2" : ""}>
          <Plate kind={p.plate} label={`Ilustração do projeto ${p.title}`} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span className="text-gold">Caso {p.index}</span>
            <span className="text-smoke">{p.client}</span>
            {p.status && (
              <span className="border border-gold/40 px-2 py-0.5 text-[10px] text-champagne">{p.status}</span>
            )}
          </div>

          <h3 className="mt-5 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-normal italic leading-[1.02] tracking-[-0.015em]">
            {p.title}
          </h3>
          <p className="mt-5 max-w-[34rem] text-smoke">{p.summary}</p>

          <dl className="mt-8 grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-2 text-sm">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">Papel</dt>
            <dd>{p.role}</dd>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">Ano</dt>
            <dd className="tabular-nums">{p.year}</dd>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke">Stack</dt>
            <dd className="text-smoke">{p.stack.join(" · ")}</dd>
          </dl>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group mt-9 inline-flex items-center gap-4 border-b border-gold/50 pb-1.5 text-sm tracking-wide text-champagne transition-colors hover:border-champagne"
          >
            {open ? "Fechar o caso" : "Ler o caso"}
            <span
              aria-hidden="true"
              className={`inline-block transition-transform duration-500 ease-glass ${open ? "rotate-45" : "group-hover:rotate-90"}`}
            >
              +
            </span>
          </button>
        </div>
      </div>

      <div id={panelId} className="fold" data-open={open} inert={!open}>
        <div>
          <div className="grid gap-px bg-line pt-px md:mt-14 md:grid-cols-2 lg:grid-cols-4">
            {storyParts.map(([key, label], i) => (
              <div key={key} className="bg-obsidian px-0 py-8 md:px-7 md:first:pl-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                  {String(i + 1).padStart(2, "0")} · {label}
                </p>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-ivory/85">{p.story[key]}</p>
              </div>
            ))}
          </div>
          {p.links.length > 0 && (
            <div className="flex flex-wrap gap-6 pb-4 pt-2">
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
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="projetos" className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40">
      <SectionHead id="projetos" label="Projetos" title="Quatro problemas," accent="contados do princípio ao fim.">
        <p>
          Cada caso segue a mesma estrutura: o contexto, a tensão que tornava o problema difícil, a decisão que tomei e o
          que resultou dela.
        </p>
      </SectionHead>

      <div className="mt-20 grid gap-20 md:mt-28 md:gap-28">
        {projects.map((p, i) => (
          <Case key={p.id} p={p} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="reveal mt-28 grid gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
        <p className="pt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">Mais no GitHub</p>
        <ul className="border-t border-line">
          {moreWork.map((w) => (
            <li key={w.href} className="border-b border-line">
              <a
                href={w.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-1 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
              >
                <span className="font-display text-2xl transition-all duration-500 ease-glass group-hover:translate-x-2 group-hover:italic group-hover:text-champagne">
                  {w.title}
                </span>
                <span className="text-sm text-smoke">
                  {w.note} <span className="ml-2 font-mono text-[11px] text-smoke/70">{w.stack}</span>
                  <span aria-hidden="true" className="ml-3 text-gold">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

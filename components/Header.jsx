"use client";

import { useEffect, useRef, useState } from "react";
import { identity, contact } from "@/lib/content";
import LocalTime from "./LocalTime";
import { SoundToggle } from "./Sound";

const sections = [
  { href: "#sobre", label: "Sobre mim" },
  { href: "#projetos", label: "Projetos" },
  { href: "#percurso", label: "Percurso" },
  { href: "#antes", label: "Antes do código" },
  { href: "#campo", label: "Em campo" },
  { href: "#metodo", label: "Método" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const [chapter, setChapter] = useState("");

  // Nome da secção que está no ecrã (enviado pelo Ambient)
  useEffect(() => {
    const onChange = (e) => setChapter(e.detail || "");
    window.addEventListener("section-change", onChange);
    return () => window.removeEventListener("section-change", onChange);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-ivory">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 py-5 md:px-10">
          <div className="flex min-w-0 items-baseline gap-4">
            <a href="#topo" className="shrink-0 font-display text-xl italic tracking-tight" onClick={() => setOpen(false)}>
              David França
            </a>
            <span
              aria-live="polite"
              className={`hidden truncate font-mono text-[11px] uppercase tracking-[0.16em] text-smoke transition-all duration-500 md:inline ${
                chapter && !open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
            >
              / {chapter}
            </span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span className="hidden text-smoke lg:inline">
              Caniço · <LocalTime />
            </span>
            <SoundToggle />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="indice"
              className="group flex items-center gap-3"
            >
              <span>{open ? "Fechar" : "Índice"}</span>
              <span className="relative block h-[7px] w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${
                    open ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-500 ${
                    open ? "w-full -translate-y-[3px] -rotate-45" : "w-3/5 group-hover:w-full"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu em ecrã inteiro */}
      <div
        id="indice"
        role="dialog"
        aria-modal="true"
        aria-label="Índice"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-obsidian/96 backdrop-blur-xl"
      >
        <div className="mx-auto flex min-h-full max-w-[1280px] flex-col justify-between gap-16 px-5 pb-10 pt-32 md:px-10">
          <nav>
            <ol className="border-t border-line">
              {sections.map((s, i) => (
                <li key={s.href} className="border-b border-line">
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between gap-6 py-4 md:py-5"
                  >
                    <span className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-none transition-all duration-500 ease-glass group-hover:translate-x-3 group-hover:italic group-hover:text-champagne">
                      {s.label}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.16em] text-smoke">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
            <span>
              {identity.location} · {identity.coords}
            </span>
            <span className="flex gap-6">
              {contact.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link-line hover:text-champagne">
                  {l.label}
                </a>
              ))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

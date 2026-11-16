"use client";

import { useState } from "react";
import { identity, contact } from "@/lib/content";
import LocalTime from "./LocalTime";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Sem acesso à área de transferência: o email continua visível e selecionável.
    }
  };

  return (
    <section id="contacto" data-chapter="Contacto" className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{ background: "radial-gradient(60% 70% at 50% 100%, rgb(245 179 66 / 0.14), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1280px] px-5 pb-12 pt-28 md:px-10 md:pt-40">
        <p className="reveal font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">Contacto</p>

        <h2 className="reveal mt-8 max-w-[16ch] font-display text-[clamp(2.75rem,8vw,7.5rem)] font-normal leading-[0.95] tracking-[-0.025em]">
          Tens um produto que as pessoas <em className="text-sunset">ainda não percebem?</em>
        </h2>

        <div className="reveal mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:${contact.email}`}
            className="link-line font-display text-[clamp(1.5rem,3.4vw,2.75rem)] italic text-ivory hover:text-champagne"
          >
            {contact.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="glass px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-champagne transition-colors hover:text-ivory"
          >
            {copied ? "Copiado" : "Copiar email"}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email copiado" : ""}
          </span>
        </div>

        <p className="reveal mt-6 text-smoke">Respondo em menos de 24 horas.</p>

        <footer className="mt-32 grid gap-6 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-smoke md:grid-cols-3 md:items-center">
          <span>
            © {new Date().getFullYear()} {identity.name}
          </span>
          <span className="md:text-center">
            {identity.location} · <LocalTime />
          </span>
          <span className="flex gap-6 md:justify-end">
            {contact.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link-line hover:text-champagne">
                {l.label} ↗
              </a>
            ))}
          </span>
        </footer>
      </div>
    </section>
  );
}

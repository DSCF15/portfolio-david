import { method } from "@/lib/content";
import SectionHead from "./SectionHead";

export default function Method() {
  return (
    <section id="metodo" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40">
        <SectionHead id="metodo" label="Método" title="Primeiro a estratégia." accent="Depois o ecrã." />

        <ol className="reveal relative mt-16 grid gap-12 md:mt-24 md:grid-cols-4 md:gap-8">
          {/* Régua horizontal com as quatro paragens */}
          <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-gold/40 md:block" />
          {method.map((m, i) => (
            <li key={m.step} className="relative">
              <span aria-hidden="true" className="relative z-10 block size-[15px] rounded-full border border-gold bg-obsidian">
                <span className="absolute inset-[4px] rounded-full bg-gold" />
              </span>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-gold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-3xl italic">{m.step}</p>
              <p className="mt-4 max-w-[22rem] text-[0.97rem] leading-relaxed text-smoke">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

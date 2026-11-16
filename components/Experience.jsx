import { experience, education } from "@/lib/content";
import SectionHead from "./SectionHead";

export default function Experience() {
  return (
    <section id="percurso" data-chapter="Percurso" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 py-28 md:px-10 md:py-40">
        <SectionHead id="percurso" label="Percurso" title="Trabalho real," accent="com utilizadores reais." />

        {/* Estágio */}
        <div className="reveal mt-20 grid gap-10 md:mt-24 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em]">
            <p className="text-gold">{experience.period}</p>
            <p className="mt-2 text-smoke">Estágio</p>
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-tight">
              {experience.company}
            </h3>
            <p className="mt-2 text-smoke">{experience.role}</p>
            <p className="mt-6 max-w-[40rem] text-ivory/85">{experience.intro}</p>

            <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2">
              {experience.highlights.map((h) => (
                <li key={h.title} className="bg-obsidian py-7 sm:px-7 sm:[&:nth-child(odd)]:pl-0">
                  <p className="font-display text-xl italic text-champagne">{h.title}</p>
                  <p className="mt-3 text-[0.97rem] leading-relaxed text-smoke">{h.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Formação */}
        <div className="reveal mt-20 grid gap-10 md:mt-28 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">Formação</p>
          <ol className="border-t border-line">
            {education.map((e) => (
              <li
                key={e.title}
                className="grid gap-2 border-b border-line py-7 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10"
              >
                <div className="min-w-0">
                  <p className="font-display text-2xl">{e.title}</p>
                  <p className="mt-1 text-smoke">
                    {e.where} · {e.note}
                  </p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold tabular-nums md:pt-2">
                  {e.period}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

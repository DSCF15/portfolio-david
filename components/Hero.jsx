import { identity, projects } from "@/lib/content";

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 pb-24 pt-40 md:px-10 md:pb-32 md:pt-52">
        <p className="defog font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
          UX/UI · Estratégia de produto · Engenharia
        </p>

        <h1 className="relative font-display text-[clamp(3.1rem,10.5vw,10rem)] font-normal leading-[0.9] tracking-[-0.025em]">
          <span className="defog block">{identity.headline[0]}</span>
          <span className="defog-2 block italic text-champagne">{identity.headline[1]}</span>
          <span className="light-sweep" aria-hidden="true" />
        </h1>

        <div className="defog-3 grid gap-10 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <p className="max-w-[34rem] text-lg leading-relaxed text-smoke md:text-xl">{identity.intro}</p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 md:justify-end">
            {identity.available && (
              <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
                <span className="pulse-dot block size-1.5 rounded-full bg-gold" aria-hidden="true" />
                Disponível para novos projetos
              </span>
            )}
            <a
              href="#projetos"
              className="group inline-flex items-center gap-3 bg-champagne px-6 py-3.5 text-sm tracking-wide text-obsidian transition-colors duration-300 hover:bg-ivory"
            >
              Ver projetos
              <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Régua inferior: factos curtos e verificáveis */}
      <div className="defog-3 border-y border-line">
        <dl className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px bg-line font-mono text-[11px] uppercase tracking-[0.14em] md:grid-cols-4">
          {[
            ["Base", identity.location],
            ["Formação", "Eng. Informática · UMa"],
            ["Projetos", `${projects.length} em destaque`],
            ["Coordenadas", identity.coords],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1.5 bg-obsidian px-5 py-5 md:px-10">
              <dt className="text-gold">{k}</dt>
              <dd className="text-smoke">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

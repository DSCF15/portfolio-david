import { identity, projects } from "@/lib/content";
import HeroStage from "./HeroStage";

export default function Hero() {
  const { cover } = identity;

  return (
    <section id="topo" className="relative overflow-hidden">
      {/* ── Capa: fotografia em ecrã inteiro que desembacia ao abrir ── */}
      <div className="relative flex min-h-[100svh] items-end overflow-hidden">
        <div data-parallax style={{ "--depth": "-90px" }} className="absolute inset-[-6%_0]">
          <picture>
            <source media="(max-width: 767px)" srcSet={cover.srcMobile} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover.src}
              srcSet={`${cover.srcSm} 1300w, ${cover.src} 2600w`}
              sizes="100vw"
              alt={cover.alt}
              fetchPriority="high"
              className="cover-in size-full object-cover object-[50%_30%] md:object-[70%_45%]"
            />
          </picture>
        </div>

        {/* Leitura: escurece à esquerda e em baixo, deixa o jogador à luz */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/25 md:bg-gradient-to-r md:from-obsidian/95 md:via-obsidian/55 md:to-transparent"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />
        <div className="aurora opacity-70" aria-hidden="true" />

        <div className="relative mx-auto grid w-full max-w-[1280px] gap-10 px-5 pb-20 pt-40 md:px-10 md:pb-28">
          <p className="defog font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            David França · UX/UI · Estratégia de produto · Engenharia
          </p>

          <h1 className="relative max-w-[14ch] font-display text-[clamp(3rem,8.4vw,8.6rem)] font-normal leading-[0.92] tracking-[-0.025em] text-ivory">
            <span className="defog block">{identity.headline[0]}</span>
            <span className="defog-2 block italic text-sunset">{identity.headline[1]}</span>
            <span className="light-sweep" aria-hidden="true" />
          </h1>

          <div className="defog-3 grid gap-8 md:grid-cols-[minmax(0,32rem)_1fr] md:items-end">
            <p className="max-w-[32rem] text-lg leading-relaxed text-ivory/80 md:text-xl">{identity.intro}</p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-5 md:justify-end">
              {identity.available && (
                <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ivory/75">
                  <span className="pulse-dot block size-1.5 rounded-full bg-gold" aria-hidden="true" />
                  Disponível para novos projetos
                </span>
              )}
              <a
                href={identity.cv.href}
                download={identity.cv.file}
                className="group inline-flex items-center gap-3 border border-ivory/40 px-6 py-3.5 text-sm tracking-wide text-ivory backdrop-blur-sm transition-colors duration-300 hover:border-champagne hover:text-champagne"
              >
                {identity.cv.label}
                <span className="font-mono text-[10px] text-ivory/60 group-hover:text-champagne" aria-hidden="true">
                  PDF
                </span>
              </a>
              <a
                href="#projetos"
                className="group inline-flex items-center gap-3 bg-champagne px-6 py-3.5 text-sm tracking-wide text-[#17130f] transition-colors duration-300 hover:bg-ivory"
              >
                Ver projetos
                <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Indicação de scroll */}
        <div
          aria-hidden="true"
          className="defog-3 absolute bottom-8 right-5 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/60 md:right-10 md:flex"
        >
          Scroll
          <span className="relative block h-12 w-px overflow-hidden bg-ivory/20">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-champagne" />
          </span>
        </div>
      </div>

      {/* Montra: ecrãs reais dos projetos */}
      <div className="pb-20 pt-6 md:pb-28">
        <HeroStage />
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

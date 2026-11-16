import { about } from "@/lib/content";

/** "Sobre mim": retrato com paralaxe dentro da moldura, texto curto e factos. */
export default function About() {
  return (
    <section id="sobre" data-chapter="Sobre mim" className="theme-cream relative overflow-hidden">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 py-28 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:px-10 md:py-40">
        {/* Retrato */}
        <div className="reveal relative mx-auto w-full max-w-[460px]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] shadow-[0_40px_90px_-30px_rgb(29_24_18/0.45)]">
            <div data-parallax style={{ "--depth": "-36px" }} className="absolute inset-[-8%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.photo.src}
                alt={about.photo.alt}
                width={1200}
                height={1600}
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-[50%_35%]"
              />
            </div>
          </div>
          {/* Etiqueta sobre a fotografia */}
          <p className="absolute -bottom-5 left-5 bg-ivory px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-obsidian md:-left-6">
            David França · Caniço
          </p>
          {/* Selo rotativo */}
          <div aria-hidden="true" className="absolute -right-6 -top-6 hidden size-28 md:block">
            <svg viewBox="0 0 100 100" className="spin-slow size-full">
              <defs>
                <path id="selo" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <circle cx="50" cy="50" r="48" fill="var(--color-gold)" />
              <text fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.9" fill="var(--color-obsidian)">
                <textPath href="#selo">PRODUCT DESIGNER · MADEIRA · </textPath>
              </text>
              <text x="50" y="57" textAnchor="middle" fontFamily="var(--font-display)" fontStyle="italic" fontSize="22" fill="var(--color-obsidian)">
                DF
              </text>
            </svg>
          </div>
        </div>

        {/* Texto */}
        <div className="min-w-0">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">Sobre mim</p>
          <h2 className="reveal mt-6 font-display text-[clamp(2.1rem,4.4vw,3.9rem)] font-normal leading-[1.05] tracking-[-0.02em]">
            {about.lead}
          </h2>
          <div className="reveal mt-8 grid max-w-[38rem] gap-5 text-[1.05rem] leading-relaxed text-smoke">
            {about.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <dl className="reveal mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {about.facts.map(([k, v]) => (
              <div key={k} className="bg-obsidian px-4 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">{k}</dt>
                <dd className="mt-1.5 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

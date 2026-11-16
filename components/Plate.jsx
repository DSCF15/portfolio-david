/**
 * Ilustrações abstratas de cada projeto, desenhadas em HTML/CSS.
 * Servem enquanto não houver capturas de ecrã reais: basta trocar
 * por <img> quando existirem.
 */

function Rhythm() {
  const lanes = [
    { delay: "0s", tone: "bg-champagne" },
    { delay: "-1.1s", tone: "bg-gold" },
    { delay: "-2.3s", tone: "bg-ivory/80" },
    { delay: "-0.6s", tone: "bg-gold/70" },
  ];
  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-3 px-[12%] pb-[14%] pt-[8%]">
      {lanes.map((l, i) => (
        <div key={i} className="relative overflow-hidden border-x border-ivory/5">
          <span
            className={`lane-note absolute left-1/2 top-0 block size-7 -translate-x-1/2 rounded-full ${l.tone} shadow-[0_0_24px_rgb(201_164_92/0.45)]`}
            style={{ animationDelay: l.delay }}
          />
          <span className="absolute bottom-[6%] left-1/2 block size-9 -translate-x-1/2 rounded-full border border-champagne/50" />
        </div>
      ))}
      <span className="absolute inset-x-[12%] bottom-[calc(14%+1.6rem)] h-px bg-gold/40" />
      <span className="absolute bottom-[5%] left-[12%] font-mono text-[10px] uppercase tracking-[0.16em] text-smoke">
        ♪ Toca quando o círculo chegar
      </span>
    </div>
  );
}

function Calendar() {
  const booked = [
    [0, 1, 2, "Corte"],
    [1, 3, 1, "Barba"],
    [2, 0, 2, "Corte + barba"],
    [3, 4, 1, "Corte"],
    [4, 2, 2, "Coloração"],
  ];
  return (
    <div className="absolute inset-0 flex flex-col px-[8%] py-[7%]">
      <div className="mb-4 flex gap-2 font-mono text-[10px] tracking-[0.08em]">
        <span className="border border-gold/50 px-2 py-1 text-champagne">barbeariaj.</span>
        <span className="border border-ivory/10 px-2 py-1 text-smoke">camacha.</span>
        <span className="border border-ivory/10 px-2 py-1 text-smoke">+ novo salão</span>
      </div>
      <div className="relative grid flex-1 grid-cols-5 grid-rows-6 border-l border-t border-ivory/10">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="border-b border-r border-ivory/10" />
        ))}
        {booked.map(([col, row, span, label], i) => (
          <span
            key={i}
            className="absolute m-[3px] overflow-hidden border-l-2 border-gold bg-gold/15 px-1.5 py-1 font-mono text-[9px] leading-tight text-champagne"
            style={{
              left: `${col * 20}%`,
              top: `${(row / 6) * 100}%`,
              width: "calc(20% - 6px)",
              height: `calc(${(span / 6) * 100}% - 6px)`,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Orders() {
  const rows = [
    ["Bolo de mel · 1 kg", "Sáb 10:00", "Confirmada"],
    ["Cabaz Tradição", "Sáb 11:30", "Pendente"],
    ["Bolo de mel · 500 g", "Dom 09:00", "Confirmada"],
    ["Bolo de mel · 2 kg", "Dom 12:00", "Pronta"],
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2 px-[9%]">
      <div className="mb-2 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">
        <span>Encomendas · fim de semana</span>
        <span className="text-gold">4</span>
      </div>
      {rows.map(([item, when, state], i) => (
        <div
          key={item}
          className={`flex items-center justify-between gap-4 border px-3 py-2.5 text-[12px] ${
            i === 1 ? "border-gold/50 bg-gold/10" : "border-ivory/10 bg-ivory/[0.02]"
          }`}
        >
          <span className="truncate text-ivory">{item}</span>
          <span className="flex shrink-0 items-center gap-3 font-mono text-[10px] text-smoke">
            {when}
            <span className={i === 1 ? "text-champagne" : ""}>{state}</span>
          </span>
        </div>
      ))}
      <div className="mt-2 font-mono text-[10px] text-smoke/70">api · raspberry-pi · online</div>
    </div>
  );
}

function Brands() {
  const names = ["Oficina", "Lavagem", "Energia", "Eventos", "Snack-bar", "Mr. Pizza"];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square w-[min(78%,320px)]">
        <span className="absolute inset-[18%] rounded-full border border-ivory/10" />
        <span className="absolute inset-[34%] grid place-items-center rounded-full border border-gold/50 bg-gold/10 font-display text-[clamp(14px,2.2vw,22px)] italic text-champagne">
          Cassiano&apos;s
        </span>
        {names.map((n, i) => {
          const a = (i / names.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <span
              key={n}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-ivory/10 bg-obsidian/70 px-2 py-1 font-mono text-[10px] tracking-[0.06em] text-smoke"
              style={{ left: `${50 + Math.cos(a) * 41}%`, top: `${50 + Math.sin(a) * 41}%` }}
            >
              {n}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const plates = { rhythm: Rhythm, calendar: Calendar, orders: Orders, brands: Brands };

export default function Plate({ kind, label }) {
  const Art = plates[kind];
  return (
    <div
      role="img"
      aria-label={label}
      className="glass relative aspect-[4/3] w-full max-w-full overflow-hidden bg-basalt"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(70% 60% at 80% 0%, rgb(245 179 66 / 0.16), transparent 70%), radial-gradient(60% 50% at 0% 100%, rgb(250 244 234 / 0.04), transparent 70%)",
        }}
      />
      {Art && <Art />}
    </div>
  );
}

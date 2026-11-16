/** Cabeçalho de secção: rótulo em mono à esquerda, título editorial à direita. */
export default function SectionHead({ id, label, title, accent, children }) {
  return (
    <div className="reveal grid gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
      <p id={id ? `${id}-label` : undefined} className="pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
        {label}
      </p>
      <div className="max-w-[52rem]">
        <h2 className="font-display text-[clamp(2.25rem,5.2vw,4.5rem)] font-normal leading-[1] tracking-[-0.02em]">
          {title} {accent && <em className="text-champagne">{accent}</em>}
        </h2>
        {children && <div className="mt-6 max-w-[38rem] text-smoke">{children}</div>}
      </div>
    </div>
  );
}

/**
 * Molduras discretas para capturas de ecrã: janela de browser e telemóvel.
 * As imagens vivem em /public/work/<projeto>/.
 */

export function BrowserFrame({ src, alt, url, className = "", priority = false }) {
  return (
    <figure className={`glass overflow-hidden bg-basalt ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-ivory/15" />
          <span className="size-2 rounded-full bg-ivory/15" />
          <span className="size-2 rounded-full bg-ivory/15" />
        </span>
        {url && (
          <span className="mx-auto truncate rounded-sm bg-ivory/[0.04] px-3 py-0.5 font-mono text-[10px] tracking-[0.06em] text-smoke">
            {url}
          </span>
        )}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={1440}
        height={900}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </figure>
  );
}

export function PhoneFrame({ src, alt, className = "" }) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.6rem] border border-champagne/25 bg-obsidian p-1.5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={390}
        height={844}
        loading="lazy"
        decoding="async"
        className="block aspect-[390/844] w-full rounded-[1.25rem] object-cover object-top"
      />
    </figure>
  );
}

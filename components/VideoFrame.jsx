"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vídeo de navegação num site, dentro de uma moldura de browser.
 * - Toca sozinho (sem som) só quando está visível e pausa quando sai do ecrã.
 * - Clicar pausa ou retoma; com "reduzir movimento" fica parado até ser pedido.
 * - Uma barra fina mostra o progresso.
 */
export default function VideoFrame({ video, label, title }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const userPaused = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) userPaused.current = true;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused.current) el.play().catch(() => {});
        else if (!e.isIntersecting) el.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("timeupdate", onTime);
    return () => {
      io.disconnect();
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  return (
    <figure className="glass overflow-hidden bg-basalt">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-ivory/15" />
          <span className="size-2 rounded-full bg-ivory/15" />
          <span className="size-2 rounded-full bg-ivory/15" />
        </span>
        <span className="mx-auto truncate rounded-sm bg-ivory/[0.04] px-3 py-0.5 font-mono text-[10px] tracking-[0.06em] text-smoke">
          {label}
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">
          <span
            className={`block size-1.5 rounded-full ${playing ? "pulse-dot bg-coral" : "bg-ivory/30"}`}
            aria-hidden="true"
          />
          {playing ? "A navegar" : "Em pausa"}
        </span>
      </div>

      <button
        type="button"
        onClick={toggle}
        data-cursor={playing ? "Pausar" : "Ver"}
        aria-label={playing ? `Pausar o vídeo de ${title}` : `Ver o vídeo de ${title}`}
        className="group relative block w-full"
      >
        <video
          ref={ref}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="block aspect-[16/9] w-full bg-obsidian object-cover object-top"
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>

        {/* Botão de play visível quando está em pausa */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 grid place-items-center bg-obsidian/30 transition-opacity duration-500 ${
            playing ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <span className="grid size-16 place-items-center rounded-full border border-champagne/50 bg-obsidian/70 text-xl text-champagne backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            ▶
          </span>
        </span>

        {/* Progresso */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-ivory/10">
          <span className="block h-full origin-left bg-gold" style={{ transform: `scaleX(${progress})` }} />
        </span>
      </button>

      {video.caption && (
        <figcaption className="border-t border-line px-4 py-2.5 text-xs text-smoke">{video.caption}</figcaption>
      )}
    </figure>
  );
}

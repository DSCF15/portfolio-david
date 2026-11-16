"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/**
 * Visualizador de imagens em ecrã inteiro.
 * Qualquer componente abre-o com useLightbox().open(lista, índice).
 * Teclado: ← → para navegar, Esc para fechar.
 */
const LightboxContext = createContext({ open: () => {} });
export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }) {
  const [state, setState] = useState(null); // { items, index }
  const closeRef = useRef(null);
  const returnFocus = useRef(null);

  const open = useCallback((items, index = 0) => {
    returnFocus.current = document.activeElement;
    setState({ items, index });
  }, []);
  const close = useCallback(() => {
    setState(null);
    returnFocus.current?.focus?.();
  }, []);
  const step = useCallback(
    (d) => setState((s) => (s ? { ...s, index: (s.index + d + s.items.length) % s.items.length } : s)),
    []
  );

  useEffect(() => {
    if (!state) return;
    const lenis = window.__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [state, close, step]);

  const item = state?.items[state.index];

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {state && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Imagem do projeto"
          className="fixed inset-0 z-[80] flex flex-col bg-obsidian/95 backdrop-blur-xl"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="flex items-center justify-between gap-6 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-smoke md:px-10">
            <span className="truncate">
              {item.project && <span className="text-gold">{item.project}</span>}
              <span className="ml-3 tabular-nums">
                {state.index + 1} / {state.items.length}
              </span>
            </span>
            <button ref={closeRef} type="button" onClick={close} className="link-line text-ivory hover:text-champagne">
              Fechar · Esc
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-5 md:px-20"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className="showcase-slide max-h-full max-w-full border border-line object-contain shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)]"
            />
            {state.items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Imagem anterior"
                  className="glass absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center text-champagne md:left-6"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Imagem seguinte"
                  className="glass absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center text-champagne md:right-6"
                >
                  →
                </button>
              </>
            )}
          </div>

          <p className="mx-auto max-w-[60ch] px-5 py-5 text-center text-sm text-smoke">{item.caption || item.alt}</p>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

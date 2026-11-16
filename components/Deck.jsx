"use client";

import { rooms } from "@/lib/rooms";
import { identity } from "@/lib/content";

// Barra de navegação da consola: lateral no desktop, inferior no telemóvel.
export default function Deck({ active, go, openPalette }) {
  return (
    <>
      <nav
        aria-label="Salas"
        className="fixed left-0 top-0 z-40 hidden h-screen w-56 flex-col justify-between border-r border-rule/70 bg-abyss/70 px-6 py-8 backdrop-blur-md lg:flex"
      >
        <div>
          <button onClick={() => go("topo")} className="text-left font-display text-lg font-semibold tracking-wide text-ink">
            {identity.handle}
            <span className="text-amber">_</span>
          </button>
          <ul className="mt-12 space-y-1">
            {rooms.map((r) => {
              const on = active === r.id;
              return (
                <li key={r.id}>
                  <button
                    onClick={() => go(r.id)}
                    aria-current={on ? "true" : undefined}
                    className={`group flex w-full items-center gap-3 py-2 text-left text-[15px] transition-colors ${
                      on ? "text-ink" : "text-mist hover:text-ink"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition-all ${
                        on ? "bg-amber shadow-[0_0_10px_#ffb547]" : "bg-rule group-hover:bg-amber-dim"
                      }`}
                    />
                    {r.label}
                    <kbd className="ml-auto font-mono text-xs text-mist/50">{r.key}</kbd>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="space-y-4 text-sm text-mist">
          <button
            onClick={openPalette}
            className="flex w-full items-center justify-between border border-rule px-3 py-2 text-left hover:border-amber-dim hover:text-ink"
          >
            Procurar
            <kbd className="font-mono text-xs text-mist/60">Ctrl K</kbd>
          </button>
          <p className="font-mono text-xs leading-5 text-mist/60">
            {identity.coords}
          </p>
        </div>
      </nav>

      <nav
        aria-label="Salas"
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-rule bg-abyss/90 backdrop-blur-md lg:hidden"
      >
        {rooms.map((r) => {
          const on = active === r.id;
          return (
            <button
              key={r.id}
              onClick={() => go(r.id)}
              aria-current={on ? "true" : undefined}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-[11px] ${on ? "text-amber" : "text-mist"}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-amber" : "bg-rule"}`} />
              {r.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}

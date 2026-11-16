"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { identity, projects } from "@/lib/content";

const LINES = [
  "a ligar consola dscf15 …",
  "a carregar identidade ……………… ok",
  "a ligar rede neuronal ……………… ok",
  `a montar ${projects.length} projetos …………… ok`,
  `localização: ${identity.location}`,
  "sistema pronto.",
];

export default function BootSequence({ onDone }) {
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 250 : 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setOpen(false), 450);
    return () => clearTimeout(t);
  }, [shown]);

  useEffect(() => {
    const skip = () => setOpen(false);
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-abyss px-6"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5 }}
          onClick={() => setOpen(false)}
          role="status"
          aria-live="polite"
        >
          <div className="w-full max-w-md font-mono text-sm leading-7 text-mist">
            {LINES.slice(0, shown).map((l, i) => (
              <div key={i} className={i === LINES.length - 1 ? "text-amber" : undefined}>
                <span className="mr-3 text-amber-dim">&gt;</span>
                {l}
              </div>
            ))}
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-amber" />
            <p className="mt-8 text-xs text-mist/60">Carrega em qualquer tecla para saltar</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { rooms } from "@/lib/rooms";
import { contact, projects } from "@/lib/content";

export default function CommandPalette({ open, onClose, go, openProject }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef(null);

  const items = useMemo(() => {
    const all = [
      ...rooms.map((r) => ({ label: `Ir para ${r.label}`, hint: "sala", run: () => go(r.id) })),
      ...projects.map((p) => ({ label: p.name, hint: "projeto", run: () => openProject(p.id) })),
      { label: "Abrir GitHub", hint: "link", run: () => window.open(contact.github, "_blank") },
      { label: "Abrir LinkedIn", hint: "link", run: () => window.open(contact.linkedin, "_blank") },
      ...(contact.email
        ? [{ label: "Enviar email", hint: "link", run: () => (window.location.href = `mailto:${contact.email}`) }]
        : []),
    ];
    const s = q.trim().toLowerCase();
    return s ? all.filter((i) => i.label.toLowerCase().includes(s)) : all;
  }, [q, go, openProject]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => input.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => setSel(0), [q]);

  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && items[sel]) {
      items[sel].run();
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-abyss/70 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-label="Procurar na consola"
            className="bracket w-full max-w-lg border border-rule bg-hull shadow-2xl"
            initial={{ y: -12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-rule px-4">
              <span className="font-mono text-amber">&gt;</span>
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Escreve uma sala, projeto ou link"
                className="w-full bg-transparent py-4 text-ink placeholder:text-mist/60 focus:outline-none"
                aria-label="Procurar"
              />
            </div>
            <ul className="max-h-80 overflow-y-auto py-2" role="listbox">
              {items.length === 0 && <li className="px-4 py-3 text-mist">Nada encontrado. Tenta outro termo.</li>}
              {items.map((it, i) => (
                <li key={it.label} role="option" aria-selected={i === sel}>
                  <button
                    onMouseEnter={() => setSel(i)}
                    onClick={() => {
                      it.run();
                      onClose();
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left ${
                      i === sel ? "bg-panel text-ink" : "text-mist"
                    }`}
                  >
                    {it.label}
                    <span className="text-xs text-mist/60">{it.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

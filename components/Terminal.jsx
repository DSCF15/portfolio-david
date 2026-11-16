"use client";

import { useEffect, useRef, useState } from "react";
import { contact, identity, projects, skills } from "@/lib/content";

const link = (href, text) => ({ href, text });

function respond(cmd, go) {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "":
      return [];
    case "ajuda":
    case "help":
      return [
        "comandos disponíveis:",
        "  quem      — quem sou",
        "  projetos  — lista de projetos",
        "  stack     — tecnologias",
        "  github    — abrir o GitHub",
        "  linkedin  — abrir o LinkedIn",
        ...(contact.email ? ["  email     — enviar email"] : []),
        "  limpar    — limpar o ecrã",
      ];
    case "quem":
    case "whoami":
      return [`${identity.name} — ${identity.role}`, identity.status, identity.location];
    case "projetos":
      go("projetos");
      return projects.map((p) => `  [${p.status}] ${p.name}`);
    case "stack":
      return skills.map((s) => `  ${s.group}: ${s.items.join(", ")}`);
    case "github":
      window.open(contact.github, "_blank");
      return [link(contact.github, "a abrir GitHub …")];
    case "linkedin":
      window.open(contact.linkedin, "_blank");
      return [link(contact.linkedin, "a abrir LinkedIn …")];
    case "email":
      if (contact.email) {
        window.location.href = `mailto:${contact.email}`;
        return [link(`mailto:${contact.email}`, contact.email)];
      }
      return ["email ainda não configurado. usa o linkedin."];
    case "sudo":
    case "sudo contratar":
      return ["permissão concedida. escreve linkedin para falarmos."];
    default:
      return [`comando não encontrado: ${c}. escreve ajuda para ver a lista.`];
  }
}

export default function Terminal({ go }) {
  const [history, setHistory] = useState([
    { type: "out", lines: ["ligação estabelecida. escreve ajuda para começar."] },
  ]);
  const [value, setValue] = useState("");
  const [past, setPast] = useState([]);
  const [idx, setIdx] = useState(-1);
  const body = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [history]);

  const run = (cmd) => {
    if (["limpar", "clear"].includes(cmd.trim().toLowerCase())) {
      setHistory([]);
    } else {
      setHistory((h) => [...h, { type: "in", text: cmd }, { type: "out", lines: respond(cmd, go) }]);
    }
    if (cmd.trim()) setPast((p) => [cmd, ...p]);
    setIdx(-1);
    setValue("");
  };

  const onKey = (e) => {
    if (e.key === "Enter") run(value);
    if (e.key === "ArrowUp" && past.length) {
      e.preventDefault();
      const n = Math.min(idx + 1, past.length - 1);
      setIdx(n);
      setValue(past[n]);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = idx - 1;
      setIdx(n);
      setValue(n >= 0 ? past[n] : "");
    }
  };

  return (
    <div
      className="bracket border border-rule bg-hull/80 font-mono text-sm"
      onClick={() => input.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-rule px-4 py-2 text-xs text-mist">
        <span>ligação segura · {identity.handle}@consola</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tide" /> online
        </span>
      </div>
      <div ref={body} className="h-72 overflow-y-auto px-4 py-3 leading-6" data-lenis-prevent>
        {history.map((h, i) =>
          h.type === "in" ? (
            <div key={i} className="text-ink">
              <span className="text-amber">visitante $</span> {h.text}
            </div>
          ) : (
            <div key={i} className="mb-2 whitespace-pre-wrap text-mist">
              {h.lines.map((l, j) =>
                typeof l === "string" ? (
                  <div key={j}>{l}</div>
                ) : (
                  <a key={j} href={l.href} className="block text-tide underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
                    {l.text}
                  </a>
                )
              )}
            </div>
          )
        )}
        <div className="flex items-center text-ink">
          <label htmlFor="term" className="mr-2 shrink-0 text-amber">
            visitante $
          </label>
          <input
            id="term"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            spellCheck="false"
            className="w-full bg-transparent caret-amber focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-rule px-4 py-3">
        {["ajuda", "quem", "projetos", "stack", "linkedin"].map((c) => (
          <button
            key={c}
            onClick={(e) => {
              e.stopPropagation();
              run(c);
            }}
            className="border border-rule px-2.5 py-1 text-xs text-mist hover:border-amber-dim hover:text-ink"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

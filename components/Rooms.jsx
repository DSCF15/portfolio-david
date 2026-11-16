"use client";

import { AnimatePresence, motion } from "framer-motion";
import { certifications, contact, identity, projects, skills, timeline } from "@/lib/content";
import Terminal from "./Terminal";

export function Room({ id, title, lead, children }) {
  return (
    <section id={id} className="scroll-mt-0 border-t border-rule/60 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <header className="mb-12 max-w-2xl">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h2>
        {lead && <p className="mt-4 text-lg text-mist">{lead}</p>}
      </header>
      {children}
    </section>
  );
}

export function IdentityRoom() {
  return (
    <Room id="identidade" title="Identidade">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,38rem)_1fr]">
        <div className="space-y-5 text-[1.125rem] leading-[1.7] text-ink/90">
          {identity.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <dl className="bracket h-fit space-y-5 border border-rule bg-hull/60 p-6 text-sm">
          {[
            ["Função", identity.role],
            ["Formação", identity.status],
            ["Base", identity.location],
            ["Coordenadas", identity.coords],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3">
              <dt className="text-mist">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
          {identity.available && (
            <div className="grid grid-cols-[7.5rem_1fr] gap-3">
              <dt className="text-mist">Estado</dt>
              <dd className="flex items-center gap-2 text-tide">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tide" />
                Disponível para projetos
              </dd>
            </div>
          )}
        </dl>
      </div>
    </Room>
  );
}

export function SkillsRoom() {
  return (
    <Room id="skills" title="Skills" lead="As ferramentas com que construo, agrupadas por camada do produto.">
      <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
        {skills.map((g) => (
          <div key={g.group}>
            <h3 className="mb-5 flex items-center gap-3 font-display text-xl font-medium text-amber">
              <span className="hex inline-block h-4 w-[18px] bg-amber" />
              {g.group}
            </h3>
            <ul className="flex flex-wrap gap-x-1 gap-y-1.5">
              {g.items.map((s) => (
                <li key={s} className="hex bg-rule p-px">
                  <span className="hex flex h-11 items-center bg-hull px-7 text-[15px] text-ink transition-colors hover:bg-panel">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Room>
  );
}

export function TimelineRoom() {
  return (
    <Room id="percurso" title="Percurso">
      <ol className="relative max-w-3xl border-l border-rule pl-8">
        {timeline.map((t) => (
          <li key={t.title} className="relative pb-14 last:pb-0">
            <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 rotate-45 border border-amber bg-abyss" />
            <p className="font-mono text-sm text-amber">{t.when}</p>
            <h3 className="mt-1 font-display text-2xl font-medium text-ink">{t.title}</h3>
            <p className="text-mist">{t.where}</p>
            <p className="mt-3 max-w-[62ch] text-ink/85">{t.text}</p>
          </li>
        ))}
      </ol>
    </Room>
  );
}

const statusStyle = {
  online: "text-tide border-tide/40",
  "em curso": "text-amber border-amber/40",
  proposta: "text-mist border-rule",
};

export function ProjectsRoom({ openId, setOpenId }) {
  const current = projects.find((p) => p.id === openId) ?? projects[0];
  return (
    <Room id="projetos" title="Projetos" lead="Escolhe um projeto para abrir o relatório.">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_1fr]">
        <ul className="divide-y divide-rule border-y border-rule" role="tablist" aria-label="Projetos">
          {projects.map((p) => {
            const on = current.id === p.id;
            return (
              <li key={p.id}>
                <button
                  role="tab"
                  aria-selected={on}
                  aria-controls="relatorio"
                  onClick={() => setOpenId(p.id)}
                  className={`group flex w-full items-center gap-4 py-5 pr-3 text-left transition-colors ${
                    on ? "bg-hull pl-4" : "pl-0 hover:pl-2"
                  }`}
                  style={{ transitionProperty: "padding, background-color" }}
                >
                  <span className={`h-8 w-[3px] ${on ? "bg-amber" : "bg-transparent"}`} />
                  <span className="flex-1">
                    <span className={`block font-display text-lg ${on ? "text-ink" : "text-ink/80"}`}>{p.name}</span>
                    <span className="mt-0.5 block text-sm text-mist">{p.summary}</span>
                  </span>
                  <span className={`shrink-0 border px-2 py-0.5 text-xs ${statusStyle[p.status]}`}>{p.status}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div id="relatorio" role="tabpanel" className="bracket min-h-[22rem] border border-rule bg-hull/70 p-7 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.article
              key={current.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-display text-3xl font-semibold text-ink">{current.name}</h3>
              <p className="mt-3 max-w-[60ch] text-lg text-mist">{current.summary}</p>
              <ul className="mt-8 space-y-3">
                {current.details.map((d) => (
                  <li key={d} className="flex gap-3 text-ink/90">
                    <span className="mt-2.5 h-1 w-3 shrink-0 bg-amber" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {current.stack.map((s) => (
                  <span key={s} className="border border-rule px-2.5 py-1 font-mono text-xs text-mist">
                    {s}
                  </span>
                ))}
              </div>
              {current.link && (
                <a
                  href={current.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-2 bg-amber px-5 py-2.5 font-display font-semibold text-abyss hover:bg-ink"
                >
                  Visitar {new URL(current.link).hostname}
                </a>
              )}
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </Room>
  );
}

export function CertificationsRoom() {
  if (!certifications.length) return null;
  return (
    <Room id="certificacoes" title="Certificações">
      <ul className="grid max-w-4xl gap-px border border-rule bg-rule sm:grid-cols-2">
        {certifications.map((c) => (
          <li key={c.name} className="bg-abyss p-6">
            <p className="font-display text-lg text-ink">{c.name}</p>
            <p className="mt-1 text-sm text-mist">
              {c.issuer}, {c.year}
            </p>
            {c.link && (
              <a href={c.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-tide hover:underline">
                Ver credencial
              </a>
            )}
          </li>
        ))}
      </ul>
    </Room>
  );
}

export function ContactRoom({ go }) {
  return (
    <Room id="contacto" title="Contacto" lead="Fala comigo pela consola ou pelos links abaixo.">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,40rem)_1fr]">
        <Terminal go={go} />
        <ul className="flex flex-col justify-end gap-4 font-display text-2xl sm:text-3xl">
          {[
            ["LinkedIn", contact.linkedin],
            ["GitHub", contact.github],
            ...(contact.email ? [[contact.email, `mailto:${contact.email}`]] : []),
          ].map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="text-ink underline decoration-rule decoration-1 underline-offset-8 transition-colors hover:text-amber hover:decoration-amber"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mt-6 font-sans text-sm text-mist">
            {identity.name}, {new Date().getFullYear()}. Feito na Madeira.
          </li>
        </ul>
      </div>
    </Room>
  );
}

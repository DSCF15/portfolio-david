"use client";

import dynamic from "next/dynamic";
import { ReactLenis, useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { identity } from "@/lib/content";
import { rooms } from "@/lib/rooms";
import BootSequence from "./BootSequence";
import CommandPalette from "./CommandPalette";
import Decode from "./Decode";
import Deck from "./Deck";
import {
  CertificationsRoom,
  ContactRoom,
  IdentityRoom,
  ProjectsRoom,
  SkillsRoom,
  TimelineRoom,
} from "./Rooms";

const NeuralField = dynamic(() => import("./NeuralField"), { ssr: false });

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Station({ reduced }) {
  const lenis = useLenis();
  const [booting, setBooting] = useState(null); // null = ainda a decidir
  const [active, setActive] = useState("topo");
  const [palette, setPalette] = useState(false);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("booted") === "1";
      sessionStorage.setItem("booted", "1");
    } catch {}
    setBooting(!(seen || reduced));
  }, [reduced]);

  const go = useCallback(
    (id) => {
      const el = id === "topo" ? 0 : document.getElementById(id);
      if (lenis) lenis.scrollTo(el, { duration: 1.2 });
      else if (el === 0) window.scrollTo({ top: 0 });
      else el?.scrollIntoView();
    },
    [lenis]
  );

  const openProject = useCallback(
    (id) => {
      setProjectId(id);
      go("projetos");
    },
    [go]
  );

  // Sala ativa conforme o scroll
  useEffect(() => {
    const ids = ["topo", ...rooms.map((r) => r.id)];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Atalhos: Ctrl/Cmd+K abre a pesquisa, números saltam entre salas
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
        return;
      }
      const tag = document.activeElement?.tagName;
      if (palette || tag === "INPUT" || tag === "TEXTAREA" || booting) return;
      const room = rooms.find((r) => r.key === e.key);
      if (room) go(room.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, palette, booting]);

  const ready = booting === false;

  return (
    <>
      {booting && <BootSequence onDone={() => setBooting(false)} />}

      <Deck active={active} go={go} openPalette={() => setPalette(true)} />
      <CommandPalette open={palette} onClose={() => setPalette(false)} go={go} openProject={openProject} />

      <main className="pb-16 lg:pb-0 lg:pl-56">
        <section id="topo" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 sm:px-10 lg:px-16 lg:pb-20">
          <div className="absolute inset-0">
            {booting !== null && <NeuralField still={reduced} />}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent" />

          <div className="relative max-w-5xl">
            <motion.p
              className="mb-6 flex items-center gap-3 font-mono text-sm text-mist"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tide" />
              {identity.role} em {identity.location}
            </motion.p>
            <h1 className="font-display text-[clamp(3.25rem,10vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.02em] text-ink">
              <Decode text={identity.name} start={ready && !reduced} />
            </h1>
            <motion.p
              className="mt-8 max-w-[34ch] text-xl leading-snug text-ink/85 sm:text-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {identity.tagline}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
            >
              <button
                onClick={() => go("projetos")}
                className="bg-amber px-6 py-3 font-display text-lg font-semibold text-abyss transition-colors hover:bg-ink"
              >
                Ver projetos
              </button>
              <button
                onClick={() => setPalette(true)}
                className="flex items-center gap-3 border border-rule px-6 py-3 font-display text-lg text-ink transition-colors hover:border-amber-dim"
              >
                Abrir consola
                <kbd className="hidden font-mono text-xs text-mist sm:inline">Ctrl K</kbd>
              </button>
            </motion.div>
          </div>
        </section>

        <IdentityRoom />
        <SkillsRoom />
        <TimelineRoom />
        <ProjectsRoom openId={projectId} setOpenId={setProjectId} />
        <CertificationsRoom />
        <ContactRoom go={go} />
      </main>
    </>
  );
}

export default function Console() {
  const reduced = useReducedMotion();
  if (reduced) return <Station reduced />;
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      <Station reduced={false} />
    </ReactLenis>
  );
}

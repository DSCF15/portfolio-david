"use client";

import { useEffect, useState } from "react";
import { identity } from "@/lib/content";

/** Hora atual na Madeira, atualizada a cada 30 s. Vazia até o browser a calcular. */
export default function LocalTime({ className = "" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: identity.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className={`tabular-nums ${className}`} suppressHydrationWarning>
      {time || "--:--"}
    </time>
  );
}

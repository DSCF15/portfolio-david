"use client";

import { useEffect, useState } from "react";

const GLYPHS = "▓▒░<>/\\_-=+*#01";

// Texto que "descodifica" de símbolos para letras, da esquerda para a direita.
export default function Decode({ text, start = true, speed = 28, className }) {
  const [out, setOut] = useState(start ? "" : text);

  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 2);
      setOut(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealed) return ch;
            if (i < revealed + 6) return GLYPHS[(i * 7 + frame) % GLYPHS.length];
            return " ";
          })
          .join("")
      );
      if (revealed >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

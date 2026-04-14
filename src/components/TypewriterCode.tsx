import { useState, useEffect } from "react";

const lines = [
  { num: 1, parts: [{ text: "# Meu primeiro programa", cls: "text-muted-foreground italic" }] },
  { num: 2, parts: [{ text: "nome = ", cls: "text-foreground" }, { text: '"Você"', cls: "text-primary font-bold" }] },
  { num: 3, parts: [{ text: "print", cls: "text-accent" }, { text: "(", cls: "text-foreground" }, { text: "f\"Fala, {nome}!\"", cls: "text-primary" }, { text: ")", cls: "text-foreground" }] },
];

export default function CodeBlock() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible < lines.length) {
      const t = setTimeout(() => setVisible(v => v + 1), 500);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div className="border-2 border-foreground bg-background">
      <div className="border-b-2 border-foreground px-4 py-2 flex items-center justify-between">
        <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">ola.py</span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 border border-foreground" />
          <div className="w-2.5 h-2.5 border border-foreground" />
          <div className="w-2.5 h-2.5 bg-foreground" />
        </div>
      </div>
      <div className="p-5 font-mono text-sm space-y-1 min-h-[140px]">
        {lines.slice(0, visible).map((line) => (
          <div key={line.num} className="flex gap-4">
            <span className="text-muted-foreground select-none w-4 text-right">{line.num}</span>
            <span>
              {line.parts.map((p, j) => (
                <span key={j} className={p.cls}>{p.text}</span>
              ))}
            </span>
          </div>
        ))}
        {visible < lines.length && (
          <div className="flex gap-4">
            <span className="text-muted-foreground select-none w-4 text-right">{visible + 1}</span>
            <span className="w-2.5 h-5 bg-foreground animate-blink" />
          </div>
        )}
        {visible >= lines.length && (
          <div className="mt-4 pt-3 border-t-2 border-dashed border-foreground/20">
            <div className="flex gap-4">
              <span className="text-muted-foreground select-none w-4 text-right">→</span>
              <span className="text-primary font-bold">Fala, Você!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

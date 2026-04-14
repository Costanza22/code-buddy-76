import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const lines = [
  { num: 1, parts: [{ text: "# Meu primeiro programa", cls: "text-muted-foreground italic" }] },
  { num: 2, parts: [{ text: "nome = ", cls: "text-foreground" }, { text: '"Você"', cls: "text-primary font-bold" }] },
  { num: 3, parts: [{ text: "print", cls: "text-accent" }, { text: "(", cls: "text-foreground" }, { text: 'f"Fala, {nome}!"', cls: "text-primary" }, { text: ")", cls: "text-foreground" }] },
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
    <motion.div
      className="border-2 border-border bg-card"
      initial={{ opacity: 0, y: 40, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: -1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.3 } }}
    >
      <div className="border-b-2 border-border px-4 py-2 flex items-center justify-between">
        <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">ola.py</span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 border border-border" />
          <div className="w-2.5 h-2.5 border border-border" />
          <div className="w-2.5 h-2.5 bg-foreground" />
        </div>
      </div>
      <div className="p-5 font-mono text-sm space-y-1 min-h-[140px]">
        {lines.slice(0, visible).map((line, i) => (
          <motion.div
            key={line.num}
            className="flex gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <span className="text-muted-foreground select-none w-4 text-right">{line.num}</span>
            <span>
              {line.parts.map((p, j) => (
                <span key={j} className={p.cls}>{p.text}</span>
              ))}
            </span>
          </motion.div>
        ))}
        {visible < lines.length && (
          <div className="flex gap-4">
            <span className="text-muted-foreground select-none w-4 text-right">{visible + 1}</span>
            <span className="w-2.5 h-5 bg-primary animate-blink" />
          </div>
        )}
        {visible >= lines.length && (
          <motion.div
            className="mt-4 pt-3 border-t-2 border-dashed border-border"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-4">
              <span className="text-muted-foreground select-none w-4 text-right">→</span>
              <motion.span
                className="text-primary font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Fala, Você!
              </motion.span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

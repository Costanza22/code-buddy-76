import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const codeLines = [
  { text: '// Meu primeiro programa! 🚀', type: 'comment' },
  { text: 'function', type: 'keyword', rest: [{ text: ' saudacao', type: 'function' }, { text: '(nome) {', type: 'default' }] },
  { text: '  return', type: 'keyword', rest: [{ text: ' `Olá, ${nome}!`', type: 'string' }] },
  { text: '}', type: 'default' },
  { text: '', type: 'default' },
  { text: 'console', type: 'default', rest: [{ text: '.log', type: 'function' }, { text: '(saudacao(', type: 'default' }, { text: '"Mundo"', type: 'string' }, { text: '))', type: 'default' }] },
];

const colorMap: Record<string, string> = {
  comment: 'text-code-comment',
  keyword: 'text-code-keyword',
  string: 'text-code-string',
  function: 'text-code-function',
  default: 'text-foreground',
};

export default function TypewriterCode() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < codeLines.length) {
      const t = setTimeout(() => setVisibleLines(v => v + 1), 400);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  return (
    <div className="rounded-xl bg-code-bg border border-border overflow-hidden font-code text-sm">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-destructive/80" />
        <div className="w-3 h-3 rounded-full bg-accent/80" />
        <div className="w-3 h-3 rounded-full bg-primary/80" />
        <span className="ml-2 text-xs text-muted-foreground">primeiro-programa.js</span>
      </div>
      <div className="p-4 space-y-1 min-h-[200px]">
        {codeLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex"
          >
            <span className="text-muted-foreground w-6 text-right mr-4 select-none">{i + 1}</span>
            <span className={colorMap[line.type]}>{line.text}</span>
            {line.rest?.map((part, j) => (
              <span key={j} className={colorMap[part.type]}>{part.text}</span>
            ))}
          </motion.div>
        ))}
        {visibleLines < codeLines.length && (
          <div className="flex">
            <span className="text-muted-foreground w-6 text-right mr-4 select-none">{visibleLines + 1}</span>
            <span className="w-2 h-5 bg-primary animate-blink" />
          </div>
        )}
        {visibleLines >= codeLines.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 pt-3 border-t border-border text-primary"
          >
            <span className="text-muted-foreground w-6 text-right mr-4 inline-block select-none">→</span>
            Olá, Mundo!
          </motion.div>
        )}
      </div>
    </div>
  );
}

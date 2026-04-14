import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLesson } from "@/data/lessons";
import { Button } from "@/components/ui/button";

export default function LessonPage() {
  const { trackId, lessonId } = useParams();
  const data = getLesson(trackId || "", lessonId || "");
  const [code, setCode] = useState(data?.lesson.codeTemplate || "");
  const [output, setOutput] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Aula não encontrada</h1>
          <Link to="/"><Button variant="outline">← Voltar</Button></Link>
        </div>
      </div>
    );
  }

  const { lesson, track, index, next } = data;

  const handleRun = () => {
    // Simple simulated output
    try {
      const lines: string[] = [];
      const mockPrint = (...args: unknown[]) => lines.push(args.map(String).join(" "));

      // Very basic Python-like simulation for print statements
      const printRegex = /print\s*\(\s*(?:"([^"]*)"|'([^']*)'|f"([^"]*)"|(.*?))\s*\)/g;
      let match;
      let hasOutput = false;

      while ((match = printRegex.exec(code)) !== null) {
        hasOutput = true;
        const value = match[1] ?? match[2] ?? match[3] ?? match[4] ?? "";
        // Simple f-string variable replacement
        const processed = value.replace(/\{(\w+)\}/g, (_: string, varName: string) => {
          const varMatch = code.match(new RegExp(`${varName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|(\\d+))`));
          if (varMatch) return varMatch[1] ?? varMatch[2] ?? varMatch[3] ?? varName;
          return varName;
        });
        mockPrint(processed);
      }

      // JS-style console.log
      const consoleRegex = /console\.log\s*\(\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`|(.*?))\s*\)/g;
      while ((match = consoleRegex.exec(code)) !== null) {
        hasOutput = true;
        mockPrint(match[1] ?? match[2] ?? match[3] ?? match[4] ?? "");
      }

      if (!hasOutput) {
        // Try evaluating simple expressions
        const cleanCode = code.replace(/#.*$/gm, "").replace(/\/\/.*$/gm, "").trim();
        if (cleanCode) {
          try {
            const result = new Function(`return ${cleanCode}`)();
            if (result !== undefined) mockPrint(String(result));
          } catch {
            // ignore
          }
        }
      }

      setOutput(lines.length > 0 ? lines.join("\n") : "(sem saída — tente usar print() ou console.log())");

      if (lesson.expectedOutput && lines.join("\n").trim() === lesson.expectedOutput.trim()) {
        setCompleted(true);
      }
    } catch (e) {
      setOutput(`Erro: ${e instanceof Error ? e.message : "algo deu errado"}`);
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-background border-b-2 border-border">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="font-mono font-bold text-lg tracking-tight hover:text-primary transition-colors">codestart_</Link>
          <span className="font-mono text-xs text-muted-foreground">
            {track.name} · Aula {index + 1}/{track.lessons.length}
          </span>
        </div>
      </nav>

      <div className="pt-20 pb-20 px-4">
        <div className="container max-w-4xl">
          <Link
            to={`/trilha/${track.id}`}
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
          >
            ← {track.name}
          </Link>

          <div className="mt-6 mb-8">
            <span className="font-mono text-xs text-muted-foreground">Aula {String(index + 1).padStart(2, "0")}</span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">{lesson.title}</h1>
          </div>

          {/* Lesson content */}
          <div className="space-y-4 mb-10">
            {lesson.content.map((paragraph, i) => (
              <p key={i} className="text-secondary-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Code editor */}
          <div className="border-2 border-border">
            <div className="border-b-2 border-border px-4 py-2.5 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Editor</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHint(h => !h)}
                  className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors uppercase tracking-wider"
                >
                  {showHint ? "esconder dica" : "dica"}
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-background font-mono text-sm p-5 min-h-[200px] resize-y focus:outline-none text-foreground placeholder:text-muted-foreground"
              spellCheck={false}
            />
            <div className="border-t-2 border-border px-4 py-3 flex items-center justify-between">
              <Button onClick={handleRun} size="sm" className="font-mono uppercase tracking-wider text-xs">
                Rodar ▶
              </Button>
              {completed && (
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                  ✓ Correto!
                </span>
              )}
            </div>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="mt-4 border-2 border-accent/30 bg-accent/5 p-4">
              <span className="font-mono text-xs text-accent uppercase tracking-wider font-bold block mb-2">Dica</span>
              <pre className="font-mono text-sm text-secondary-foreground whitespace-pre-wrap">{lesson.hint}</pre>
            </div>
          )}

          {/* Output */}
          {output !== null && (
            <div className="mt-4 border-2 border-border bg-card p-4">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">Saída</span>
              <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">{output}</pre>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between border-t-2 border-border pt-6">
            {index > 0 ? (
              <Link to={`/trilha/${track.id}/aula/${data.prev!.id}`}>
                <Button variant="outline" className="font-mono text-xs uppercase tracking-wider">
                  ← Anterior
                </Button>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/trilha/${track.id}/aula/${next.id}`}>
                <Button className="font-mono text-xs uppercase tracking-wider">
                  Próxima →
                </Button>
              </Link>
            ) : (
              <Link to={`/trilha/${track.id}`}>
                <Button className="font-mono text-xs uppercase tracking-wider">
                  Concluir trilha ✓
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

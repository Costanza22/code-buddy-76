import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import InputDomReference from "@/components/InputDomReference";
import { NavAuth } from "@/components/NavAuth";
import { useLesson } from "@/hooks/use-tracks-api";
import {
  markLessonPassed,
  notifyLessonRunUpdated,
  setLessonLastRunResult,
} from "@/lib/lessonRunState";
import { Button } from "@/components/ui/button";

type RunFeedback = "idle" | "ok" | "wrong" | "error" | "none";

export default function LessonPage() {
  const { trackId, lessonId } = useParams();
  const { data, isPending, isError, error, refetch } = useLesson(trackId, lessonId);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [runFeedback, setRunFeedback] = useState<RunFeedback>("idle");
  /** Texto usado na última comparação com o gabarito (para mostrar em “Errado”). */
  const [lastComparedActual, setLastComparedActual] = useState("");

  useEffect(() => {
    if (!data) return;
    setCode(data.lesson.codeTemplate);
    setOutput(null);
    setShowHint(false);
    setRunFeedback("idle");
    setLastComparedActual("");
  }, [data]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-sm text-muted-foreground">A carregar aula…</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Aula não encontrada</h1>
          <p className="text-sm text-muted-foreground mb-4">
            {isError && error instanceof Error ? error.message : "Não há dados para esta aula."}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {isError && (
              <Button type="button" variant="secondary" size="sm" onClick={() => refetch()}>
                Tentar novamente
              </Button>
            )}
            <Link to="/"><Button variant="outline">← Voltar</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  const { lesson, track, index, next } = data;
  const hasAutograde = Boolean(lesson.expectedOutput?.trim());

  const handleRun = () => {
    try {
      const lines: string[] = [];
      const mockPrint = (...args: unknown[]) => lines.push(args.map(String).join(" "));

      const printRegex = /print\s*\(\s*(?:"([^"]*)"|'([^']*)'|f"([^"]*)"|(.*?))\s*\)/g;
      let match;
      let hasOutput = false;

      while ((match = printRegex.exec(code)) !== null) {
        hasOutput = true;
        const value = match[1] ?? match[2] ?? match[3] ?? match[4] ?? "";
        const processed = value.replace(/\{(\w+)\}/g, (_: string, varName: string) => {
          const varMatch = code.match(new RegExp(`${varName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|(\\d+))`));
          if (varMatch) return varMatch[1] ?? varMatch[2] ?? varMatch[3] ?? varName;
          return varName;
        });
        mockPrint(processed);
      }

      const consoleRegex = /console\.log\s*\(\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`|(.*?))\s*\)/g;
      while ((match = consoleRegex.exec(code)) !== null) {
        hasOutput = true;
        mockPrint(match[1] ?? match[2] ?? match[3] ?? match[4] ?? "");
      }

      if (!hasOutput) {
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

      const joined = lines.join("\n");
      const actualTrim = joined.trim();
      setLastComparedActual(actualTrim);
      setOutput(joined.length > 0 ? joined : "(sem saída — tente usar print() ou console.log())");

      if (!hasAutograde) {
        setRunFeedback("none");
        return;
      }

      const expectedTrim = lesson.expectedOutput.trim();
      if (actualTrim === expectedTrim) {
        setRunFeedback("ok");
        markLessonPassed(lesson.id);
        setLessonLastRunResult(lesson.id, true);
        notifyLessonRunUpdated();
      } else {
        setRunFeedback("wrong");
        setLessonLastRunResult(lesson.id, false);
        notifyLessonRunUpdated();
      }
    } catch (e) {
      setOutput(`Erro: ${e instanceof Error ? e.message : "algo deu errado"}`);
      setRunFeedback("error");
      if (hasAutograde) {
        setLessonLastRunResult(lesson.id, false);
        notifyLessonRunUpdated();
      }
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-background border-b-2 border-border">
        <div className="container flex items-center justify-between h-14 gap-3">
          <Link to="/" className="font-mono font-bold text-lg tracking-tight hover:text-primary transition-colors shrink-0">codestart_</Link>
          <span className="font-mono text-xs text-muted-foreground truncate min-w-0 flex-1 text-center hidden sm:block">
            {track.name} · Aula {index + 1}/{track.lessons.length}
          </span>
          <NavAuth />
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

          <div className="space-y-4 mb-10">
            {lesson.content.map((paragraph, i) => (
              <p key={i} className="text-secondary-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="border-2 border-border">
            <div className="border-b-2 border-border px-4 py-2.5 flex items-center justify-between">
              <label htmlFor="lesson-code-editor" className="font-mono text-xs uppercase tracking-wider text-muted-foreground cursor-pointer">
                Editor
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors uppercase tracking-wider"
                >
                  {showHint ? "esconder dica" : "dica"}
                </button>
              </div>
            </div>
            <textarea
              id="lesson-code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-background font-mono text-sm p-5 min-h-[200px] resize-y focus:outline-none text-foreground placeholder:text-muted-foreground"
              spellCheck={false}
              aria-label="Editor de código da aula"
              placeholder="Escreve o teu código aqui…"
            />
            <div className="border-t-2 border-border px-4 py-3 flex flex-wrap items-center justify-between gap-2">
              <Button type="button" onClick={handleRun} size="sm" className="font-mono uppercase tracking-wider text-xs">
                Rodar ▶
              </Button>
              <div className="font-mono text-xs uppercase tracking-wider text-right min-h-[1.25rem]">
                {runFeedback === "ok" && hasAutograde && (
                  <span className="text-primary font-bold">✓ Correto</span>
                )}
                {runFeedback === "wrong" && hasAutograde && (
                  <span className="text-destructive font-bold">✗ Errado</span>
                )}
                {runFeedback === "error" && <span className="text-destructive font-bold">✗ Erro ao executar</span>}
                {runFeedback === "none" && output !== null && (
                  <span className="text-muted-foreground font-normal normal-case">Sem correção automática nesta aula</span>
                )}
              </div>
            </div>
          </div>

          {showHint && (
            <div className="mt-4 border-2 border-accent/30 bg-accent/5 p-4">
              <span className="font-mono text-xs text-accent uppercase tracking-wider font-bold block mb-2">Dica</span>
              <pre className="font-mono text-sm text-secondary-foreground whitespace-pre-wrap">{lesson.hint}</pre>
            </div>
          )}

          {output !== null && (
            <div className="mt-4 border-2 border-border bg-card p-4">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">Saída</span>
              <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">{output}</pre>
              {runFeedback === "wrong" && hasAutograde && (
                <div className="mt-4 pt-4 border-t-2 border-border space-y-2 text-xs">
                  <p className="font-mono text-muted-foreground uppercase tracking-wider">Comparação com o gabarito</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-destructive block mb-1">Obtido</span>
                      <pre className="font-mono text-xs text-foreground whitespace-pre-wrap bg-muted/40 p-2 border border-border max-h-40 overflow-auto">
                        {lastComparedActual || "(vazio)"}
                      </pre>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-primary block mb-1">Esperado</span>
                      <pre className="font-mono text-xs text-foreground whitespace-pre-wrap bg-muted/40 p-2 border border-border max-h-40 overflow-auto">
                        {lesson.expectedOutput.trim()}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {track.id === "html-css" && <InputDomReference />}

          <div className="mt-12 flex items-center justify-between border-t-2 border-border pt-6">
            {index > 0 && data.prev ? (
              <Link to={`/trilha/${track.id}/aula/${data.prev.id}`}>
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

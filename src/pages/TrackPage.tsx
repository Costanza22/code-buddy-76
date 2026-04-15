import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NavAuth } from "@/components/NavAuth";
import { useTrack } from "@/hooks/use-tracks-api";
import { getLessonLastRunResult, isLessonMarkedPassed } from "@/lib/lessonRunState";
import { Button } from "@/components/ui/button";

function lessonHasAutograde(expectedOutput: string | undefined): boolean {
  return Boolean(expectedOutput?.trim());
}

function autogradeIcon(passed: boolean, last: "ok" | "fail" | null) {
  if (passed) return <span className="text-primary font-bold">✓</span>;
  if (last === "fail") return <span className="text-destructive font-bold">✗</span>;
  return <span className="text-muted-foreground">○</span>;
}

function autogradeTitle(passed: boolean, last: "ok" | "fail" | null): string {
  if (passed) return "Passou na auto-correção";
  if (last === "fail") return "Última execução: saída incorreta";
  return "Ainda não passou na auto-correção";
}

export default function TrackPage() {
  const { trackId } = useParams();
  const { data: track, isPending, isError, error, refetch } = useTrack(trackId);
  const [runTick, setRunTick] = useState(0);

  useEffect(() => {
    const onUpdate = () => setRunTick((n) => n + 1);
    globalThis.addEventListener("codestart-lesson-run", onUpdate);
    return () => globalThis.removeEventListener("codestart-lesson-run", onUpdate);
  }, []);

  const lessonIndicators = useMemo(() => {
    if (!track) return [];
    return track.lessons.map((lesson) => ({
      lesson,
      graded: lessonHasAutograde(lesson.expectedOutput),
      passed: isLessonMarkedPassed(lesson.id),
      last: getLessonLastRunResult(lesson.id),
    }));
  }, [track, runTick]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-sm text-muted-foreground">A carregar trilha…</p>
      </div>
    );
  }

  if (isError || !track) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Trilha não encontrada</h1>
          <p className="text-sm text-muted-foreground mb-4">
            {isError && error instanceof Error ? error.message : "Não há dados para esta trilha."}
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

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-background border-b-2 border-border">
        <div className="container flex items-center justify-between h-14 gap-3">
          <Link to="/" className="font-mono font-bold text-lg tracking-tight hover:text-primary transition-colors">codestart_</Link>
          <NavAuth />
        </div>
      </nav>

      <div className="pt-28 pb-20 px-4">
        <div className="container max-w-2xl">
          <Link to="/" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
            ← Trilhas
          </Link>

          <div className="mt-6 mb-12">
            <span className="font-mono text-xs text-muted-foreground">{track.tag}</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-1">{track.name}</h1>
            <p className="text-muted-foreground mt-3 text-lg">{track.desc}</p>
            <div className="mt-4 font-mono text-sm text-muted-foreground">
              {track.lessons.length} aulas
            </div>
          </div>

          <div className="space-y-0">
            {lessonIndicators.map(({ lesson, graded, passed, last }, i) => (
              <Link
                key={lesson.id}
                to={`/trilha/${track.id}/aula/${lesson.id}`}
                className="group block border-b-2 border-border hover:border-primary/40 py-5 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 border-2 border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center font-mono text-sm font-bold transition-all shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{lesson.title}</h3>
                    <p className="text-muted-foreground text-sm mt-0.5">{lesson.description}</p>
                  </div>
                  {graded ? (
                    <span className="shrink-0 font-mono text-sm w-8 text-center" title={autogradeTitle(passed, last)}>
                      {autogradeIcon(passed, last)}
                    </span>
                  ) : (
                    <span className="shrink-0 font-mono text-[10px] uppercase text-muted-foreground w-14 text-center hidden sm:block" title="Sem gabarito automático">
                      Livre
                    </span>
                  )}
                  <span className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity font-bold text-lg shrink-0">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

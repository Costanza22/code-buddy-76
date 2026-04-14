import { useParams, Link } from "react-router-dom";
import { getTrack } from "@/data/lessons";
import { Button } from "@/components/ui/button";

export default function TrackPage() {
  const { trackId } = useParams();
  const track = getTrack(trackId || "");

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Trilha não encontrada</h1>
          <Link to="/"><Button variant="outline">← Voltar</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-background border-b-2 border-border">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="font-mono font-bold text-lg tracking-tight hover:text-primary transition-colors">codestart_</Link>
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
            {track.lessons.map((lesson, i) => (
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

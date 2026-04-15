import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavAuth } from "@/components/NavAuth";
import { useTracks } from "@/hooks/use-tracks-api";

export default function Index() {
  const { data: tracks, isPending, isError, error, refetch } = useTracks();

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background border-b-2 border-border">
        <div className="container flex items-center justify-between h-14">
          <span className="font-mono font-bold text-lg tracking-tight">codestart_</span>
          <div className="flex items-center gap-2">
            <a href="#trilhas"><Button variant="ghost" size="sm" className="font-mono text-xs uppercase tracking-wider">Trilhas</Button></a>
            <NavAuth />
          </div>
        </div>
      </nav>

      {/* Hero — texto à esquerda; bug centrado na área livre à direita (flex-1 + justify-center) */}
      <section className="pt-28 pb-16 px-4 overflow-x-clip">
        <div className="container">
          <div className="flex w-full min-w-0 flex-col items-stretch gap-8 sm:flex-row sm:items-center sm:gap-6 md:gap-8 lg:gap-10">
            <div className="min-w-0 shrink-0 sm:max-w-[min(100%,22rem)] md:max-w-[min(100%,26rem)] lg:max-w-[min(100%,30rem)] xl:max-w-[34rem]">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Plataforma para iniciantes
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8">
                Você não<br />
                precisa de<br />
                <span className="highlight-box -rotate-1 inline-block mt-1">curso caro.</span>
              </h1>
              <div className="flex flex-wrap gap-3">
                <Link to="/trilha/python">
                  <Button size="lg" className="font-mono uppercase tracking-wider text-sm">
                    Bora começar →
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-center py-2 sm:min-h-[min(18rem,40vh)]">
              <img
                src="/bug.png"
                alt=""
                width={400}
                height={400}
                decoding="async"
                draggable={false}
                className="block h-auto w-full max-w-[10rem] object-contain object-center select-none pointer-events-none sm:max-w-[11rem] md:max-w-[12rem] lg:max-w-52 xl:max-w-56 2xl:max-w-60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trilhas */}
      <section id="trilhas" className="py-20 px-4 border-t-2 border-border">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Trilhas</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Pega uma<br />e vai.</h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs text-right hidden md:block">
              Aulas de 5 min. Escreve direto no navegador. Sem instalar nada, sem desculpa.
            </p>
          </div>

          {isPending && (
            <p className="font-mono text-sm text-muted-foreground">A carregar trilhas…</p>
          )}
          {isError && (
            <div className="border-2 border-destructive/40 bg-destructive/5 p-4 rounded-sm">
              <p className="font-mono text-sm text-destructive mb-2">Não foi possível carregar as trilhas.</p>
              <p className="text-xs text-muted-foreground mb-3">{error instanceof Error ? error.message : "Erro desconhecido"}</p>
              <p className="text-xs text-muted-foreground mb-3">Confirma que a API está a correr (<code className="font-mono">npm run dev:server</code>) e tenta outra vez.</p>
              <Button type="button" variant="outline" size="sm" className="font-mono text-xs" onClick={() => refetch()}>
                Tentar novamente
              </Button>
            </div>
          )}
          {tracks && (
          <div className="space-y-0">
            {tracks.map((t) => (
              <Link
                key={t.id}
                to={`/trilha/${t.id}`}
                className="group border-b-2 border-border hover:border-primary/40 py-6 flex items-center gap-6 cursor-pointer transition-colors block"
              >
                <span className="font-mono text-xs text-muted-foreground w-8">{t.tag}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{t.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{t.desc}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{t.lessons.length} aulas</span>
                <span className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity font-bold text-lg">→</span>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 px-4 border-t-2 border-border">
        <div className="container">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Como rola</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">Lê pouco.<br />Escreve muito.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Leia o mínimo", desc: "Uma explicação curta, um exemplo. Só o que você precisa pra entender e seguir em frente." },
              { step: "02", title: "Escreva e rode", desc: "Editor aqui mesmo. Escreveu, apertou play, viu o resultado. Deu erro? Normal. Tenta de novo." },
              { step: "03", title: "Monte algo real", desc: "No final de cada módulo você sai com um projetinho. Pequeno, mas seu." },
            ].map((item) => (
              <div key={item.step}>
                <span className="font-mono text-5xl font-bold text-muted block mb-3">{item.step}</span>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t-2 border-border">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
            Para de ler sobre programação e vai programar.
          </h2>
          <Link to="/trilha/python">
            <Button size="lg" className="font-mono uppercase tracking-wider text-sm">
              Primeira aula →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border py-6 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <span className="font-bold text-foreground">codestart_</span>
        </div>
      </footer>
    </div>
  );
}

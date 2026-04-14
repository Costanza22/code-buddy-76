import { Link } from "react-router-dom";
import CodeBlock from "@/components/TypewriterCode";
import { Button } from "@/components/ui/button";
import { tracks } from "@/data/lessons";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background border-b-2 border-border">
        <div className="container flex items-center justify-between h-14">
          <span className="font-mono font-bold text-lg tracking-tight">codestart_</span>
          <div className="flex items-center gap-1">
            <a href="#trilhas"><Button variant="ghost" size="sm" className="font-mono text-xs uppercase tracking-wider">Trilhas</Button></a>
            <Button size="sm" className="font-mono text-xs uppercase tracking-wider">Entrar</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4">
        <div className="container">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                De graça · Em português · Vai no seu ritmo
              </p>
              <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
                Você não<br />
                precisa de<br />
                <span className="highlight-box -rotate-1 inline-block mt-1">curso caro.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-sm mb-8 leading-relaxed">
                Abre o editor, escreve código, roda, dá erro, corrige. Repetir até virar dev. É isso.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/trilha/python">
                  <Button size="lg" className="font-mono uppercase tracking-wider text-sm">
                    Bora começar →
                  </Button>
                </Link>
              </div>
              <div className="flex gap-8 mt-10 font-mono text-sm">
                <div><span className="text-2xl font-bold text-foreground block">12k</span><span className="text-muted-foreground text-xs">já tentaram</span></div>
                <div><span className="text-2xl font-bold text-foreground block">104</span><span className="text-muted-foreground text-xs">aulas curtas</span></div>
                <div><span className="text-2xl font-bold text-foreground block">4.9★</span><span className="text-muted-foreground text-xs">nota real</span></div>
              </div>
            </div>
            <div className="lg:mt-12">
              <CodeBlock />
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
          <div className="space-y-0">
            {tracks.map((t) => (
              <Link
                key={t.tag}
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Para de ler sobre programação e vai programar.
          </h2>
          <p className="text-muted-foreground mb-8">2 minutos. Sem cadastro. Sem cartão.</p>
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
          <span>feito por quem já debugou chorando</span>
        </div>
      </footer>
    </div>
  );
}

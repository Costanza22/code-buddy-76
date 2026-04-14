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
                Plataforma gratuita · Em português · Sem enrolação
              </p>
              <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
                Aprenda a<br />
                programar<br />
                <span className="highlight-box -rotate-1 inline-block mt-1">de verdade.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-sm mb-8 leading-relaxed">
                Nada de vídeo de 4 horas. Aqui você escreve código desde o minuto zero, erra, corrige, e aprende fazendo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/trilha/python">
                  <Button size="lg" className="font-mono uppercase tracking-wider text-sm">
                    Começar agora →
                  </Button>
                </Link>
              </div>
              <div className="flex gap-8 mt-10 font-mono text-sm">
                <div><span className="text-2xl font-bold text-foreground block">12k</span><span className="text-muted-foreground text-xs">alunos</span></div>
                <div><span className="text-2xl font-bold text-foreground block">104</span><span className="text-muted-foreground text-xs">aulas</span></div>
                <div><span className="text-2xl font-bold text-foreground block">4.9★</span><span className="text-muted-foreground text-xs">avaliação</span></div>
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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Escolha por<br />onde começar.</h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs text-right hidden md:block">
              Cada trilha tem aulas curtas de 5 min, exercícios no navegador e projetos pra montar seu portfólio.
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
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Método</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">Sem teoria chata.<br />Só prática.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Leia o conceito", desc: "Explicações curtas, diretas, com exemplos de código reais. Sem jargão desnecessário." },
              { step: "02", title: "Escreva código", desc: "Editor no navegador. Escreva, rode, veja o resultado. Erre à vontade — é assim que funciona." },
              { step: "03", title: "Construa algo", desc: "Cada módulo termina com um mini-projeto. Algo que você pode mostrar pra alguém." },
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
            A pior linha de código é a que você nunca escreveu.
          </h2>
          <p className="text-muted-foreground mb-8">Começa agora. Leva 2 minutos. Sério.</p>
          <Link to="/trilha/python">
            <Button size="lg" className="font-mono uppercase tracking-wider text-sm">
              Primeira aula grátis →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border py-6 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <span className="font-bold text-foreground">codestart_</span>
          <span>feito por quem já foi iniciante também</span>
        </div>
      </footer>
    </div>
  );
}

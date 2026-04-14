import { motion } from "framer-motion";
import TypewriterCode from "@/components/TypewriterCode";
import LearningPathCard from "@/components/LearningPathCard";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";

const paths = [
  { title: "HTML & CSS", description: "Aprenda a estruturar e estilizar páginas web do zero.", icon: "🌐", lessons: 24, progress: 0, color: "bg-orange-500/10", delay: 0.1 },
  { title: "JavaScript", description: "Domine a linguagem mais popular da web com projetos práticos.", icon: "⚡", lessons: 32, progress: 0, color: "bg-yellow-500/10", delay: 0.2 },
  { title: "Python", description: "Comece com a linguagem mais amigável para iniciantes.", icon: "🐍", lessons: 28, progress: 0, color: "bg-blue-500/10", delay: 0.3 },
  { title: "React", description: "Construa interfaces modernas e interativas.", icon: "⚛️", lessons: 20, progress: 0, color: "bg-cyan-500/10", delay: 0.4 },
];

const features = [
  { icon: "🎮", title: "Aprenda Jogando", description: "Exercícios interativos que parecem jogos. Ganhe XP e suba de nível!", delay: 0.1 },
  { icon: "🧩", title: "Projetos Reais", description: "Construa projetos práticos desde o primeiro dia de estudo.", delay: 0.2 },
  { icon: "🤖", title: "Tutor com IA", description: "Tire dúvidas instantaneamente com nosso assistente inteligente.", delay: 0.3 },
  { icon: "👥", title: "Comunidade", description: "Aprenda junto com outros iniciantes e compartilhe seu progresso.", delay: 0.4 },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <span className="font-code font-bold text-xl text-gradient-primary">{"<CodeStart/>"}</span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">Trilhas</Button>
            <Button variant="ghost" size="sm">Comunidade</Button>
            <Button size="sm">Começar Grátis</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              100% gratuito e em português
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Aprenda a <span className="text-gradient-primary">programar</span> do zero
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              Trilhas interativas, projetos práticos e uma comunidade que te apoia. Sem pré-requisitos, sem complicação.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="font-semibold">
                Começar Agora 🚀
              </Button>
              <Button size="lg" variant="outline">
                Ver Trilhas
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><span className="text-accent font-bold">12k+</span> alunos</span>
              <span className="flex items-center gap-1"><span className="text-accent font-bold">104</span> aulas</span>
              <span className="flex items-center gap-1"><span className="text-accent font-bold">4.9</span> ⭐</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <TypewriterCode />
          </motion.div>
        </div>
      </section>

      {/* Trilhas */}
      <section className="py-20 px-4">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Escolha sua <span className="text-gradient-primary">trilha</span></h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Comece por onde quiser. Cada trilha tem aulas curtas, exercícios e projetos práticos.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {paths.map(p => <LearningPathCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Por que o <span className="text-gradient-primary">CodeStart</span>?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Uma experiência pensada para quem nunca escreveu uma linha de código.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl bg-card border border-border p-12 text-center glow-primary overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Pronto para escrever seu primeiro código?</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">Comece agora, sem cadastro. Escolha uma trilha e resolva seu primeiro desafio em minutos.</p>
              <Button size="lg" className="font-semibold">
                Começar Gratuitamente 🎯
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-code font-bold text-foreground">{"<CodeStart/>"}</span>
          <span>Feito com 💚 para futuros devs</span>
        </div>
      </footer>
    </div>
  );
}

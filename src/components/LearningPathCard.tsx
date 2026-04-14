import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  icon: string;
  lessons: number;
  progress: number;
  color: string;
  delay: number;
}

export default function LearningPathCard({ title, description, icon, lessons, progress, color, delay }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-xl bg-card border border-border p-6 cursor-pointer transition-all hover:border-primary/40 hover:glow-primary"
    >
      <div className="flex items-start gap-4">
        <div className={`text-4xl p-3 rounded-lg ${color}`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3, duration: 0.8 }}
              />
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{lessons} aulas</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

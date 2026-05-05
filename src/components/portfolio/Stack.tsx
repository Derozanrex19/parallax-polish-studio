import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const groups = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", "Vite"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Postgres", "tRPC", "GraphQL", "Redis", "Prisma"],
  },
  {
    label: "Tools / DevOps",
    items: ["Docker", "GitHub Actions", "Vercel", "AWS", "Playwright", "Figma"],
  },
];

export const Stack = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="stack" ref={ref} className="relative py-32 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-mint-glow/10 blur-3xl"
      />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="font-mono text-mint text-xs tracking-widest mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-mint" /> 03 / TECH STACK
          </p>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold leading-tight">
            Tools I reach for, <span className="text-gradient">on repeat</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((g, gi) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: gi * 0.12 }}
              className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 hover:border-mint/40 transition-colors group"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono text-lg text-foreground">{g.label}</h3>
                <span className="font-mono text-xs text-mint">0{gi + 1}</span>
              </div>
              <ul className="space-y-3">
                {g.items.map((it, ii) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + gi * 0.1 + ii * 0.05, duration: 0.4 }}
                    className="flex items-center gap-3 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors group/item"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-mint/40 group-hover/item:bg-mint group-hover/item:shadow-glow transition-all" />
                    {it}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

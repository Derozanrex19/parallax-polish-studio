import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const strengths = [
  {
    title: "Frontend Systems",
    proof: "React + TypeScript interfaces built for maintainability and speed.",
  },
  {
    title: "AI Workflow Design",
    proof: "Prompt-driven automation and practical ML integration for real tasks.",
  },
  {
    title: "Delivery Ownership",
    proof: "From planning and execution to polish and documentation handoff.",
  },
];

const softSkills = [
  "Problem Solving",
  "Technical Communication",
  "Team Collaboration",
  "Adaptability",
  "Research & Analytical Thinking",
];

export const About = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y: yBg }}
        className="absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-mint/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: yBg }}
        className="absolute right-0 top-16 h-[360px] w-[360px] rounded-full bg-mint-glow/10 blur-3xl"
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="font-mono text-mint text-xs tracking-widest mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-mint" /> 01 / ABOUT
          </p>
          <h2 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.03]">
            I design and build products with
            <span className="block text-gradient">craft, systems thinking, and execution.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-12 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-md p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mint mb-4">
                Developer dossier
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                I come from an Information Technology background and over time I found myself
                drawn to work where problem solving, design thinking, and development come together.
                I like building{" "}
                <span className="text-foreground">clear and practical digital experiences</span>
                that people can actually use without friction.
              </p>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                What keeps me motivated is learning by doing, collaborating with people who care about the details,
                and improving things step by step until they feel right. I value reliability, good communication,
                and thoughtful execution, and I try to bring that mindset into every project I work on.
              </p>
            </div>

        
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-7 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
                <p className="ml-3 font-mono text-xs text-muted-foreground">about.panel.ts</p>
              </div>

              <p className="font-mono text-xs uppercase tracking-widest text-mint mb-4">
                Core strengths
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {strengths.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + index * 0.08, duration: 0.45 }}
                    className="rounded-xl border border-border/80 bg-background/60 p-4 hover:border-mint/40 transition-colors"
                  >
                    <p className="font-mono text-xs uppercase tracking-wider text-foreground mb-2">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.proof}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 pt-6 border-t border-border/70">
                <p className="font-mono text-xs uppercase tracking-widest text-mint mb-4">
                  Soft skills
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {softSkills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.35 }}
                      className="font-mono text-xs px-3 py-1.5 rounded-full border border-border bg-card/60 text-muted-foreground hover:border-mint/50 hover:text-mint transition-colors"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mint border border-mint/40 rounded-md px-4 py-2.5 hover:bg-mint/10 transition-colors"
                >
                  See selected projects
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

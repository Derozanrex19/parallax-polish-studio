import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
      <div className="container relative z-10 grid lg:grid-cols-12 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <p className="font-mono text-mint text-xs tracking-widest mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-mint" /> 01 / ABOUT
          </p>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold leading-tight">
            Building things on the web, <span className="text-gradient">one project at a time</span>.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed"
        >
          <p>
            I'm a detail-oriented Information Technology graduate with hands-on
            experience in <span className="text-foreground">web development, AI
            automation, and machine learning systems</span>. I enjoy developing
            real-time applications, managing projects, and applying emerging
            technologies in practical environments.
          </p>
          <p>
            My background includes social media technology deployment, prompt
            engineering, and system development. I'm currently seeking an entry-level
            role in software development, AI, or IT systems.
          </p>

          <div className="pt-6">
            <p className="font-mono text-xs uppercase tracking-widest text-mint mb-4">
              Soft skills
            </p>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                  className="font-mono text-xs px-3 py-1.5 rounded-full border border-border bg-card/60 text-muted-foreground hover:border-mint/50 hover:text-mint transition-colors"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative mt-24 overflow-hidden border-y border-border/60 py-6 bg-card/30">
        <div className="flex w-max animate-marquee gap-12 font-mono text-2xl sm:text-4xl text-muted-foreground/50 uppercase tracking-tight">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Web Development", "★", "AI Automation", "★", "Machine Learning", "★", "Prompt Engineering", "★", "System Integration", "★"].map(
              (w, i) => (
                <span key={`${k}-${i}`} className={w === "★" ? "text-mint" : ""}>
                  {w}
                </span>
              )
            )
          )}
        </div>
      </div>
    </section>
  );
};

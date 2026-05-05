import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Projects shipped" },
  { value: 6, suffix: "yrs", label: "Building for the web" },
  { value: 99, suffix: "%", label: "Lighthouse perf" },
  { value: 24, suffix: "/7", label: "Coffee-powered" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="font-mono text-4xl sm:text-5xl text-gradient font-bold">
      {val}
      <span className="text-mint">{suffix}</span>
    </span>
  );
};

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
            Engineer by training, <span className="text-gradient">designer at heart</span>.
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
            I'm a full-stack developer focused on building web products that feel{" "}
            <span className="text-foreground">fast, intentional, and human</span>. My
            sweet spot lives between thoughtful UX, clean architecture, and the small
            interaction details that make software feel alive.
          </p>
          <p>
            Whether shipping a marketing site that loads under a second or a real-time
            dashboard that scales — I sweat the details that ship.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="border-l-2 border-mint/40 pl-4"
              >
                <Counter to={s.value} suffix={s.suffix} />
                <p className="mt-1 text-sm font-mono uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative mt-24 overflow-hidden border-y border-border/60 py-6 bg-card/30">
        <div className="flex w-max animate-marquee gap-12 font-mono text-2xl sm:text-4xl text-muted-foreground/50 uppercase tracking-tight">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Performance", "★", "Accessibility", "★", "Design Systems", "★", "Scalability", "★", "Craft", "★"].map(
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

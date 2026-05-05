import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Mail, Phone } from "lucide-react";
import { useRef } from "react";

const NAME = "John Wrexel Antopina";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center pt-20"
    >
      <motion.div style={{ y: yBg, willChange: "transform" }} className="absolute inset-0 grid-pattern opacity-60" />
      <motion.div
        style={{ y: yBg, willChange: "transform" }}
        aria-hidden
        className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-mint/20 blur-3xl"
      />
      <motion.div
        style={{ y: yMid, willChange: "transform" }}
        aria-hidden
        className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-mint-glow/10 blur-3xl"
      />

      <motion.svg
        style={{ y: yMid }}
        className="absolute top-32 right-[12%] hidden lg:block animate-float"
        width="80" height="80" viewBox="0 0 80 80" fill="none"
      >
        <rect x="2" y="2" width="76" height="76" rx="18" stroke="hsl(var(--mint))" strokeWidth="1" strokeDasharray="3 5" />
      </motion.svg>
      <motion.svg
        style={{ y: yFg }}
        className="absolute bottom-40 left-[8%] hidden lg:block animate-float"
        width="56" height="56" viewBox="0 0 56 56" fill="none"
      >
        <circle cx="28" cy="28" r="26" stroke="hsl(var(--mint-glow))" strokeWidth="1" />
      </motion.svg>

      <motion.div style={{ opacity }} className="container relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-mint text-sm tracking-widest mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-mint" />
            HELLO, WORLD — I'M
          </motion.p>

          <h1 className="font-mono text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight">
            {NAME.split(" ").map((word, wi) => (
              <span key={wi} className="inline-block mr-3 lg:mr-5 overflow-hidden align-bottom">
                {word.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.4 + wi * 0.08 + ci * 0.025,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block text-gradient"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <h2 className="text-xl sm:text-2xl text-muted-foreground relative inline-block">
              IT Graduate · Web &amp; AI Developer
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-mint"
              />
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Detail-oriented Information Technology graduate with hands-on experience in
            web development, AI automation, and machine learning systems — based in
            Lapu-Lapu City, Cebu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group relative overflow-hidden inline-flex items-center gap-2 bg-gradient-mint text-primary-foreground font-mono uppercase text-xs tracking-widest px-6 py-3.5 rounded-md shadow-glow transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">View My Work</span>
              <ArrowDown size={14} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-foreground/10" />
            </a>

            <div className="flex items-center gap-2">
              {[
                { Icon: Github, href: "https://github.com/Derozanrex19", label: "GitHub" },
                { Icon: Mail, href: "mailto:jw.antopina@gmail.com", label: "Email" },
                { Icon: Phone, href: "tel:+639626024717", label: "Phone" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-11 w-11 grid place-items-center rounded-md border border-border text-muted-foreground hover:text-mint hover:border-mint/50 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: yFg }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-2xl border border-border bg-card/70 backdrop-blur-xl shadow-elevated overflow-hidden noise">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/60">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">developer.ts</span>
            </div>
            <pre className="font-mono text-[13px] leading-relaxed p-6 overflow-x-auto">
{`const dev = {
  name: `}<span className="text-mint">'John Wrexel Antopina'</span>{`,
  role: `}<span className="text-mint">'IT Graduate / Web Dev'</span>{`,
  location: `}<span className="text-mint">'Lapu-Lapu City, Cebu'</span>{`,
  stack: [`}<span className="text-accent">'React'</span>{`, `}<span className="text-accent">'TypeScript'</span>{`,
          `}<span className="text-accent">'Python'</span>{`, `}<span className="text-accent">'Flask'</span>{`],
  focus: `}<span className="text-mint">'web + AI automation'</span>{`,
  open_to_work: `}<span className="text-accent">true</span>{`,
};

`}<span className="text-muted-foreground">// let's build something great</span>{`
dev.ship();`}
            </pre>
          </div>
          <div className="absolute -inset-4 -z-10 bg-mint/10 blur-3xl rounded-full" />
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-mint transition-colors"
      >
        <span>Scroll</span>
        <span className="relative h-10 w-5 rounded-full border border-border overflow-hidden">
          <span className="absolute left-1/2 top-1.5 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-mint animate-scroll-arrow" />
        </span>
      </motion.a>
    </section>
  );
};

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="contact" ref={ref} className="section-shell overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y: yBg }}
        className="absolute inset-0 grid-pattern opacity-40"
      />
      <motion.div
        aria-hidden
        style={{ y: yBg }}
        className="absolute left-1/2 -translate-x-1/2 top-1/4 h-[600px] w-[600px] rounded-full bg-mint/15 blur-[120px]"
      />

      <div className="container relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-eyebrow justify-center"
        >
          05 / CONTACT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="section-title max-w-4xl mx-auto"
        >
          Available for select <span className="text-gradient">opportunities</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl mx-auto section-lead"
        >
          If you have a product idea, dashboard build, or frontend role that needs
          thoughtful execution, I would love to hear from you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:jw.antopina@gmail.com"
            className="group inline-flex items-center gap-3 bg-gradient-mint text-primary-foreground font-mono uppercase text-xs tracking-widest px-7 py-4 rounded-md shadow-glow transition-transform duration-300 hover:scale-[1.03]"
          >
            <Mail size={16} />
            jw.antopina@gmail.com
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <div className="flex items-center gap-2">
            {[
              { Icon: Github, href: "https://github.com/Derozanrex19", label: "GitHub" },
              { Icon: Phone, href: "tel:+639626024717", label: "Phone" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="h-12 w-12 grid place-items-center rounded-md border border-border text-muted-foreground hover:text-mint hover:border-mint/50 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-mint" /> Pajac, Lapu-Lapu City, Cebu
          </span>
          <span className="flex items-center gap-2">
            <Phone size={14} className="text-mint" /> 0962 602 4717
          </span>
        </motion.div>
      </div>

      <footer className="container relative z-10 mt-32 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} John Wrexel Antopina. Crafted with React + Framer Motion.</p>
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-glow" />
          Open to opportunities
        </p>
      </footer>

      <motion.a
        href="#top"
        initial={false}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 20, pointerEvents: showTop ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-40 h-12 w-12 grid place-items-center rounded-full bg-card border border-mint/40 text-mint shadow-glow hover:bg-mint hover:text-primary-foreground transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </motion.a>
    </section>
  );
};

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

type Job = {
  id: string;
  role: string;
  company: string;
  period: string;
  hook: string;
  bullets: string[];
  metrics: Array<{ label: string; value: string }>;
};

const jobs: Job[] = [
  {
    id: "amazon",
    role: "Customer Service Representative",
    company: "Amazon",
    period: "July 2024 - December 2024",
    hook: "Built communication precision and high-volume execution discipline.",
    bullets: [
      "Resolved order, payment, and delivery concerns with clear customer communication.",
      "Troubleshot device and service issues for non-technical users.",
      "Maintained strict SOP and data privacy compliance in high-volume support.",
    ],
    metrics: [
      { label: "Role Stage", value: "Foundation" },
      { label: "Core Skill", value: "Communication" },
      { label: "Work Mode", value: "High Volume" },
    ],
  },
  {
    id: "lifewood",
    role: "Intern",
    company: "Lifewood Data Technology",
    period: "January 2026 - Present",
    hook: "Shifted into product-building with web systems and AI-assisted workflows.",
    bullets: [
      "Contributed to web and system-driven projects from planning to implementation.",
      "Applied prompt engineering to support AI-assisted automation workflows.",
      "Collaborated in cross-functional execution across distributed teams.",
    ],
    metrics: [
      { label: "Role Stage", value: "Transition" },
      { label: "Core Skill", value: "Automation" },
      { label: "Work Mode", value: "Product Build" },
    ],
  },
];

export const Experience = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeIndex = jobs.findIndex((job) => job.id === hoveredId);
  const active = activeIndex >= 0 ? jobs[activeIndex] : null;

  const panelDirection = useMemo(() => (activeIndex === 0 ? -1 : 1), [activeIndex]);

  return (
    <section id="experience" className="section-shell overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-6 h-72 w-72 rounded-full bg-mint/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-mint-glow/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl section-header"
        >
          <p className="section-eyebrow">
            <span className="h-px w-8 bg-mint" /> 04 / EXPERIENCE
          </p>
          <h2 className="section-title mb-4">
            Professional <span className="text-gradient">experience</span>
          </h2>
          <p className="section-lead">
            Hover a role card to view responsibilities, impact, and growth focus.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-border/75 bg-card/60 backdrop-blur-xl p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {jobs.map((job) => {
              const isActive = job.id === hoveredId;
              return (
                <button
                  key={job.id}
                  type="button"
                  onMouseEnter={() => setHoveredId(job.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(job.id)}
                  onBlur={() => setHoveredId(null)}
                  className={`rounded-xl border px-4 py-4 text-left transition-all ${
                    isActive
                      ? "border-mint/60 bg-mint/10 shadow-glow"
                      : "border-border/80 bg-background/50 hover:border-mint/35"
                  }`}
                  aria-pressed={isActive}
                >
                  <p className={`font-mono text-xs tracking-[0.12em] ${isActive ? "text-mint" : "text-muted-foreground"}`}>
                    {job.period}
                  </p>
                  <p className="mt-2 font-mono text-lg text-foreground">{job.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">{job.role}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <AnimatePresence mode="wait" custom={panelDirection}>
              {active ? (
                <motion.article
                  key={active.id}
                  custom={panelDirection}
                  initial={{ opacity: 0, x: panelDirection * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: panelDirection * -20 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-border/80 bg-card/80 p-6 sm:p-8 shadow-card"
                >
                  <div className="grid md:grid-cols-12 gap-7">
                    <div className="md:col-span-4">
                      <p className="font-mono text-xs tracking-widest text-mint mb-3">{active.period}</p>
                      <h3 className="font-mono text-2xl sm:text-3xl font-bold leading-tight">{active.role}</h3>
                      <p className="text-muted-foreground mt-2">{active.company}</p>
                      <p className="mt-4 text-sm text-foreground/90 border-l-2 border-mint/45 pl-3">
                        {active.hook}
                      </p>
                    </div>

                    <div className="md:col-span-8">
                      <ul className="space-y-3">
                        {active.bullets.map((item, i) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 + i * 0.05, duration: 0.22 }}
                            className="flex gap-3 text-muted-foreground leading-relaxed text-sm sm:text-base"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint/70" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {active.metrics.map((metric) => (
                          <div key={metric.label} className="rounded-lg border border-border/75 bg-background/60 p-3">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                              {metric.label}
                            </p>
                            <p className="mt-1 text-sm text-foreground">{metric.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-dashed border-border/70 bg-card/35 p-6 sm:p-8 text-center"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Hover any role above to preview details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mint border border-mint/35 rounded-md px-4 py-2.5 hover:bg-mint/10 transition-colors"
          >
            View full resume (available on request)
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef } from "react";

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  year: string;
  hue: string;
};

const projects: Project[] = [
  {
    title: "Northwind Analytics",
    blurb: "Real-time analytics dashboard processing 2M+ events/day with sub-100ms query latency.",
    tags: ["React", "TypeScript", "ClickHouse", "tRPC"],
    year: "2025",
    hue: "from-mint/30 via-mint/5 to-transparent",
  },
  {
    title: "Lumen Commerce",
    blurb: "Headless storefront with edge-rendered product pages and a 99 Lighthouse score.",
    tags: ["Next.js", "Stripe", "Edge", "Tailwind"],
    year: "2024",
    hue: "from-mint-glow/30 via-mint-glow/5 to-transparent",
  },
  {
    title: "Cohort Studio",
    blurb: "Collaborative design tool with real-time multiplayer cursors and CRDT-backed state.",
    tags: ["WebRTC", "Yjs", "Canvas", "Node"],
    year: "2024",
    hue: "from-mint/20 via-mint/5 to-transparent",
  },
  {
    title: "Atlas API Platform",
    blurb: "OpenAPI-first developer portal with auto-generated SDKs and interactive playgrounds.",
    tags: ["OpenAPI", "Postgres", "Docker", "GraphQL"],
    year: "2023",
    hue: "from-mint-glow/20 via-mint-glow/5 to-transparent",
  },
];

const Card = ({ project, i }: { project: Project; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 sm:p-10 shadow-card hover:shadow-elevated transition-all duration-500 hover:border-mint/40 hover:-translate-y-1"
      >
        {/* parallax gradient orb */}
        <motion.div
          aria-hidden
          style={{ y, willChange: "transform" }}
          className={`pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br ${project.hue} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative flex items-start justify-between gap-6 mb-6">
          <div>
            <p className="font-mono text-xs text-mint tracking-widest mb-2">
              {project.year} · CASE STUDY
            </p>
            <h3 className="font-mono text-2xl sm:text-3xl font-bold group-hover:text-gradient transition-all duration-300">
              {project.title}
            </h3>
          </div>
          <div className="h-12 w-12 shrink-0 grid place-items-center rounded-full border border-border group-hover:border-mint group-hover:bg-mint group-hover:text-primary-foreground transition-all duration-500">
            <ArrowUpRight size={18} className="group-hover:rotate-12 transition-transform duration-500" />
          </div>
        </div>

        <p className="relative text-muted-foreground leading-relaxed mb-6 max-w-xl">
          {project.blurb}
        </p>

        <div className="relative flex flex-wrap gap-2 mb-6">
          {project.tags.map((t, ti) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + ti * 0.06, duration: 0.4 }}
              className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-border bg-background/60 text-muted-foreground hover:border-mint/50 hover:text-mint transition-colors"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <div className="relative flex items-center gap-4 font-mono text-xs uppercase tracking-widest pt-4 border-t border-border/60">
          <a href="#" className="text-foreground hover:text-mint transition-colors flex items-center gap-1.5">
            View Project <ArrowUpRight size={12} />
          </a>
          <span className="text-border">/</span>
          <a href="#" className="text-muted-foreground hover:text-mint transition-colors flex items-center gap-1.5">
            <Github size={12} /> Source
          </a>
          <span className="text-border">/</span>
          <a href="#" className="text-muted-foreground hover:text-mint transition-colors">
            Live Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export const Work = () => {
  return (
    <section id="work" className="relative py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between flex-wrap gap-6 mb-16"
        >
          <div>
            <p className="font-mono text-mint text-xs tracking-widest mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-mint" /> 02 / SELECTED WORK
            </p>
            <h2 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Projects that <span className="text-gradient">ship</span>.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A handful of recent builds — each focused on shipping real outcomes,
            not just demos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((p, i) => (
            <Card key={p.title} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

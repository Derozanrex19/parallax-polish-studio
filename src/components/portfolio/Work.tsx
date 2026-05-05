import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

type Project = {
  title: string;
  subtitle: string;
  bullets: string[];
  tags: string[];
  hue: string;
};

const projects: Project[] = [
  {
    title: "PosturEase",
    subtitle: "Real-Time Posture Recognition System · Capstone Project",
    bullets: [
      "Developed a real-time posture detection system using MediaPipe Pose and machine learning",
      "Integrated the system using the Flask framework for backend processing",
      "Served as Project Manager, overseeing development workflow and team coordination",
      "Conducted dataset collection and labeling for posture classification",
      "Produced technical documentation and system design artifacts",
    ],
    tags: ["Python", "Flask", "MediaPipe", "Machine Learning"],
    hue: "from-mint/30 via-mint/5 to-transparent",
  },
  {
    title: "Smart Movie Picker",
    subtitle: "Movie Recommendation Web App",
    bullets: [
      "Engineered a personalized movie recommendation engine based on mood, time availability, energy level, genre preferences, and regional filters",
      "Designed a custom weighted scoring algorithm combining genre matching, runtime optimization, energy profiling, popularity bias, and quality metrics",
      "Integrated the TMDB REST API with parallel multi-query fetching, pagination handling, retry logic, and a curated offline fallback dataset",
      "Created a cinematic, responsive UI with Tailwind CSS and Framer Motion focused on smooth animations and zero-friction UX",
      "Deployed via Vercel with environment-based configuration and optimized static build output",
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    hue: "from-mint-glow/30 via-mint-glow/5 to-transparent",
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
        <motion.div
          aria-hidden
          style={{ y, willChange: "transform" }}
          className={`pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br ${project.hue} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative flex items-start justify-between gap-6 mb-6">
          <div>
            <p className="font-mono text-xs text-mint tracking-widest mb-2 uppercase">
              {project.subtitle}
            </p>
            <h3 className="font-mono text-2xl sm:text-3xl font-bold group-hover:text-gradient transition-all duration-300">
              {project.title}
            </h3>
          </div>
          <div className="h-12 w-12 shrink-0 grid place-items-center rounded-full border border-border group-hover:border-mint group-hover:bg-mint group-hover:text-primary-foreground transition-all duration-500">
            <ArrowUpRight size={18} className="group-hover:rotate-12 transition-transform duration-500" />
          </div>
        </div>

        <ul className="relative space-y-3 mb-6">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-muted-foreground leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint/60" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="relative flex flex-wrap gap-2 pt-4 border-t border-border/60">
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
              <span className="h-px w-8 bg-mint" /> 03 / PROJECTS
            </p>
            <h2 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Things I've <span className="text-gradient">built</span>.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A look at projects I've designed, developed, and shipped — from
            capstone work to personal builds.
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

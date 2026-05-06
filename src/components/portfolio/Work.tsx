import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";

type Project = {
  title: string;
  subtitle: string;
  bullets: string[];
  tags: string[];
  liveUrl: string;
  coverImage?: string;
  detailImage?: string;
};

const projects: Project[] = [
  {
    title: "PosturEase",
    subtitle: "Real-Time Posture Recognition System · Capstone Project",
    bullets: [
      "Developed a real-time posture detection system using MediaPipe Pose and machine learning.",
      "Integrated Flask for backend processing and model workflow support.",
      "Served as project manager, handling team coordination and delivery flow.",
    ],
    tags: ["Python", "Flask", "MediaPipe", "Machine Learning"],
    liveUrl: "#",
  },
  {
    title: "Smart Movie Picker",
    subtitle: "Movie Recommendation Web App",
    bullets: [
      "Built a personalized recommendation engine using weighted mood, time, and genre scoring.",
      "Integrated TMDB API with retry handling and fallback dataset logic.",
      "Delivered a responsive experience with motion-focused UI polish.",
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
  },
  {
    title: "LifeSights",
    subtitle: "Data Analytics Dashboard · UI Contribution",
    bullets: [
      "Led key UI implementation for dashboard workflows that open and analyze spreadsheet files from Google Drive.",
      "Designed smooth analysis states, tab flows, and visual feedback for large workbook processing.",
      "Built consistent UX patterns across charts, filters, raw table, and chatbot surfaces.",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Firebase", "Firestore", "Google Drive"],
    liveUrl: "#",
    coverImage: "/projects/lifesights-cover.png",
    detailImage: "/projects/lifesights-detail.png",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [expanded, setExpanded] = useState(false);
  const fallbackSeed = project.title.toLowerCase().replace(/\s+/g, "-");
  const fallbackCover = `https://picsum.photos/seed/${fallbackSeed}-cover/1200/700`;
  const fallbackDetail = `https://picsum.photos/seed/${fallbackSeed}-detail/1200/700`;
  const [coverSrc, setCoverSrc] = useState(project.coverImage ?? fallbackCover);
  const [detailSrc, setDetailSrc] = useState(project.detailImage ?? fallbackDetail);
  const [coverTriedFallback, setCoverTriedFallback] = useState(!project.coverImage);
  const [detailTriedFallback, setDetailTriedFallback] = useState(!project.detailImage);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="group rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="relative">
        <img
          src={coverSrc}
          alt={`${project.title} project preview`}
          className="h-52 w-full object-cover opacity-80"
          onError={() => {
            if (!coverTriedFallback) {
              setCoverTriedFallback(true);
              setCoverSrc(fallbackCover);
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-mint mb-2">
            {project.subtitle}
          </p>
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-mono text-2xl sm:text-3xl font-bold text-foreground">{project.title}</h3>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} website`}
              className="h-11 w-11 shrink-0 grid place-items-center rounded-full border border-border bg-background/70 text-foreground hover:bg-mint hover:text-primary-foreground hover:border-mint transition-colors"
            >
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="md:hidden w-full flex items-center justify-between px-6 py-3 border-t border-border/70 font-mono text-xs uppercase tracking-widest text-muted-foreground"
        onClick={() => setExpanded((v) => !v)}
      >
        Project details
        <ChevronDown
          size={15}
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-4 border-t border-border/70">
              <img
                src={detailSrc}
                alt={`${project.title} detailed dashboard preview`}
                className="w-full h-56 object-cover rounded-xl border border-border/70 mb-5"
                onError={() => {
                  if (!detailTriedFallback) {
                    setDetailTriedFallback(true);
                    setDetailSrc(fallbackDetail);
                  }
                }}
              />

              <ul className="space-y-3 mb-5">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-muted-foreground leading-relaxed text-sm sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint/65" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/70">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-border bg-background/60 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
            Title-first cards with on-demand details for a cleaner reading flow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

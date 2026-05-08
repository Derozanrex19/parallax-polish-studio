"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import InfiniteMenu from "./InfiniteMenu";

type Feature = {
  id: string;
  image: string;
  description: string;
  type: string;
  details: string[];
  tags: string[];
  link: string;
  label: string;
};

const FEATURES: Feature[] = [
  {
    id: "posturease",
    label: "PosturEase",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
    description:
      "Capstone posture-recognition platform where I led project delivery and cross-team execution from concept to final handoff.",
    type: "Capstone Project",
    details: [
      "Served as Project Manager, orchestrating sprint planning, milestone tracking, and team coordination to keep delivery on schedule.",
      "Aligned technical decisions with user value, translating complex requirements into clear priorities for design and development.",
      "Guided end-to-end execution of a real-time posture analysis experience powered by MediaPipe and Flask-backed processing.",
    ],
    tags: ["Project Management", "Product Delivery", "MediaPipe", "Flask", "Machine Learning"],
    link: "#",
  },
  {
    id: "supportiq",
    label: "SupportIQ",
    image: "/projects/smartiq-01.png",
    description: "AI-assisted support workflow with policy-based routing.",
    type: "Technical Demo",
    details: [
      "Built support ticket UI flows for AI draft generation and agent response handling.",
      "Implemented policy-aware state transitions for needs-human and auto-send paths.",
      "Designed readable conversation and status patterns for operational support teams.",
    ],
    tags: ["React", "Supabase", "n8n", "Groq", "EmailJS"],
    link: "https://smart-ai-pi-mocha.vercel.app/",
  },
  {
    id: "behindyou",
    label: "Behind You",
    image: "/projects/behind-you-01.jpg",
    description:
      "Horror game concept where I led game design and AI-assisted asset direction for immersive player tension.",
    type: "Game Design Project",
    details: [
      "Owned core game design decisions including loop pacing, tension-building flow, and environmental storytelling.",
      "Directed rapid 3D asset ideation using MeshyAI to translate design intent into production-ready visual concepts.",
      "Used Claude to refine mechanics, prompt strategy, and narrative interactions for clearer player progression.",
    ],
    tags: ["Game Design", "AI-Assisted Design", "MeshyAI", "Claude", "3D Asset Direction"],
    link: "#",
  },
  {
    id: "lifesights",
    label: "LifeSights",
    image: "/projects/lifesights-01.png",
    description: "Dashboard UI implementation for spreadsheet analytics.",
    type: "Production Project",
    details: [
      "Implemented key dashboard interfaces for spreadsheet ingestion and analysis navigation.",
      "Built loading, progress, and tab interaction states for large workbook workflows.",
      "Improved table and chart usability for data-heavy decision-making surfaces.",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Firebase", "Firestore"],
    link: "https://headcount-ai.netlify.app/",
  },
  {
    id: "moviepicker",
    label: "Movie Picker",
    image: "/projects/moviepicker-01.png",
    description: "Recommendation app with weighted scoring and polished UX.",
    type: "Personal Project",
    details: [
      "Created recommendation logic using weighted mood, time, and genre preference signals.",
      "Integrated API retrieval with fallback handling for resilient content delivery.",
      "Designed and shipped a clean, animated frontend experience focused on simplicity.",
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    link: "https://movie-picker-bay.vercel.app/",
  },
];

export const Work = () => {
  const [modalId, setModalId] = useState<string | null>(null);
  const modalFeature = FEATURES.find((feature) => feature.id === modalId) ?? null;
  const modalIndex = modalFeature ? FEATURES.findIndex((feature) => feature.id === modalFeature.id) : -1;

  const menuItems = useMemo(
    () =>
      FEATURES.map((feature) => ({
        id: feature.id,
        image: feature.image,
        link: feature.link,
        title: feature.label,
        description: feature.description,
      })),
    []
  );

  const goToModalIndex = (index: number) => {
    const len = FEATURES.length;
    const wrapped = ((index % len) + len) % len;
    setModalId(FEATURES[wrapped].id);
  };

  useEffect(() => {
    if (!modalFeature) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.touchAction = prevBodyTouchAction;
    };
  }, [modalFeature]);

  return (
    <section id="work" className="section-shell">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-8 mb-10 items-start">
          <div className="lg:col-span-7">
            <p className="section-eyebrow">
              <span className="h-px w-8 bg-mint" /> 03 / PROJECTS
            </p>
            <h2 className="section-title">
              Selected <span className="text-gradient">Work</span>
            </h2>
          </div>
          <p className="lg:col-span-5 section-lead">
            Drag and explore my projects in a 3D infinite menu. Open any focused item for full details.
          </p>
        </div>

        <div className="relative h-[44vh] min-h-[340px] max-h-[500px] w-full overflow-hidden md:h-[50vh] md:min-h-[380px] md:max-h-[560px]">
          <InfiniteMenu
            items={menuItems}
            scale={0.82}
            onItemAction={(item) => {
              if (item.id) setModalId(item.id);
            }}
          />
        </div>
      </div>

      <AnimatePresence>
        {modalFeature && (
          <motion.div
            className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-md p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalId(null)}
          >
            <motion.div
              className="mx-auto h-[100dvh] w-full sm:mt-[2dvh] sm:h-[96dvh] sm:w-[96vw] sm:max-w-[1240px] rounded-none sm:rounded-3xl border border-border/70 bg-black/85 overflow-hidden"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid h-full lg:grid-cols-[1.9fr_0.95fr]">
                <div className="relative p-3 sm:p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-border/50 overflow-hidden">
                  <div className="absolute left-7 right-7 top-7 h-3 rounded-full bg-background/60 border border-border/40" />
                  <div className="mt-8 rounded-2xl overflow-hidden border border-border/60 relative">
                    <img
                      src={modalFeature.image}
                      alt={`${modalFeature.label} preview`}
                      className="w-full h-[44dvh] sm:h-[50dvh] lg:h-[72dvh] object-cover"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => goToModalIndex(modalIndex - 1)}
                    className="absolute left-8 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-border/60 bg-black/55 text-white grid place-items-center hover:bg-black/80 transition-colors"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToModalIndex(modalIndex + 1)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-border/60 bg-black/55 text-white grid place-items-center hover:bg-black/80 transition-colors"
                    aria-label="Next project"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div className="mt-5 flex items-center justify-center gap-2">
                    {FEATURES.map((feature, index) => (
                      <button
                        key={feature.id}
                        type="button"
                        onClick={() => goToModalIndex(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          feature.id === modalFeature.id ? "w-8 bg-white" : "w-2.5 bg-white/35 hover:bg-white/60"
                        }`}
                        aria-label={`Go to ${feature.label}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative p-5 sm:p-6 lg:p-7 overflow-hidden flex h-full flex-col">
                  <button
                    type="button"
                    onClick={() => setModalId(null)}
                    className="absolute top-5 right-5 h-11 w-11 rounded-full border border-border/60 bg-black/45 text-white grid place-items-center hover:bg-black/80 transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={17} />
                  </button>

                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 mt-1">
                    {modalFeature.type}
                  </p>
                  <h3 className="font-mono text-3xl lg:text-[2.2rem] font-bold leading-tight mb-5">
                    {modalFeature.label}
                  </h3>

                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Overview</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{modalFeature.description}</p>

                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Key Features</p>
                  <ul className="mb-6 border-y border-border/60">
                    {modalFeature.details.map((item, idx) => (
                      <li key={item} className="flex gap-3 py-2.5 border-b border-border/50 last:border-b-0">
                        <span className="font-mono text-[11px] text-muted-foreground/70 pt-0.5">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-muted-foreground leading-relaxed text-[0.98rem]">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {modalFeature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-border bg-background/55 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-3">
                    {modalFeature.link && modalFeature.link !== "#" ? (
                      <a
                        href={modalFeature.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-mint/45 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-mint hover:bg-mint/10 transition-colors"
                      >
                        Open Website
                        <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-md border border-border/70 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground/80 cursor-default"
                        aria-label="Website available on request"
                      >
                        Website Available on Request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

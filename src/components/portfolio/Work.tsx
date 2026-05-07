"use client";

import { useState, useEffect, useCallback } from "react";
import type { ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bot, ChartBar, Film, Scan, ArrowUpRight } from "lucide-react";

type Feature = {
  id: string;
  label: string;
  icon: ElementType;
  image: string;
  description: string;
  link: string;
};

const FEATURES: Feature[] = [
  {
    id: "posturease",
    label: "PosturEase",
    icon: Scan,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
    description: "Real-time posture recognition with ML and Flask integration.",
    link: "#",
  },
  {
    id: "supportiq",
    label: "SupportIQ",
    icon: Bot,
    image: "/projects/smartiq-01.png",
    description: "AI-assisted support workflow with policy-based routing.",
    link: "#",
  },
  {
    id: "lifesights",
    label: "LifeSights",
    icon: ChartBar,
    image: "/projects/lifesights-01.png",
    description: "Dashboard UI implementation for spreadsheet analytics.",
    link: "#",
  },
  {
    id: "moviepicker",
    label: "Movie Picker",
    icon: Film,
    image: "/projects/moviepicker-01.png",
    description: "Movie recommendation app",
    link: "#",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 64;

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export const Work = () => {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentIndex = ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => window.clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalized = diff;
    if (diff > len / 2) normalized -= len;
    if (diff < -len / 2) normalized += len;
    if (normalized === 0) return "active";
    if (normalized === -1) return "prev";
    if (normalized === 1) return "next";
    return "hidden";
  };

  return (
    <section id="work" className="section-shell">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-8 mb-12 items-start">
          <div className="lg:col-span-7">
            <p className="section-eyebrow">
              <span className="h-px w-8 bg-mint" /> 03 / PROJECTS
            </p>
            <h2 className="section-title">
              Selected <span className="text-gradient">Work</span>
            </h2>
          </div>
          <p className="lg:col-span-5 section-lead">
            Interactive rotating showcase of my project work, UI craft, and implementation focus.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto md:p-2">
          <div className="relative overflow-visible flex flex-col lg:flex-row min-h-[600px] lg:aspect-video">
            <div className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-transparent">
              <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-background via-background/80 to-transparent z-40" />
              <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-background via-background/80 to-transparent z-40" />

              <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
                {FEATURES.map((feature, index) => {
                  const isActive = index === currentIndex;
                  const distance = index - currentIndex;
                  const wrappedDistance = wrap(-(FEATURES.length / 2), FEATURES.length / 2, distance);
                  const Icon = feature.icon;

                  return (
                    <motion.div
                      key={feature.id}
                      style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                      animate={{
                        y: wrappedDistance * ITEM_HEIGHT,
                        opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                      }}
                      transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                      className="absolute flex items-center justify-start"
                    >
                      <button
                        type="button"
                        onClick={() => handleChipClick(index)}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        className={cn(
                          "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border",
                          isActive
                            ? "bg-white text-foreground border-white z-10"
                            : "bg-background/35 text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                        )}
                      >
                        <div className={cn("flex items-center justify-center transition-colors duration-500", isActive ? "text-[#62B2FE]" : "text-white/40")}>
                          <Icon size={18} strokeWidth={2} />
                        </div>
                        <span className="font-normal text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase">
                          {feature.label}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-transparent flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden">
              <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
                {FEATURES.map((feature, index) => {
                  const status = getCardStatus(index);
                  const isActive = status === "active";
                  const isPrev = status === "prev";
                  const isNext = status === "next";

                  return (
                    <motion.div
                      key={feature.id}
                      initial={false}
                      animate={{
                        x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                        scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                        opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                        rotate: isPrev ? -3 : isNext ? 3 : 0,
                        zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                      className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-background bg-background origin-center"
                    >
                      <img
                        src={feature.image}
                        alt={feature.label}
                        className={cn(
                          "w-full h-full object-cover transition-all duration-700",
                          isActive ? "grayscale-0 blur-0" : "grayscale blur-[2px] brightness-75"
                        )}
                      />

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute inset-x-0 bottom-0 p-10 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                          >
                            <p className="text-white font-normal text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight">
                              {feature.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <a
                        href={feature.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "absolute top-8 right-8 h-10 w-10 rounded-full border border-white/25 bg-black/35 text-white grid place-items-center backdrop-blur-sm transition-all",
                          isActive ? "opacity-100 hover:bg-white hover:text-black" : "opacity-0 pointer-events-none"
                        )}
                        aria-label={`Open ${feature.label}`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

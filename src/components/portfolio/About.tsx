import { useState, useEffect, useRef } from "react";
import type { ElementType } from "react";
import {
  ArrowRight,
  Link,
  Zap,
  Code2,
  LayoutDashboard,
  Bot,
  Workflow,
  Database,
  Palette,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  energy: number;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Frontend UI",
    date: "Core",
    content:
      "Design and build responsive interfaces using React, TypeScript, and Tailwind with clear hierarchy and interaction polish.",
    category: "frontend",
    icon: Code2,
    relatedIds: [2, 3],
    energy: 88,
  },
  {
    id: 2,
    title: "Dashboard UX",
    date: "Applied",
    content:
      "Create data-heavy dashboard flows with filters, charts, and table experiences that stay readable and actionable.",
    category: "product-ui",
    icon: LayoutDashboard,
    relatedIds: [1, 4],
    energy: 80,
  },
  {
    id: 3,
    title: "AI Workflows",
    date: "Applied",
    content:
      "Integrate AI-assisted features and automation workflows into practical user experiences while keeping controls human-friendly.",
    category: "ai",
    icon: Bot,
    relatedIds: [1, 4],
    energy: 76,
  },
  {
    id: 4,
    title: "System Thinking",
    date: "Growth",
    content:
      "Connect frontend interactions with data pipelines, backend constraints, and user goals to ship reliable end-to-end solutions.",
    category: "systems",
    icon: Workflow,
    relatedIds: [2, 3],
    energy: 70,
  },
  {
    id: 5,
    title: "Database UX",
    date: "Applied",
    content:
      "Build practical UI flows connected to structured data models with Supabase and Firebase-backed interfaces.",
    category: "data",
    icon: Database,
    relatedIds: [2, 4, 6],
    energy: 72,
  },
  {
    id: 6,
    title: "Design Systems",
    date: "Growth",
    content:
      "Develop reusable UI patterns and component structure for consistency across pages, states, and interaction variants.",
    category: "design-system",
    icon: Palette,
    relatedIds: [1, 2, 7],
    energy: 74,
  },
  {
    id: 7,
    title: "Product Flow",
    date: "Core",
    content:
      "Map user journeys from entry point to action so experiences feel guided, fast, and understandable.",
    category: "product",
    icon: Layers,
    relatedIds: [2, 6, 8],
    energy: 82,
  },
  {
    id: 8,
    title: "Automation UX",
    date: "Applied",
    content:
      "Translate backend automations into clear frontend controls so users always know what happened and what to do next.",
    category: "automation",
    icon: Workflow,
    relatedIds: [3, 5, 7],
    energy: 78,
  },
];

export const About = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [orbitScale, setOrbitScale] = useState<number>(1);
  const [orbitDiameter, setOrbitDiameter] = useState<number>(700);
  const orbitRef = useRef<HTMLDivElement>(null);
  const orbitShellRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  useEffect(() => {
    let rotationTimer: number | undefined;

    if (autoRotate) {
      rotationTimer = window.setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        window.clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  useEffect(() => {
    const updateOrbitLayout = () => {
      const shell = orbitShellRef.current;
      if (!shell) return;

      const shellWidth = shell.clientWidth;
      const viewportHeight = window.innerHeight;
      const availableWidth = Math.max(500, shellWidth - 72);
      const availableHeight = Math.max(500, viewportHeight - 280);
      const nextDiameter = Math.min(620, availableWidth, availableHeight);

      setOrbitDiameter(nextDiameter);
      setOrbitScale(nextDiameter / 700);
    };

    updateOrbitLayout();

    const observer = new ResizeObserver(() => {
      updateOrbitLayout();
    });

    if (orbitShellRef.current) {
      observer.observe(orbitShellRef.current);
    }

    window.addEventListener("resize", updateOrbitLayout);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOrbitLayout);
    };
  }, []);

  const calculateNodePosition = (index: number, total: number) => {
    const orbitBands = [170, 230, 290].map((radius) => radius * orbitScale);
    const bandIndex = index % orbitBands.length;
    const radius = orbitBands[bandIndex];
    const baseAngle = (index / total) * 360;
    const ringOffset = bandIndex === 0 ? -12 : bandIndex === 1 ? 10 : -6;
    const localSpread = (Math.floor(index / orbitBands.length) % 2 === 0 ? 1 : -1) * 8;
    const angle = (baseAngle + ringOffset + localSpread + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!hoveredId) return false;
    const relatedItems = getRelatedItems(hoveredId);
    return relatedItems.includes(itemId);
  };

  return (
    <section id="expertise" className="section-shell">
      <div className="container">
        <p className="section-eyebrow">
          <span className="h-px w-8 bg-mint" /> 02 / EXPERTISE
        </p>
        <h2 className="section-title mb-6">
          Skill Orbit <span className="text-gradient">Map</span>
        </h2>
        <p className="section-lead max-w-2xl mb-10">
          My strengths span frontend engineering, dashboard UX, AI-assisted workflows, and system-level product thinking.
        </p>

        <div
          ref={orbitShellRef}
          className="relative w-full flex flex-col items-center justify-center overflow-visible pt-2"
          style={{ minHeight: `${Math.max(500, orbitDiameter + 48)}px` }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/4 top-1/4 h-56 w-56 rounded-full bg-mint/10 blur-3xl animate-pulse" />
            <div
              className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-mint-glow/10 blur-3xl animate-pulse"
              style={{ animationDelay: "0.8s" }}
            />
          </div>
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center px-4 sm:px-8">
            <div
              className="absolute w-full h-full flex items-center justify-center"
              ref={orbitRef}
              style={{
                perspective: "1000px",
                transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
              }}
            >
              <div
                className="absolute rounded-full bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 animate-pulse flex items-center justify-center z-10"
                style={{ width: `${80 * orbitScale}px`, height: `${80 * orbitScale}px` }}
              >
                <div
                  className="absolute rounded-full border border-white/20 animate-ping opacity-70"
                  style={{ width: `${112 * orbitScale}px`, height: `${112 * orbitScale}px` }}
                />
                <div
                  className="absolute rounded-full border border-white/10 animate-ping opacity-50"
                  style={{ width: `${144 * orbitScale}px`, height: `${144 * orbitScale}px`, animationDelay: "0.5s" }}
                />
                <div
                  className="rounded-full bg-white/80 backdrop-blur-md"
                  style={{ width: `${40 * orbitScale}px`, height: `${40 * orbitScale}px` }}
                />
              </div>

              <div
                className="absolute rounded-full border border-white/10"
                style={{ width: `${340 * orbitScale}px`, height: `${340 * orbitScale}px` }}
              />
              <div
                className="absolute rounded-full border border-white/8"
                style={{ width: `${460 * orbitScale}px`, height: `${460 * orbitScale}px` }}
              />
              <div
                className="absolute rounded-full border border-white/[0.06]"
                style={{ width: `${580 * orbitScale}px`, height: `${580 * orbitScale}px` }}
              />
              <div
                className="absolute rounded-full border border-white/[0.04]"
                style={{ width: `${700 * orbitScale}px`, height: `${700 * orbitScale}px` }}
              />

              {timelineData.map((item, index) => {
                const position = calculateNodePosition(index, timelineData.length);
                const isExpanded = hoveredId === item.id;
                const isRelated = isRelatedToActive(item.id);
                const isPulsing = isRelated && hoveredId !== null;
                const Icon = item.icon;

                const nodeStyle = {
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                };

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      nodeRefs.current[item.id] = el;
                    }}
                    className="absolute transition-all duration-700 cursor-pointer"
                    style={nodeStyle}
                    onMouseEnter={() => {
                      setHoveredId(item.id);
                      setAutoRotate(false);
                    }}
                    onMouseLeave={() => {
                      setHoveredId(null);
                      setAutoRotate(true);
                    }}
                  >
                    <div
                      className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                        width: `${item.energy * 0.6 + 56}px`,
                        height: `${item.energy * 0.6 + 56}px`,
                        left: `-${(item.energy * 0.6 + 56 - 56) / 2}px`,
                        top: `-${(item.energy * 0.6 + 56 - 56) / 2}px`,
                      }}
                    />

                    <div
                      className={`
                        w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform
                        ${
                          isExpanded
                            ? "bg-white text-black border-white shadow-lg shadow-white/30 scale-150"
                            : isRelated
                            ? "bg-white/50 text-black border-white animate-pulse"
                            : "bg-black text-white border-white/40"
                        }
                      `}
                    >
                      <Icon size={16} />
                    </div>

                    <div
                      className={`absolute top-16 whitespace-nowrap text-sm font-semibold tracking-wider transition-all duration-300 ${
                        isExpanded ? "text-white scale-110" : "text-white/70"
                      }`}
                    >
                      {item.title}
                    </div>

                    {isExpanded && (
                      <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 overflow-visible border-white/30 bg-black/90 shadow-xl shadow-white/10 backdrop-blur-lg">
                        <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                              Focus Area
                            </span>
                            <span className="text-xs font-mono text-white/50">{item.date}</span>
                          </div>
                          <CardTitle className="mt-2 text-sm">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs text-white/80">
                          <p>{item.content}</p>

                          <div className="mt-4 border-t border-white/10 pt-3">
                            <div className="mb-1 flex items-center justify-between text-xs">
                              <span className="flex items-center">
                                <Zap size={10} className="mr-1" />
                                Energy Level
                              </span>
                              <span className="font-mono">{item.energy}%</span>
                            </div>
                            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                style={{ width: `${item.energy}%` }}
                              />
                            </div>
                          </div>

                          {item.relatedIds.length > 0 && (
                            <div className="mt-4 border-t border-white/10 pt-3">
                              <div className="mb-2 flex items-center">
                                <Link size={10} className="mr-1 text-white/70" />
                                <h4 className="text-xs font-medium uppercase tracking-wider text-white/70">
                                  Connected Nodes
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {item.relatedIds.map((relatedId) => {
                                  const relatedItem = timelineData.find((i) => i.id === relatedId);
                                  return (
                                    <Button
                                      key={relatedId}
                                      variant="outline"
                                      size="sm"
                                      className="flex h-6 items-center rounded-none border-white/20 bg-transparent px-2 py-0 text-xs text-white/80 transition-all hover:bg-white/10 hover:text-white"
                                      onMouseEnter={() => {
                                        setHoveredId(relatedId);
                                        setAutoRotate(false);
                                      }}
                                    >
                                      {relatedItem?.title}
                                      <ArrowRight size={8} className="ml-1 text-white/60" />
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

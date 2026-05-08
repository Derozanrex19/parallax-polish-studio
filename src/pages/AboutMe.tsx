import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Folder, Heart, Smartphone } from "lucide-react";

const movies = [
  {
    title: "The Godfather Part II",
    tag: "Narrative Depth",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "In the Mood for Love",
    tag: "Visual Restraint",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Seven Samurai",
    tag: "Team Dynamics",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop",
  },
];

const artists = ["The Beatles", "Radiohead", "IV of Spades"];

const float = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const windowFrame =
  "border border-[#3256ff] bg-[#f5f4ef] text-[#2643de] shadow-[0_10px_30px_rgba(24,55,255,0.08)]";

const AboutMe = () => {
  return (
    <main className="min-h-screen bg-[#f2f1ea] text-[#2643de]">
      <section
        className="relative min-h-screen overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(50,86,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(50,86,255,0.10) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      >
        <div className="container relative pt-10 pb-24">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
            >
              <ArrowLeft size={14} /> Back to portfolio
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">Get to know me</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <h1 className="font-mono text-5xl sm:text-7xl leading-[0.94] tracking-tight">
              A designer with
              <br />
              a tasteboard brain.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#2a46d5]/85">
              I'm Wrexel, a 21-year-old BSIT graduate from the University of Cebu Lapu-Lapu and Mandaue. I've never been the type to stay in one lane, and I stopped trying to a long time ago. Off the screen, you'll find me on the court playing basketball, rewatching a film I've already seen three times, grinding ranked in Valorant, causing chaos in Los Santos, or blaming my teammates in Dota 2 when the real problem is probably me. I'm a jack of all trades and I wear that proudly, not as a disclaimer but as a way of seeing the world.
<br></br>
              Growing up, I was always drawn to things that were well made. A film that hits differently at the end. A song that builds and then breaks perfectly. A game with a world so detailed you forget you're in one. I didn't know it then, but I was already paying attention to design. I just didn't have a word for it yet.
              That's what I bring to the work. A curiosity that doesn't clock out, a eye shaped by everything I consume, and a genuine obsession with making things that feel right and not just look right. Whether it's a brand, an interface, or something in between, I care about the whole thing. Every detail, every decision, every layer underneath what people actually see.
            </p>
          </motion.div>

          <div className="relative mt-16 h-[980px] sm:h-[920px] lg:h-[760px]">
            <motion.article
              variants={float}
              animate="animate"
              className={`absolute left-0 top-2 w-[160px] sm:w-[200px] ${windowFrame}`}
            >
              <div className="flex items-center justify-between px-2 py-1 border-b border-[#3256ff] font-mono text-[10px] uppercase tracking-widest">
                <span>Note</span>
                <span>x</span>
              </div>
              <div className="p-3 font-mono text-xs">I design for clarity, rhythm, and emotional timing.</div>
            </motion.article>

            <motion.article
              variants={float}
              animate="animate"
              transition={{ delay: 0.3 }}
              className={`absolute left-[10%] top-40 w-[260px] sm:w-[300px] ${windowFrame}`}
            >
              <div className="flex items-center justify-between px-2 py-1 border-b border-[#3256ff] font-mono text-[10px] uppercase tracking-widest">
                <span>{movies[0].tag}</span>
                <span>x</span>
              </div>
              <img src={movies[0].image} alt={movies[0].title} className="h-[240px] w-full object-cover" />
              <div className="p-3">
                <span className="inline-block rounded-full bg-[#3256ff] text-[#f5f4ef] font-mono text-xs px-3 py-1">{movies[0].title}</span>
              </div>
            </motion.article>

            <motion.article
              variants={float}
              animate="animate"
              transition={{ delay: 0.6 }}
              className={`absolute left-[36%] top-24 w-[260px] sm:w-[300px] ${windowFrame}`}
            >
              <div className="flex items-center justify-between px-2 py-1 border-b border-[#3256ff] font-mono text-[10px] uppercase tracking-widest">
                <span>{movies[1].tag}</span>
                <span>x</span>
              </div>
              <img src={movies[1].image} alt={movies[1].title} className="h-[240px] w-full object-cover" />
              <div className="p-3">
                <span className="inline-block rounded-full bg-[#3256ff] text-[#f5f4ef] font-mono text-xs px-3 py-1">{movies[1].title}</span>
              </div>
            </motion.article>

            <motion.article
              variants={float}
              animate="animate"
              transition={{ delay: 0.9 }}
              className={`absolute left-[62%] top-44 w-[260px] sm:w-[300px] ${windowFrame}`}
            >
              <div className="flex items-center justify-between px-2 py-1 border-b border-[#3256ff] font-mono text-[10px] uppercase tracking-widest">
                <span>{movies[2].tag}</span>
                <span>x</span>
              </div>
              <img src={movies[2].image} alt={movies[2].title} className="h-[240px] w-full object-cover" />
              <div className="p-3">
                <span className="inline-block rounded-full bg-[#3256ff] text-[#f5f4ef] font-mono text-xs px-3 py-1">{movies[2].title}</span>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`absolute left-[8%] top-[530px] w-[300px] ${windowFrame}`}
            >
              <div className="flex items-center justify-between px-2 py-1 border-b border-[#3256ff] font-mono text-[10px] uppercase tracking-widest">
                <span>Music Rotation</span>
                <span>x</span>
              </div>
              <div className="p-4 space-y-2">
                {artists.map((artist) => (
                  <p key={artist} className="font-mono text-sm uppercase tracking-wide">
                    {artist}
                  </p>
                ))}
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className={`absolute left-[45%] top-[560px] w-[360px] ${windowFrame}`}
            >
              <div className="flex items-center justify-between px-2 py-1 border-b border-[#3256ff] font-mono text-[10px] uppercase tracking-widest">
                <span>Basketball</span>
                <span>x</span>
              </div>
              <div className="p-4 text-sm leading-relaxed text-[#2a46d5]/90">
                Basketball keeps my design mindset sharp: spacing, timing, communication, and making smart decisions under
                pressure.
              </div>
            </motion.article>

            <motion.div variants={float} animate="animate" transition={{ delay: 1.1 }} className="absolute right-5 top-10">
              <Heart className="h-14 w-14" />
            </motion.div>
            <motion.div variants={float} animate="animate" transition={{ delay: 1.3 }} className="absolute right-10 bottom-24">
              <Smartphone className="h-12 w-12" />
            </motion.div>
            <motion.div variants={float} animate="animate" transition={{ delay: 1.5 }} className="absolute right-24 bottom-8">
              <Folder className="h-12 w-12" />
            </motion.div>
          </div>
        </div>

        <div className="border-t border-[#3256ff]/30 px-5 py-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#2a46d5]/80">
          <span>Built with minimalist intent</span>
          <span>Get to know me / personal board</span>
        </div>
      </section>
    </main>
  );
};

export default AboutMe;

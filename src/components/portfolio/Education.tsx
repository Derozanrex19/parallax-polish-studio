import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

export const Education = () => {
  return (
    <section id="education" className="relative py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="font-mono text-mint text-xs tracking-widest mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-mint" /> 05 / EDUCATION
          </p>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold leading-tight">
            Background &amp; <span className="text-gradient">credentials</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 hover:border-mint/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4 text-mint">
              <GraduationCap size={20} />
              <span className="font-mono text-xs uppercase tracking-widest">Education</span>
            </div>
            <h3 className="font-mono text-xl font-bold mb-2">
              Bachelor of Science in Information Technology
            </h3>
            <p className="text-muted-foreground">
              University of Cebu — Lapu-Lapu and Mandaue
            </p>
            <p className="font-mono text-xs text-muted-foreground/80 mt-2">
              August 2022 – Present
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 hover:border-mint/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4 text-mint">
              <Award size={20} />
              <span className="font-mono text-xs uppercase tracking-widest">Certification</span>
            </div>
            <h3 className="font-mono text-xl font-bold mb-2">
              CCNAv7: Switching, Routing, and Wireless Essentials
            </h3>
            <p className="text-muted-foreground">Cisco Network Academy</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

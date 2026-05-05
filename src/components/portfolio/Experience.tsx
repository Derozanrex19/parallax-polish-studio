import { motion } from "framer-motion";

const jobs = [
  {
    role: "Intern",
    company: "Lifewood Data Technology",
    period: "January 2026 – Present",
    bullets: [
      "Promoted company initiatives through multi-platform social media campaigns under the Pearl27 project",
      "Applied prompt engineering techniques to support AI-related workflows and automation",
      "Contributed to development of web-based and system-driven projects",
      "Assisted in AI automation processes to improve operational efficiency",
      "Participated in game development and interactive applications",
      "Collaborated in project planning, coordination, and execution across distributed teams",
      "Continuously explored and implemented emerging technologies in real-world applications",
    ],
  },
  {
    role: "Customer Service Representative",
    company: "Amazon",
    period: "July 2024 – December 2024",
    bullets: [
      "Resolved customer concerns related to orders, payments, and deliveries",
      "Performed troubleshooting for devices and services",
      "Simplified technical issues for non-technical users",
      "Maintained strict adherence to SOPs and data privacy standards",
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="relative py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="font-mono text-mint text-xs tracking-widest mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-mint" /> 02 / EXPERIENCE
          </p>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold leading-tight">
            Where I've <span className="text-gradient">worked</span>.
          </h2>
        </motion.div>

        <div className="relative grid gap-6">
          {jobs.map((job, i) => (
            <motion.article
              key={job.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="grid md:grid-cols-12 gap-6 rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 hover:border-mint/40 transition-colors"
            >
              <div className="md:col-span-4">
                <p className="font-mono text-xs text-mint tracking-widest mb-2">
                  {job.period}
                </p>
                <h3 className="font-mono text-xl font-bold">{job.role}</h3>
                <p className="text-muted-foreground mt-1">{job.company}</p>
              </div>
              <ul className="md:col-span-8 space-y-3">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-muted-foreground leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

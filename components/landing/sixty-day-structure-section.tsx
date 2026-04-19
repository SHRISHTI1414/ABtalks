"use client";

import { motion } from "framer-motion";
import type { TimelinePhase } from "@/lib/landing-content";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const phaseItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function SixtyDayStructureSection({
  phases,
}: {
  phases: TimelinePhase[];
}) {
  return (
    <section
      id="structure"
      className="py-16 md:py-20"
      aria-labelledby="structure-heading"
    >
      <div className="w-full">
        <motion.h2
          id="structure-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
          className="text-center text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl"
        >
          60-Day Roadmap
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mx-auto mt-3 max-w-md text-center text-sm text-slate-500 dark:text-slate-400 md:text-base"
        >
          Four checkpoints from day one to interview-ready.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:items-stretch"
        >
          {phases.map((phase) => (
            <motion.div key={phase.id} variants={phaseItem} className="min-h-0 md:flex">
              <div className="flex h-full min-h-[140px] w-full flex-col justify-center rounded-2xl border-0 bg-card px-4 py-5 text-center shadow-md shadow-black/[0.04] backdrop-blur-sm transition-shadow duration-200 hover:shadow-lg dark:shadow-black/25 md:px-3">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Day {phase.day}
                </span>
                <h3 className="mt-2 text-sm font-semibold leading-tight tracking-tight text-foreground sm:text-base">
                  {phase.label}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

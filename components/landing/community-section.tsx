"use client";

import { motion } from "framer-motion";
import type { CommunityStat } from "@/lib/landing-content";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function CommunitySection({ stats }: { stats: CommunityStat[] }) {
  return (
    <section
      id="community"
      className="py-16 md:py-20"
      aria-labelledby="community-heading"
    >
      <div className="w-full">
        <motion.h2
          id="community-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
          className="text-center text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl"
        >
          Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mx-auto mt-3 max-w-md text-center text-sm text-slate-500 dark:text-slate-400 md:text-base"
        >
          Numbers from the ABTalks platform—growing with every cohort.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 grid min-w-0 grid-cols-3 gap-2 sm:gap-5"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={statItem}
              className="rounded-2xl border-0 bg-card px-4 py-6 text-center shadow-md shadow-black/[0.04] backdrop-blur-sm transition-shadow duration-200 hover:shadow-lg dark:shadow-black/25 sm:px-6 sm:py-8"
            >
              <p className="text-2xl font-semibold leading-tight tracking-tight text-primary sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

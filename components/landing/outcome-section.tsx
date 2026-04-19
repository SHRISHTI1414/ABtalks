"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  ShieldCheck,
  Briefcase,
  Brain,
  type LucideIcon,
} from "lucide-react";
import type { OutcomeItem } from "@/lib/landing-content";

const iconMap: LucideIcon[] = [
  Lightbulb,
  ShieldCheck,
  Briefcase,
  Brain,
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function OutcomeSection({ outcomes }: { outcomes: OutcomeItem[] }) {
  return (
    <section
      id="outcomes"
      className="border-t border-slate-800/60 px-4 py-20 md:py-24"
      aria-labelledby="outcomes-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="outcomes-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
        >
          What You Walk Away With.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mx-auto mt-4 max-w-2xl text-center text-slate-400"
        >
          Transformation-focused outcomes that matter for your next role.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {outcomes.map((outcome, index) => {
            const Icon = iconMap[index % iconMap.length]!;
            return (
              <motion.div
                key={outcome.id}
                variants={item}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-violet-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-100">
                  {outcome.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {outcome.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

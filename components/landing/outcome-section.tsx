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

const iconMap: LucideIcon[] = [Lightbulb, ShieldCheck, Briefcase, Brain];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function OutcomeSection({ outcomes }: { outcomes: OutcomeItem[] }) {
  return (
    <section
      id="outcomes"
      className="px-4 py-16 md:py-20"
      aria-labelledby="outcomes-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="outcomes-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl"
        >
          What you walk away with
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400 md:text-base"
        >
          Outcomes that matter for your next role.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {outcomes.map((outcome, index) => {
            const Icon = iconMap[index % iconMap.length]!;
            return (
              <motion.div
                key={outcome.id}
                variants={item}
                className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                  {outcome.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
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

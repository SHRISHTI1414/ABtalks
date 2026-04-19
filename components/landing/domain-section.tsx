"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Sparkles, type LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import type { DomainCard } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

const icons: LucideIcon[] = [Code2, Brain, Sparkles];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function DomainSection({ domains }: { domains: DomainCard[] }) {
  return (
    <section
      id="domains"
      className="border-t border-slate-800/60 px-4 py-20 md:py-24"
      aria-labelledby="domains-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="domains-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
        >
          Domains We Focus On
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mx-auto mt-4 max-w-2xl text-center text-slate-400"
        >
          Software Engineering, Machine Learning, and AI—aligned with real
          industry roles.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {domains.map((domain, index) => {
            const Icon = icons[index % icons.length]!;
            return (
              <motion.div key={domain.id} variants={cardItem}>
                <Card
                  className={cn(
                    "h-full border-slate-800/80 bg-slate-900/40 transition-all duration-300",
                    "rounded-2xl hover:border-slate-700/80 hover:bg-slate-900/60 hover:shadow-xl hover:shadow-violet-950/20 hover:-translate-y-0.5"
                  )}
                >
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-violet-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100">
                      {domain.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {domain.missionDescription}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Skills outcome
                      </p>
                      <ul className="mt-1 flex flex-wrap gap-2">
                        {domain.skillsOutcome.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-xs text-slate-500">
                      {domain.industryAlignment}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

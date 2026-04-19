"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { DomainCard } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

const icons = [Code2, Brain, Sparkles] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export function DomainSection({ domains }: { domains: DomainCard[] }) {
  return (
    <section
      id="domains"
      className="py-16 md:py-20"
      aria-labelledby="domains-heading"
    >
      <div className="w-full">
        <motion.h2
          id="domains-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
          className="text-center text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl"
        >
          Domains
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mx-auto mt-3 max-w-lg text-center text-sm text-slate-500 dark:text-slate-400 md:text-base"
        >
          Software, ML, and AI—aligned with how teams actually hire.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {domains.map((domain, index) => {
            const Icon = icons[index % icons.length];
            const bullets = domain.skillsOutcome.slice(0, 3);
            return (
              <motion.div key={domain.id} variants={cardItem}>
                <Card
                  className={cn(
                    "h-full rounded-2xl border-0 bg-card shadow-md shadow-black/[0.04] backdrop-blur-sm transition-shadow duration-200",
                    "hover:shadow-lg dark:shadow-black/20"
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold leading-tight tracking-tight text-card-foreground">
                      {domain.title}
                    </h3>
                    <p className="text-sm leading-snug text-slate-500 dark:text-slate-400 md:text-[0.9375rem]">
                      {domain.missionDescription}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                      {bullets.map((skill) => (
                        <li key={skill} className="flex gap-2">
                          <span className="text-primary" aria-hidden>
                            ·
                          </span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
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

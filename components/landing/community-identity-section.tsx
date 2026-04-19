"use client";

import { motion } from "framer-motion";
import { Map, Mic2, Podcast, Users, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CommunityIdentityBlock } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

const iconMap: Record<CommunityIdentityBlock["icon"], LucideIcon> = {
  roadmap: Map,
  mic: Mic2,
  podcast: Podcast,
  users: Users,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export function CommunityIdentitySection({
  blocks,
}: {
  blocks: CommunityIdentityBlock[];
}) {
  return (
    <section
      id="identity"
      className="py-16 md:py-20"
      aria-labelledby="identity-heading"
    >
      <div className="w-full">
        <motion.h2
          id="identity-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
          className="text-center text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl"
        >
          Why ABTalks Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400 md:text-base"
        >
          Structure, exposure, honest talks, and a community that keeps you moving.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {blocks.map((block) => {
            const Icon = iconMap[block.icon];
            return (
              <motion.div key={block.id} variants={item}>
                <Card
                  className={cn(
                    "h-full rounded-2xl border-0 bg-card shadow-md shadow-black/[0.04] backdrop-blur-sm transition-shadow duration-200",
                    "hover:shadow-lg hover:shadow-black/[0.06] dark:shadow-black/20"
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold leading-tight tracking-tight text-card-foreground">
                      {block.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-snug text-slate-500 dark:text-slate-400 md:text-[0.9375rem]">
                      {block.description}
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

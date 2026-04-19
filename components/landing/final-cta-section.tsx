"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section
      id="cta"
      className="relative bg-muted/20 py-16 md:py-20"
      aria-labelledby="cta-heading"
    >
      <div className="w-full text-center">
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl"
        >
          Ready for structured, industry-aligned growth?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="mt-4 text-sm text-slate-600 dark:text-slate-400 md:text-base"
        >
          Join the community and start with a clear 60-day path.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.16 }}
          className="mt-8"
        >
          <Button
            size="lg"
            className="rounded-lg bg-orange-500 px-10 text-base font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 hover:shadow-orange-500/30"
            asChild
          >
            <Link href="/signup">Start your journey</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

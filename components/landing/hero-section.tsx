"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[min(60vh,560px)] w-full flex-col justify-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-gradient-to-b from-orange-100/50 via-background to-amber-50/30 dark:from-orange-950/20 dark:via-background dark:to-stone-950/50"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400 sm:text-xs"
          >
            Community-led learning
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-800 dark:text-slate-100 md:text-6xl"
          >
            Learn from people{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              shaping the industry
            </span>
            <span className="text-slate-800 dark:text-slate-100">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base"
          >
            Live sessions and honest conversations with leaders from top tech—structured growth without the noise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex w-full flex-col items-stretch gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
          >
            <Button
              size="lg"
              className="h-auto rounded-lg bg-orange-500 px-7 py-3.5 text-[0.9375rem] font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 sm:min-w-[200px]"
              asChild
            >
              <Link href="/signup">Join ABTalks</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-auto rounded-lg border-[#e8dccb] bg-card/80 px-7 py-3.5 text-[0.9375rem] font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:border-orange-200 hover:bg-card dark:border-white/10 dark:hover:border-white/20 sm:min-w-[200px]"
              asChild
            >
              <Link href="/events">Browse sessions</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

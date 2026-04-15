"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

// Floating card config: thumbnails/avatars use CSS placeholders (no network); logos are inline SVG.
const FLOATING_CARDS = [
  {
    id: "thumb-1",
    type: "thumbnail",
    className: "w-28 sm:w-36 aspect-video top-[12%] left-[8%]",
    delay: 0,
    duration: 6,
    yOffset: 8,
  },
  {
    id: "google",
    type: "logo",
    name: "Google",
    className: "w-20 sm:w-24 aspect-square top-[18%] right-[12%]",
    delay: 0.5,
    duration: 7,
    yOffset: -6,
  },
  {
    id: "speaker-1",
    type: "avatar",
    className: "w-16 sm:w-20 aspect-square rounded-full top-[55%] left-[6%]",
    delay: 1,
    duration: 5.5,
    yOffset: 10,
  },
  {
    id: "microsoft",
    type: "logo",
    name: "Microsoft",
    className: "w-20 sm:w-24 aspect-square top-[50%] right-[8%]",
    delay: 0.3,
    duration: 6.5,
    yOffset: -8,
  },
  {
    id: "thumb-2",
    type: "thumbnail",
    className: "w-24 sm:w-32 aspect-video bottom-[20%] left-[15%]",
    delay: 0.8,
    duration: 7.2,
    yOffset: 6,
  },
  {
    id: "amazon",
    type: "logo",
    name: "Amazon",
    className: "w-20 sm:w-24 aspect-square bottom-[25%] right-[14%]",
    delay: 0.2,
    duration: 5.8,
    yOffset: -5,
  },
  {
    id: "speaker-2",
    type: "avatar",
    className: "w-14 sm:w-16 aspect-square rounded-full bottom-[15%] right-[22%]",
    delay: 0.6,
    duration: 6,
    yOffset: 7,
  },
] as const;

function CompanyLogo({ name }: { name: string }) {
  const common = "fill-current text-white/90";
  if (name === "Google") {
    return (
      <svg viewBox="0 0 24 24" className="size-full p-1.5" aria-hidden>
        <path
          className={common}
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          className={common}
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          className={common}
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          className={common}
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    );
  }
  if (name === "Microsoft") {
    return (
      <svg viewBox="0 0 24 24" className="size-full p-1" aria-hidden>
        <path className={common} d="M11.4 11H3V3h8.4v8zM21 3h-8.4v8H21V3zM11.4 21H3v-8h8.4v8zM21 13h-8.4v8H21v-8z" />
      </svg>
    );
  }
  if (name === "Amazon") {
    return (
      <svg viewBox="0 0 24 24" className="size-full p-1" aria-hidden>
        <path
          className={common}
          d="M15.23 17.22l-1.54-3.42h-.06l-1.55 3.42h-2.08l2.54-5.5h2.11l2.54 5.5h-2.06zm-2.16-4.18l.88 1.94.88-1.94h-1.76zm5.63 4.18l-2.09-5.5h1.94l1.34 3.77 1.33-3.77h1.95l-2.09 5.5h-2.38z"
        />
      </svg>
    );
  }
  return null;
}

function FloatingCard(
  props: (typeof FLOATING_CARDS)[number] & { parallaxY: any }
) {
  const { type, className, delay, duration, yOffset, parallaxY } = props;
  const isLogo = type === "logo" && "name" in props;
  const isAvatar = type === "avatar";
  const isThumb = type === "thumbnail";

  return (
    <motion.div
      className={`absolute rounded-2xl overflow-hidden bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 shadow-xl ${className}`}
      style={{
        opacity: 0.15,
        filter: "blur(0.5px)",
        y: parallaxY,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)",
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.15,
        y: [0, yOffset, 0],
      }}
      transition={{
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 0.8, delay },
      }}
    >
      {isLogo && <CompanyLogo name={(props as { name: string }).name} />}
      {isAvatar && (
        <div
          className="size-full bg-gradient-to-br from-violet-600/80 to-blue-700/80"
          aria-hidden
        />
      )}
      {isThumb && (
        <div
          className="size-full bg-gradient-to-br from-slate-600/80 to-slate-700/80"
          aria-hidden
        />
      )}
    </motion.div>
  );
}

function HeroBackground({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <>
      {/* Layer 1: Dark animated gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-slate-950"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-100"
        aria-hidden
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(59,130,246,0.08), transparent 50%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(139,92,246,0.06), transparent 50%)",
            "radial-gradient(ellipse 85% 55% at 50% -15%, rgba(99,102,241,0.2), transparent 55%), radial-gradient(ellipse 65% 45% at 75% 45%, rgba(59,130,246,0.1), transparent 50%), radial-gradient(ellipse 65% 45% at 25% 75%, rgba(139,92,246,0.08), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(59,130,246,0.08), transparent 50%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(139,92,246,0.06), transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Layer 2: Floating blurred cards */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {FLOATING_CARDS.map((card) => (
          <FloatingCard key={card.id} {...card} parallaxY={parallaxY} />
        ))}
      </div>
    </>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[85vh] overflow-hidden px-4 py-24 sm:py-28 md:py-36 flex items-center justify-center"
      aria-labelledby="hero-heading"
    >
      <HeroBackground containerRef={sectionRef} />

      {/* Layer 3: Foreground hero content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          Learn From Industry.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl md:text-2xl leading-relaxed"
        >
          Real conversations with leaders from top tech companies. Structured growth. Serious preparation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            size="lg"
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-6 text-base font-semibold shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-violet-500/30 hover:scale-[1.02]"
            asChild
          >
            <Link href="/register">🚀 Join ABTalks</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl border-slate-600 bg-slate-900/40 backdrop-blur-sm px-8 py-6 text-base font-medium text-slate-200 transition-all duration-300 hover:border-slate-500 hover:bg-slate-800/50 hover:text-white"
            asChild
          >
            <Link href="/events">🎥 Watch Industry Sessions</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

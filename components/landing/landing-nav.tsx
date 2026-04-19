"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface LandingNavProps {
  user?: { name: string | null } | null;
}

export function LandingNav({ user }: LandingNavProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-background/90 shadow-sm backdrop-blur-md dark:bg-background/80"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 transition-opacity duration-200 hover:opacity-90"
          aria-label="ABTalks home"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-sm font-bold text-white shadow-md shadow-orange-500/25">
            AB
          </div>
          <div className="min-w-0 flex flex-col leading-tight">
            <span className="truncate text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100 md:text-xl">
              ABTalks
            </span>
            <span className="mt-1 hidden text-xs text-slate-400 sm:block">
              Community · Challenge · Growth
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden items-center gap-6 sm:flex md:gap-8">
            <Link
              href="/events"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Webinars
            </Link>
            <Link
              href="/podcasts"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Podcasts
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              About
            </Link>
          </div>

          {user ? (
            <>
              <span className="hidden max-w-[8rem] truncate text-sm text-muted-foreground lg:inline">
                Hi, {user.name}
              </span>
              <Button size="sm" variant="outline" className="rounded-lg" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-foreground dark:text-slate-300 dark:hover:text-white"
                asChild
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                size="sm"
                className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600"
                asChild
              >
                <Link href="/signup">Join</Link>
              </Button>
            </>
          )}

          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}

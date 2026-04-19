"use client";

import Link from "next/link";

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@abtalks" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/abtalks" },
  { label: "X (Twitter)", href: "https://twitter.com/abtalks" },
];

export function LandingFooter() {
  return (
    <footer className="bg-card/30 py-16 backdrop-blur-sm md:py-20" role="contentinfo">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-90"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-sm font-bold text-white shadow-sm shadow-orange-500/20">
                AB
              </div>
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-base font-semibold tracking-tight text-transparent md:text-lg">
                ABTalks
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Structured training, live sessions, and a 60-day challenge—built for developers preparing for real roles.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">About</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="transition-colors duration-200 hover:text-foreground">
                  About ABTalks
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors duration-200 hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors duration-200 hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors duration-200 hover:text-foreground">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Contact:{" "}
              <a
                href="mailto:hello@abtalks.com"
                className="font-medium underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                hello@abtalks.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} ABTalks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

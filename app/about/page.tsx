import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { LandingNav, LandingFooter } from "@/components/landing";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About – ABTalks",
  description:
    "ABTalks is a community for structured growth in Software Engineering, Machine Learning, and AI.",
};

export default async function AboutPage() {
  let user = null;
  try {
    user = await getCurrentUser();
  } catch {
    /* ignore */
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav user={user} />

      <main>
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              About us
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-slate-800 dark:text-slate-100 md:text-5xl">
              About ABTalks
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
              A community-led path from consistent practice to industry-ready skills—without the noise of generic
              courses.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
              Mission
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
              We help ambitious developers prepare for real roles through a structured 60-day challenge, live webinars,
              and conversations with people who ship. Progress is measurable, support is peer-led, and the focus stays
              on what hiring teams actually evaluate.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
              What we do
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "60-day challenge",
                  body: "Daily problems across SE, ML, and AI so you build depth and streak-based consistency.",
                },
                {
                  title: "Live learning",
                  body: "Webinars and sessions with engineers and leaders from product teams—not slides-only theory.",
                },
                {
                  title: "Community",
                  body: "Accountability, code discussions, and shared wins with others on the same trajectory.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-card p-6 text-left shadow-md shadow-black/[0.04] dark:shadow-black/25"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
              Why it exists
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
              Many learners stall between tutorials and interviews. ABTalks exists to bridge that gap with structure,
              honest industry context, and a cohort that keeps you moving—so preparation feels grounded, not chaotic.
            </p>
            <p className="mt-8">
              <Link href="/" className="font-medium text-orange-600 hover:underline dark:text-orange-400">
                ← Back to home
              </Link>
            </p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

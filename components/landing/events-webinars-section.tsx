"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface EventPreview {
  id: string;
  title: string;
  description: string;
  /** Pre-formatted date string (e.g. "Mar 22, 2025") to avoid server/client locale mismatch */
  dateFormatted: string;
  time: string;
  location: string;
  guestName: string;
  guestBio: string;
  guestImage: string;
  outcomes: string[];
}

export function EventsWebinarsSection({
  events,
}: {
  events: EventPreview[];
}) {
  return (
    <section
      id="events"
      className="px-4 py-16 md:py-20"
      aria-labelledby="events-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="events-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl"
        >
          Learn from people who&apos;ve walked the path
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400 md:text-base"
        >
          Webinars and live sessions with industry professionals.
        </motion.p>

        <div className="mt-10">
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card/60 px-6 py-12 text-center backdrop-blur-sm"
            >
              <p className="text-sm text-muted-foreground">
                No upcoming events yet. Check back soon for the next live session.
              </p>
              <Button variant="outline" className="mt-4 rounded-xl" asChild>
                <Link href="/events">View events</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-border bg-card/80 backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md">
                    <div className="relative h-40 w-full bg-muted">
                      {event.guestImage ? (
                        <img
                          src={event.guestImage}
                          alt={event.guestName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <span className="text-4xl font-bold opacity-80">
                            {event.guestName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    </div>
                    <CardHeader className="pb-2">
                      <h3 className="line-clamp-2 text-lg font-semibold text-card-foreground">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{event.dateFormatted}</span>
                        <span>·</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.guestBio}
                      </p>
                    </CardHeader>
                    <CardContent className="mt-auto space-y-3 pt-0">
                      {event.outcomes.length > 0 && (
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          {event.outcomes.slice(0, 3).map((outcome) => (
                            <li key={outcome} className="flex items-start gap-2">
                              <span className="text-primary">→</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button size="sm" className="w-full rounded-xl" asChild>
                        <Link href={`/events/${event.id}`}>Register</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {events.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Button variant="outline" className="rounded-xl" asChild>
              <Link href="/events">View all events</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

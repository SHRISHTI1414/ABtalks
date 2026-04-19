"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EventPreview } from "./events-webinars-section";
import type { PodcastPreview } from "./podcast-section";

export function LearningSection({
  events,
  podcasts,
}: {
  events: EventPreview[];
  podcasts: PodcastPreview[];
}) {
  return (
    <section
      id="learning"
      className="py-16 md:py-20"
      aria-labelledby="learning-heading"
    >
      <div className="mx-auto w-full max-w-5xl text-center">
        <motion.h2
          id="learning-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
          className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl"
        >
          Learn with us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mx-auto mt-3 max-w-lg text-sm text-slate-600 dark:text-slate-400 md:text-base"
        >
          Live webinars and on-demand episodes—same community, one place.
        </motion.p>

        <Tabs defaultValue="webinars" className="mt-10 w-full text-left">
          <div className="flex justify-center">
            <TabsList className="inline-flex h-auto flex-wrap items-center justify-center gap-4 rounded-2xl border-0 bg-muted/60 p-1.5 shadow-none">
              <TabsTrigger value="webinars" className="min-w-[7rem]">
                Webinars
              </TabsTrigger>
              <TabsTrigger value="podcasts" className="min-w-[7rem]">
                Podcasts
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="webinars">
            {events.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-2xl border-0 bg-card px-6 py-12 text-center shadow-md shadow-black/[0.04] dark:shadow-black/20"
              >
                <p className="text-sm text-muted-foreground">
                  No upcoming events yet. Check back soon.
                </p>
                <Button variant="outline" className="mt-4 border-[#e8dccb] dark:border-white/10" asChild>
                  <Link href="/events">View events</Link>
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                    >
                      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-0 bg-card shadow-md shadow-black/[0.04] transition-shadow duration-200 hover:shadow-lg dark:shadow-black/25">
                        <div className="relative h-32 w-full bg-muted">
                          {event.guestImage ? (
                            <img
                              src={event.guestImage}
                              alt={event.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                              {event.guestName.charAt(0)}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                        </div>
                        <CardHeader className="pb-2">
                          <h3 className="line-clamp-2 text-base font-semibold text-card-foreground">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 shrink-0" />
                              {event.dateFormatted}
                            </span>
                            <span>·</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-start gap-1 text-xs text-muted-foreground">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="mt-auto space-y-3 pt-0">
                          <Button
                            size="sm"
                            className="w-full rounded-lg bg-orange-500 font-medium text-white shadow-md shadow-orange-500/15 hover:bg-orange-600"
                            asChild
                          >
                            <Link href={`/events/${event.id}`}>Register</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-[#e8dccb] dark:border-white/10" asChild>
                    <Link href="/events">All events</Link>
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="podcasts">
            {podcasts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-2xl border-0 bg-card px-6 py-12 text-center shadow-md shadow-black/[0.04] dark:shadow-black/20"
              >
                <p className="text-sm text-muted-foreground">
                  No episodes yet. New shows will appear here.
                </p>
                <Button variant="outline" className="mt-4 border-[#e8dccb] dark:border-white/10" asChild>
                  <Link href="/podcasts">Browse podcasts</Link>
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {podcasts.map((episode, index) => (
                    <motion.div
                      key={episode.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                    >
                      <Card className="flex h-full flex-col rounded-2xl border-0 bg-card shadow-md shadow-black/[0.04] transition-shadow duration-200 hover:shadow-lg dark:shadow-black/25">
                        <CardHeader className="pb-2">
                          <p className="text-xs font-medium text-primary">Episode {episode.episodeNumber}</p>
                          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-card-foreground">
                            {episode.title}
                          </h3>
                          <p className="line-clamp-1 text-sm text-muted-foreground">{episode.guestName}</p>
                        </CardHeader>
                        <CardContent className="mt-auto space-y-3 pt-0">
                          <p className="line-clamp-2 text-sm text-muted-foreground">{episode.description}</p>
                          <p className="text-xs text-muted-foreground">{episode.publishedAtFormatted}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full rounded-lg border-[#e8dccb] dark:border-white/10"
                            asChild
                          >
                            <Link href={`/podcasts/${episode.id}`}>
                              <Play className="mr-2 h-4 w-4" />
                              Listen
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-[#e8dccb] dark:border-white/10" asChild>
                    <Link href="/podcasts">All episodes</Link>
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

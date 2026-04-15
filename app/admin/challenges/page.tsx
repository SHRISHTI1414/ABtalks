"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";

type Challenge = {
  id: string;
  dayNumber: number;
  domain: string;
  category: string;
  difficulty: string;
  description: string;
  industryNote: string;
};

const DOMAINS = ["SE", "ML", "AI"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export default function AdminChallengesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDomain, setFilterDomain] = useState("SE");
  const [dayNumber, setDayNumber] = useState("");
  const [domain, setDomain] = useState("SE");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [description, setDescription] = useState("");
  const [industryNote, setIndustryNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const edit = searchParams.get("edit");
    const day = searchParams.get("day");
    const dom = searchParams.get("domain");

    if (edit && challenges.length > 0) {
      const c = challenges.find((ch) => ch.id === edit);
      if (c) {
        setEditingId(c.id);
        setDayNumber(String(c.dayNumber));
        setDomain(c.domain);
        setFilterDomain(c.domain);
        setCategory(c.category);
        setDifficulty(c.difficulty);
        setDescription(c.description);
        setIndustryNote(c.industryNote || "");
      }
    } else if (!edit) {
      setEditingId(null);
      if (day) setDayNumber(day);
      else setDayNumber("");
      if (dom && DOMAINS.includes(dom)) {
        setDomain(dom);
        setFilterDomain(dom);
      }
    }
  }, [searchParams, challenges]);

  useEffect(() => {
    fetch("/api/admin/challenges")
      .then(async (res) => {
        const d = await res.json();
        if (!res.ok) throw new Error(d.error || "Failed to load");
        setChallenges(d.challenges || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const challengesByDomain = challenges.filter((c) => c.domain === filterDomain);
  const challengeByDay = new Map(challengesByDomain.map((c) => [c.dayNumber, c]));

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const day = Number(dayNumber);
    if (!Number.isInteger(day) || day < 1 || day > 60) {
      setError("Day must be 1–60");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      if (editingId) {
        const res = await fetch(`/api/admin/challenges/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dayNumber: day,
            domain,
            category,
            difficulty,
            description,
            industryNote,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not update");
        setChallenges((prev) =>
          prev.map((c) => (c.id === editingId ? data.challenge : c))
        );
        router.push("/admin/challenges");
      } else {
        const res = await fetch("/api/admin/challenges", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dayNumber: day,
            domain,
            category,
            difficulty,
            description,
            industryNote,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not create");
        setDayNumber("");
        setDescription("");
        setIndustryNote("");
        setCategory("");
        setDifficulty("Easy");
        setChallenges((prev) => [...prev, data.challenge]);
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save challenge");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this challenge?")) return;
    try {
      const res = await fetch(`/api/admin/challenges/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not delete");
      setChallenges((prev) => prev.filter((c) => c.id !== id));
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Could not delete");
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin – 60-Day Challenges</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            View, add, edit or delete challenges per domain. Each domain has its own Day 1–60.
          </p>
        </div>

        {/* Domain filter */}
        <div className="mb-6">
          <Label className="mb-2 block text-sm text-muted-foreground">Filter by domain</Label>
          <div className="flex gap-2">
            {DOMAINS.map((d) => (
              <Button
                key={d}
                variant={filterDomain === d ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterDomain(d)}
              >
                {d}
              </Button>
            ))}
          </div>
        </div>

        {error && (
          <p className="mb-4 text-sm text-destructive">{error}</p>
        )}

        {/* 60-day grid for selected domain */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Domain: {filterDomain} – Day 1–60</CardTitle>
            <CardDescription>Edit or delete a challenge; add one for empty days.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : (
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {Array.from({ length: 60 }, (_, i) => {
                  const day = i + 1;
                  const c = challengeByDay.get(day);
                  return (
                    <div
                      key={day}
                      className="flex flex-col items-center justify-between rounded border p-2 text-center"
                    >
                      <span className="text-xs font-medium">Day {day}</span>
                      {c ? (
                        <div className="mt-1 flex flex-col gap-1">
                          <span className="truncate text-xs text-muted-foreground" title={c.category}>
                            {c.difficulty}
                          </span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                              <Link href={`/admin/challenges?edit=${c.id}`}>
                                <Pencil className="h-3 w-3" aria-label="Edit" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                              onClick={() => handleDelete(c.id)}
                              aria-label="Delete"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="mt-1 h-7 w-7 p-0" asChild>
                          <Link href={`/admin/challenges?day=${day}&domain=${filterDomain}`}>
                            <Plus className="h-3 w-3" aria-label="Add" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add challenge form */}
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit challenge" : "Add challenge"}</CardTitle>
            <CardDescription>Day 1–60, one challenge per (day, domain).</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dayNumber">Day (1–60)</Label>
                  <Input
                    id="dayNumber"
                    type="number"
                    min={1}
                    max={60}
                    value={dayNumber}
                    onChange={(e) => setDayNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <select
                    id="domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {DIFFICULTIES.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industryNote">Industry note (optional)</Label>
                <Textarea
                  id="industryNote"
                  value={industryNote}
                  onChange={(e) => setIndustryNote(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Saving…" : editingId ? "Update challenge" : "Add challenge"}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/challenges")}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

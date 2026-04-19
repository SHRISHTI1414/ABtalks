"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type User = {
  id: string;
  name: string;
  email: string;
  selectedDomain?: string;
  joinedAt: string;
  currentDay?: number;
  currentStreak?: number;
  longestStreak?: number;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((d: { ok?: boolean; data?: { user?: User }; error?: string }) => {
        if (!d.ok || !d.data?.user) throw new Error(d.error ?? "Failed to load");
        setUser(d.data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Profile</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : user ? (
        <div className="max-w-xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Your ABTalks account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined</span>
                <span className="font-medium">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
              <CardDescription>Your challenge progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary domain</span>
                <span className="font-medium">{user.selectedDomain ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current day ({user.selectedDomain ?? "primary"})</span>
                <span className="font-medium">Day {user.currentDay ?? 1}/60</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current streak</span>
                <span className="font-medium">{user.currentStreak ?? 0} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Longest streak</span>
                <span className="font-medium">{user.longestStreak ?? 0} days</span>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p className="text-destructive">Failed to load profile.</p>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  FileCode,
  User,
  LogOut,
  CalendarDays,
  Mic2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api-client";
import type { LogoutSuccessData } from "@/lib/types/api";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/challenge", label: "60-Day Challenge", icon: Calendar },
  { href: "/problems", label: "Problems", icon: FileCode },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/podcasts", label: "Podcasts", icon: Mic2 },
  { href: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/dashboard" className="font-semibold text-xl text-primary">
            ABTalks
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-primary/10 text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
            onClick={async () => {
              await apiFetch<LogoutSuccessData>("/api/auth/logout", { method: "POST" });
              window.location.href = "/login";
            }}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}

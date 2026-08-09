"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Bookmark } from "lucide-react";
import clsx from "clsx";
import { useWatchlistStore } from "@/store";

const LINKS = [
  { href: "/shows", label: "Shows" },
  { href: "/movies", label: "Movies" },
  { href: "/schedule", label: "Schedule" },
  { href: "/recommend", label: "Recommend" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const count = useWatchlistStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/60 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5">
        <Link href="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-xl tracking-tight text-paper">ScreenScape</span>
          <span className="eyebrow hidden text-paper-dim sm:inline">TV, well guided</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "eyebrow border-b pb-1 transition-colors",
                pathname.startsWith(link.href)
                  ? "border-gold text-paper"
                  : "border-transparent text-paper-dim hover:text-paper"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link href="/search" aria-label="Search shows" className="text-paper-dim transition-colors hover:text-paper">
            <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </Link>
          <Link
            href="/watchlist"
            className="flex items-center gap-2 text-paper-dim transition-colors hover:text-paper"
          >
            <Bookmark className="h-[18px] w-[18px]" strokeWidth={1.6} />
            <span className="eyebrow">
              Watchlist{count > 0 ? ` (${count})` : ""}
            </span>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-paper md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-line/60 px-5 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-4 pt-3">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="eyebrow text-paper">
                {link.label}
              </Link>
            ))}
            <Link href="/search" onClick={() => setOpen(false)} className="eyebrow text-paper">
              Search
            </Link>
            <Link href="/watchlist" onClick={() => setOpen(false)} className="eyebrow text-paper">
              Watchlist{count > 0 ? ` (${count})` : ""}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

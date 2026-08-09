import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink-line/60">
      <div className="mx-auto max-w-content px-5 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="font-display text-lg text-paper">ScreenScape</span>
            <p className="mt-2 max-w-[22ch] text-sm text-paper-dim">
              A quiet guide to what&apos;s worth watching.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3 text-paper-dim">Browse</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shows" className="text-paper-dim hover:text-paper">All shows</Link></li>
              <li><Link href="/movies" className="text-paper-dim hover:text-paper">All films</Link></li>
              <li><Link href="/schedule" className="text-paper-dim hover:text-paper">Tonight&apos;s schedule</Link></li>
              <li><Link href="/recommend" className="text-paper-dim hover:text-paper">Find something to watch</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3 text-paper-dim">You</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/watchlist" className="text-paper-dim hover:text-paper">Watchlist</Link></li>
              <li><Link href="/search" className="text-paper-dim hover:text-paper">Search</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3 text-paper-dim">Source</p>
            <p className="text-sm text-paper-dim">
              TV data and images from{" "}
              <a
                href="https://www.tvmaze.com"
                target="_blank"
                rel="noreferrer"
                className="text-paper underline decoration-ink-line underline-offset-4 hover:decoration-gold"
              >
                TVmaze
              </a>
              , used under CC BY-SA. Film data and posters from{" "}
              <a
                href="https://www.omdbapi.com"
                target="_blank"
                rel="noreferrer"
                className="text-paper underline decoration-ink-line underline-offset-4 hover:decoration-gold"
              >
                OMDb API
              </a>
              .
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-ink-line/60 pt-6 text-xs text-paper-dim sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} ScreenScape. Not affiliated with TVmaze.</span>
          <span className="font-mono">No streaming, no downloads — recommendations only.</span>
        </div>
      </div>
    </footer>
  );
}

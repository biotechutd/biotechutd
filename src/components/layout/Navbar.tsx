"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "/events", label: "Events" },
  { href: "/officers", label: "Officers" },
  { href: "/projects", label: "Projects" },
  { href: "/join", label: "Join Us" },
  { href: "/contact", label: "Contact" }
];

const primaryNavItems = navItems.slice(0, 3);
const secondaryNavItems = navItems.slice(3);

const divisionItems = [
  { href: "/philantropy", label: "Philantropy" },
  { href: "/minimissions", label: "MiniMissions" }
];

type NavbarProps = {
  theme?: "biotech" | "philantropy" | "minimissions";
};

export function Navbar({ theme = "biotech" }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDivisionsOpen, setIsDivisionsOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b-2 border-dashed border-white bg-[image:var(--gradient-navbar)] text-white shadow-[0_3px_0_var(--color-paper-shadow)]"
      data-theme={theme}
    >
      <nav className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-10 px-4 py-3 sm:px-6 lg:gap-20 lg:px-10">
        <Link href="/" className="shrink-0 text-lg font-bold leading-none sm:text-xl" style={{ rotate: "-2deg" }}>
          Biotech UTD
        </Link>

        <button
          type="button"
          aria-expanded={isMobileOpen}
          aria-label="Toggle navigation menu"
          className="grid size-10 place-items-center rounded-md border-2 border-white/80 md:hidden"
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span className={`block h-0.5 w-5 bg-white transition ${isMobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition ${isMobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition ${isMobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>

        <div className="hidden items-center justify-end gap-x-7 md:flex">
          {primaryNavItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative cursor-pointer text-sm font-bold leading-6 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-[width] hover:after:w-full lg:text-base"
              style={{ rotate: `${index % 2 === 0 ? 1 : -1}deg` }}
            >
              {item.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setIsDivisionsOpen(true)}
            onMouseLeave={() => setIsDivisionsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={isDivisionsOpen}
              className="relative text-sm font-bold leading-6 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-[width] hover:after:w-full lg:text-base"
              style={{ cursor: "pointer", rotate: "-1deg" }}
              onClick={() => setIsDivisionsOpen((open) => !open)}
            >
              <span className="inline-flex items-center gap-1">
                Divisions
                <span className={`text-xs transition-transform ${isDivisionsOpen ? "rotate-180" : ""}`} aria-hidden="true">
                  v
                </span>
              </span>
            </button>
            {isDivisionsOpen && (
              <div className="absolute right-0 top-full min-w-44 pt-3">
                <div className="border-2 border-dashed border-ink bg-paper p-2 text-ink shadow-[5px_5px_0_var(--color-paper-shadow)]">
                  {divisionItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm font-bold hover:bg-[image:var(--gradient-accent-bubble)]"
                      style={{ rotate: `${index % 2 === 0 ? 1 : -1}deg` }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {secondaryNavItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-bold leading-6 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-[width] hover:after:w-full lg:text-base"
              style={{ rotate: `${index % 2 === 0 ? 1 : -1}deg` }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {isMobileOpen && (
        <div className="border-t-2 border-dashed border-white/80 px-4 py-4 md:hidden">
          <div className="mx-auto grid w-full max-w-7xl gap-2">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-base font-bold hover:bg-white/15"
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 border-t border-white/30 pt-2">
              <p className="px-3 py-1 text-sm font-bold uppercase text-white/80">Divisions</p>
              {divisionItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-bold hover:bg-white/15"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {secondaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-base font-bold hover:bg-white/15"
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

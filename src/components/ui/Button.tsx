import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
};

export function Button({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center border border-ink bg-club-green px-4 py-2 text-sm font-semibold text-white shadow-[3px_3px_0_rgba(31,41,51,0.22)] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_rgba(31,41,51,0.22)]"
    >
      {children}
    </Link>
  );
}

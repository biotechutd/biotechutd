import type { ReactNode } from "react";

type PaperCardProps = {
  children: ReactNode;
  className?: string;
};

export function PaperCard({ children, className = "" }: PaperCardProps) {
  return (
    <article className={`border border-ink/15 bg-paper-deep p-5 shadow-[4px_4px_0_var(--color-paper-shadow)] ${className}`}>
      {children}
    </article>
  );
}

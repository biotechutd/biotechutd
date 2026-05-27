import type { ReactNode } from "react";

type NotebookCardProps = {
  as?: "article" | "section" | "div" | "li";
  children: ReactNode;
  className?: string;
  variant?: "dashed" | "solid";
  rotate?: number;
};

export function NotebookCard({
  as,
  children,
  className = "",
  variant = "solid",
  rotate = 0
}: NotebookCardProps) {
  const Component = as ?? "article";
  const borderClass = variant === "dashed" ? "border-dashed" : "border-solid";

  return (
    <Component
      className={`relative border-2 border-ink bg-paper p-5 shadow-[6px_6px_0_var(--color-paper-shadow)] transition-transform duration-200 ${borderClass} ${className}`}
      style={{ rotate: `${rotate}deg` }}
    >
      {children}
    </Component>
  );
}

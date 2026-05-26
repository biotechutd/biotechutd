import type { ReactNode } from "react";

type NotebookPageProps = {
  children: ReactNode;
};

export function NotebookPage({ children }: NotebookPageProps) {
  return (
    <div className="min-h-svh bg-paper text-ink">
      <div className="min-h-svh bg-[linear-gradient(var(--color-notebook-rule)_1px,transparent_1px)] bg-[length:100%_2rem]">
        {children}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type NotebookPageProps = {
  children: ReactNode;
  theme?: "biotech" | "philantropy" | "minimissions";
};

export function NotebookPage({ children, theme = "biotech" }: NotebookPageProps) {
  return (
    <div className="min-h-svh bg-paper text-ink" data-theme={theme}>
      <div className="min-h-svh bg-[linear-gradient(var(--color-notebook-rule)_1px,transparent_1px)] bg-[length:100%_2rem]">
        <Navbar theme={theme} />
        <div className="relative min-h-[calc(100svh-4rem)] overflow-hidden lg:before:absolute lg:before:inset-y-0 lg:before:left-10 lg:before:z-0 lg:before:w-0.5 lg:before:bg-margin-red lg:before:opacity-70">
          <div className="relative z-10">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

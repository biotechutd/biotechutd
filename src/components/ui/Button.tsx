import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

export const buttonClassName =
  "inline-flex min-h-11 items-center justify-center rounded-md border-0 bg-accent px-4 py-2 text-sm font-bold !text-white shadow-[4px_4px_0_var(--color-paper-shadow)] transition hover:-translate-y-0.5 hover:rotate-0 hover:bg-accent-deep hover:shadow-[5px_5px_0_var(--color-paper-shadow)]";

export function Button({ href, children, className = "", disabled = false, onClick, type = "button" }: ButtonProps) {
  const classes = `${buttonClassName} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

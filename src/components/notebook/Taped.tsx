import type { ReactNode } from "react";
import { Tape, type TapeSpec } from "./Tape";

type TapedProps = {
  children: ReactNode;
  tapes?: TapeSpec[];
  className?: string;
  rotate?: number;
  transformOrigin?: string;
};

const defaultTapes: TapeSpec[] = [
  { position: "top-left", rotate: -10 },
  { position: "top-right", rotate: 8 }
];

export function Taped({ children, tapes = defaultTapes, className = "", rotate = 0, transformOrigin = "center" }: TapedProps) {
  return (
    <div className={`relative ${className}`} style={{ rotate: `${rotate}deg`, transformOrigin }}>
      {tapes.map((tape, index) => (
        <Tape key={`${tape.position ?? "top-left"}-${index}`} {...tape} />
      ))}
      {children}
    </div>
  );
}

type TapePosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export type TapeSpec = {
  position?: TapePosition;
  rotate?: number;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
};

type TapeProps = TapeSpec & {
  className?: string;
};

const positionClasses: Record<TapePosition, string> = {
  "top-left": "left-5 top-0 -translate-y-1/2",
  "top-center": "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  "top-right": "right-5 top-0 -translate-y-1/2",
  "bottom-left": "bottom-0 left-5 translate-y-1/2",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  "bottom-right": "bottom-0 right-5 translate-y-1/2"
};

export function Tape({
  position = "top-left",
  rotate = -8,
  width = 72,
  height = 20,
  offsetX = 0,
  offsetY = 0,
  className = ""
}: TapeProps) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 border border-tape-border bg-tape opacity-90 shadow-[0_1px_0_var(--color-paper-shadow)] ${positionClasses[position]} ${className}`}
      style={{
        width,
        height,
        marginLeft: offsetX,
        marginTop: offsetY,
        rotate: `${rotate}deg`
      }}
    />
  );
}

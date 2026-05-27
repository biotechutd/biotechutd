import Image from "next/image";
import { Taped } from "./Taped";
import type { TapeSpec } from "./Tape";

export type NotebookImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  aspectRatio?: string;
  border?: boolean;
  rotate?: number;
  withTape?: boolean;
  tapes?: TapeSpec[];
  sizes?: string;
};

export function NotebookImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  aspectRatio = "4 / 3",
  border = true,
  rotate = 0,
  withTape = false,
  tapes,
  sizes = "(min-width: 1024px) 26rem, 92vw"
}: NotebookImageProps) {
  const frameRotate = withTape ? 0 : rotate;
  const frame = (
    <figure
      className={`relative bg-white p-2 shadow-[6px_6px_0_var(--color-paper-shadow)] ${border ? "border-2 border-ink" : ""} ${className}`}
      style={{ rotate: `${frameRotate}deg` }}
    >
      <div className="relative overflow-hidden bg-paper-deep" style={{ aspectRatio }}>
        <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${imageClassName}`} />
      </div>
    </figure>
  );

  if (!withTape) {
    return frame;
  }

  return (
    <Taped tapes={tapes} rotate={rotate}>
      {frame}
    </Taped>
  );
}

import Image from "next/image";

type HeadshotImageProps = {
  src: string;
  alt: string;
  className?: string;
  rotate?: number;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "size-24",
  md: "size-32",
  lg: "size-40"
};

export function HeadshotImage({ src, alt, className = "", rotate = 0, size = "md" }: HeadshotImageProps) {
  return (
    <div
      className={`relative mx-auto rounded-full border-2 border-dashed border-ink bg-paper-deep p-2 shadow-[5px_5px_0_var(--color-paper-shadow)] ${sizeClasses[size]} ${className}`}
      style={{ rotate: `${rotate}deg` }}
    >
      <div className="relative size-full overflow-hidden rounded-full bg-white">
        <Image src={src} alt={alt} fill sizes="10rem" className="object-cover" />
      </div>
    </div>
  );
}

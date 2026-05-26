import Image from "next/image";

type PinnedPhotoProps = {
  src: string;
  alt: string;
  className?: string;
};

export function PinnedPhoto({ src, alt, className = "" }: PinnedPhotoProps) {
  return (
    <div className={`relative bg-white p-2 shadow-[3px_4px_0_var(--color-paper-shadow)] ${className}`}>
      <span className="absolute left-1/2 top-0 h-7 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] bg-club-coral/35" />
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 16rem, 45vw" className="object-cover" />
      </div>
    </div>
  );
}

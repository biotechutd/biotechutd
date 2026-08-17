import { Taped } from "@/components/notebook/Taped";

type NewsletterEmbedProps = {
  src: string;
  title: string;
  className?: string;
};

export function NewsletterEmbed({ src, title, className = "" }: NewsletterEmbedProps) {
  return (
    <Taped
      rotate={3}
      className={className}
      tapes={[{ position: "top-left", rotate: -8, width: 76 }, { position: "top-right", rotate: 9, width: 76 }]}
    >
      <figure className="border-2 border-ink bg-white p-2 shadow-[6px_6px_0_var(--color-paper-shadow)]">
        <div className="relative aspect-[8.5/11] overflow-hidden bg-paper-deep">
          <iframe loading="lazy" src={src} allowFullScreen title={title} className="absolute inset-0 size-full border-0" />
        </div>
      </figure>
    </Taped>
  );
}

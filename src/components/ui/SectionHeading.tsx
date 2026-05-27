type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-normal text-club-green">{eyebrow}</p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">{title}</h1>
    </div>
  );
}

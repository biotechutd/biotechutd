import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { HeadshotImage } from "./HeadshotImage";

type HeadshotLink = {
  href: string;
  label: string;
  icon: "fa-github" | "fa-linkedin" | "fa-envelope";
};

export type HeadshotCardLink = HeadshotLink;

type HeadshotCardProps = {
  name: string;
  role?: string;
  image: string;
  links?: HeadshotLink[];
  rotate?: number;
};

const icons: Record<HeadshotLink["icon"], IconDefinition> = {
  "fa-github": faGithub,
  "fa-linkedin": faLinkedin,
  "fa-envelope": faEnvelope
};

export function HeadshotCard({ name, role, image, links = [], rotate = 0 }: HeadshotCardProps) {
  const visibleLinks = links.slice(0, 3);

  return (
    <article className="text-center" style={{ rotate: `${rotate}deg` }}>
      <HeadshotImage src={image} alt={name} rotate={rotate * -0.5} />
      <div className="mt-4">
        <h3 className="text-xl font-black leading-tight">{name}</h3>
        {role && <p className="mt-1 text-sm font-bold text-accent">{role}</p>}
      </div>
      {visibleLinks.length > 0 && (
        <div className="mx-auto mt-3 grid w-fit grid-flow-col auto-cols-max justify-center gap-2">
          {visibleLinks.map((link) => (
            <Link
              key={`${name}-${link.label}`}
              href={link.href}
              aria-label={`${name} ${link.label}`}
              className="mx-auto grid size-9 place-items-center rounded-full bg-accent text-sm font-black !text-white shadow-[3px_3px_0_var(--color-paper-shadow)] transition hover:-translate-y-0.5 hover:bg-accent-deep"
            >
              <FontAwesomeIcon icon={icons[link.icon]} className="size-4" />
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

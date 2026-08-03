import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { getSiteLinks } from "@/lib/content/getSiteLinks";

const footerLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/join", label: "Join Us" },
  { href: "/events", label: "Events" },
  { href: "/officers", label: "Officers" }
];

export async function Footer() {
  const siteLinks = await getSiteLinks();
  const socialLinks = [
    { href: siteLinks.socials.github, label: "GitHub", icon: faGithub },
    { href: siteLinks.socials.linkedin, label: "LinkedIn", icon: faLinkedin },
    { href: `mailto:${siteLinks.socials.email}`, label: "Email", icon: faEnvelope }
  ];

  return (
    <footer className="bg-ink px-4 py-10 text-paper sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-5 text-center">
        <Link href="/" className="text-2xl font-black leading-none" style={{ rotate: "-2deg" }}>
          Biotech UTD
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-bold text-paper/85">
          {footerLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
              style={{ rotate: `${index % 2 === 0 ? 1 : -1}deg` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="grid size-10 place-items-center rounded-full bg-paper/10 text-paper transition hover:-translate-y-0.5 hover:bg-paper/20"
            >
              <FontAwesomeIcon icon={link.icon} className="size-4" />
            </Link>
          ))}
        </div>
        <p className="max-w-xl text-sm leading-6 text-paper/70">
          Biotech Club at The University of Texas at Dallas.
        </p>
      </div>
    </footer>
  );
}

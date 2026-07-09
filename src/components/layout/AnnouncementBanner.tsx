import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import type { Banner } from "@/lib/content/schemas";

type AnnouncementBannerProps = {
  banner: Banner;
};

export function AnnouncementBanner({ banner }: AnnouncementBannerProps) {
  if (!banner.enabled) {
    return null;
  }

  const content = (
    <span className="flex items-center justify-center gap-2">
      <FontAwesomeIcon icon={faBolt} className="size-3.5 text-orange-500" aria-hidden="true" />
      <span>{banner.text}</span>
    </span>
  );

  const className =
    "mx-4 mt-4 block rounded-xl border-2 border-ink bg-[#fff3bf] px-4 py-2.5 text-center text-sm font-bold leading-tight text-[#8a3b0f] shadow-[4px_4px_0_var(--color-paper-shadow)] transition-transform duration-200 hover:scale-[1.01] sm:fixed sm:left-auto sm:right-6 sm:top-20 sm:z-40 sm:mx-0 sm:mt-0 sm:max-w-xs sm:px-5 sm:text-base lg:right-8";

  if (!banner.href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={banner.href} className={`${className} hover:brightness-105`}>
      {content}
    </Link>
  );
}

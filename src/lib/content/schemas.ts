import { z } from "zod";

export const officerCategorySchema = z.enum(["executive", "cs-engr", "industry", "philantropy", "marketing", "founders"]);
export type OfficerCategory = z.infer<typeof officerCategorySchema>;

export const officerFileSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  role: z.string().default(""),
  order: z.number().int().nonnegative().default(999),
  featured: z.boolean().default(false),
  major: z.string().optional(),
  year: z.string().optional(),
  image: z.string().min(1),
  github: z.string().url().optional(),
  email: z.string().email().optional(),
  linkedin: z.string().url().optional()
});

export const officerSchema = officerFileSchema.extend({
  category: officerCategorySchema
});

export type Officer = z.infer<typeof officerSchema>;

export const gallerySchema = z.object({
  images: z
    .array(
      z.object({
        name: z.string().min(1),
        alt: z.string().min(1),
        title: z.string().min(1).optional()
      })
    )
    .default([])
});

export type Gallery = z.infer<typeof gallerySchema>;

export const bannerSchema = z.object({
  enabled: z.boolean().default(false),
  text: z.string().min(1),
  href: z.string().min(1).optional()
});

export type Banner = z.infer<typeof bannerSchema>;

const editableLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1)
});

export const homePageContentSchema = z.object({
  hero: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    links: z.array(editableLinkSchema).default([])
  }),
  newsletter: z.object({
    title: z.string().min(1),
    src: z.string().min(1)
  }),
  programCards: z
    .array(
      z.object({
        title: z.string().min(1),
        body: z.string().default(""),
        cta: editableLinkSchema.optional()
      })
    )
    .default([]),
  join: z.object({
    title: z.string().min(1),
    body: z.string().min(1)
  })
});

export const committeeContentSchema = z.object({
  name: z.string().min(1),
  enabled: z.boolean(),
  hero: z.object({
    eyebrow: z.string().min(1).default("Division"),
    title: z.string().min(1),
    summary: z.string().min(1),
    cta: editableLinkSchema.optional(),
    projectDescription: editableLinkSchema.optional(),
    links: z.array(editableLinkSchema).default([])
  }),
  projects: z
    .array(
      z.object({
        companyName: z.string().optional(),
        projectName: z.string().optional(),
        description: z.string().optional()
      })
    )
    .default([])
});

export const siteLinksSchema = z.object({
  socials: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    email: z.string().email(),
    instagram: z.string().url().optional(),
    discord: z.string().url().optional(),
    linktree: z.string().url().optional()
  })
});

const applicationLinkSchema = z.object({
  enabled: z.boolean().default(false),
  label: z.string().min(1).default(""),
  url: z.string().default("")
});
const disabledApplicationLink = { enabled: false, label: "", url: "" };

export const applicationsSchema = z.object({
  officer: applicationLinkSchema.default(disabledApplicationLink),
  project: applicationLinkSchema.default(disabledApplicationLink),
  member: applicationLinkSchema.default(disabledApplicationLink),
  cards: z
    .array(
      z.object({
        enabled: z.boolean().default(true),
        title: z.string().min(1),
        description: z.string().min(1),
        rotate: z.number().optional(),
        actions: z
          .array(
            z.object({
              visible: z.boolean().default(true),
              label: z.string().min(1),
              href: z.string().min(1)
            })
          )
          .default([])
      })
    )
    .default([])
});

export const eventsContentSchema = z.object({
  upcoming: z.array(
    z.object({
      title: z.string().min(1),
      date: z.string().min(1),
      description: z.string().min(1)
    })
  )
});

export type CommitteeContent = z.infer<typeof committeeContentSchema>;
export type HomePageContent = z.infer<typeof homePageContentSchema>;
export type SiteLinks = z.infer<typeof siteLinksSchema>;
export type Applications = z.infer<typeof applicationsSchema>;
export type EventsContent = z.infer<typeof eventsContentSchema>;

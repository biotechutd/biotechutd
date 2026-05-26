import { z } from "zod";

export const officerSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  order: z.number().int().nonnegative(),
  major: z.string().optional(),
  year: z.string().optional(),
  image: z.string().url(),
  email: z.string().email().optional(),
  linkedin: z.string().url().optional(),
  bio: z.string().min(1)
});

export type Officer = z.infer<typeof officerSchema>;

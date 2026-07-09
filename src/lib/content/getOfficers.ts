import { promises as fs } from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { officerCategorySchema, officerFileSchema, officerSchema, type Officer } from "./schemas";

const officersDirectory = path.join(process.cwd(), "src", "content", "officers");
const publicDirectory = path.join(process.cwd(), "public");
const fallbackHeadshots = [
  "/images/headshots/headshot-1.svg",
  "/images/headshots/headshot-2.svg",
  "/images/headshots/headshot-3.svg",
  "/images/headshots/headshot-4.svg",
  "/images/headshots/headshot-5.svg",
  "/images/headshots/headshot-6.svg"
];

async function publicFileExists(src: string) {
  if (!src.startsWith("/")) {
    return true;
  }

  const publicPath = path.normalize(path.join(publicDirectory, src));

  if (!publicPath.startsWith(publicDirectory)) {
    return false;
  }

  try {
    const stat = await fs.stat(publicPath);
    return stat.isFile();
  } catch {
    return false;
  }
}

function getFallbackHeadshot(slug: string) {
  const index = [...slug].reduce((total, character) => total + character.charCodeAt(0), 0) % fallbackHeadshots.length;
  return fallbackHeadshots[index];
}

async function resolveOfficerImage(src: string, slug: string) {
  if (await publicFileExists(src)) {
    return src;
  }

  const fallback = getFallbackHeadshot(slug);
  return (await publicFileExists(fallback)) ? fallback : fallbackHeadshots[0];
}

export async function getOfficers(): Promise<Officer[]> {
  const categories = await fs.readdir(officersDirectory, { withFileTypes: true });
  const officersByCategory = await Promise.all(
    categories
      .filter((entry) => entry.isDirectory())
      .map(async (categoryDirectory) => {
        const category = officerCategorySchema.parse(categoryDirectory.name);
        const categoryPath = path.join(officersDirectory, category);
        const files = await fs.readdir(categoryPath);

        return Promise.all(
          files
            .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
            .map(async (file) => {
              const raw = await fs.readFile(path.join(categoryPath, file), "utf8");
              const parsed = YAML.parse(raw);
              const slug = file.replace(/\.ya?ml$/, "");

              const officerFile = officerFileSchema.parse({ slug, ...parsed });
              const image = await resolveOfficerImage(officerFile.image, slug);
              return officerSchema.parse({ ...officerFile, image, category });
            })
        );
      })
  );
  const officers = officersByCategory.flat();

  return officers.sort((a, b) => a.category.localeCompare(b.category) || a.order - b.order);
}

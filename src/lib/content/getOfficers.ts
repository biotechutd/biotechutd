import { promises as fs } from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { officerCategorySchema, officerFileSchema, officerSchema, type Officer } from "./schemas";

const officersDirectory = path.join(process.cwd(), "src", "content", "officers");

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
              return officerSchema.parse({ ...officerFile, category });
            })
        );
      })
  );
  const officers = officersByCategory.flat();

  return officers.sort((a, b) => a.category.localeCompare(b.category) || a.order - b.order);
}

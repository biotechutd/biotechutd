import { promises as fs } from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { officerSchema, type Officer } from "./schemas";

const officersDirectory = path.join(process.cwd(), "src", "content", "officers");

export async function getOfficers(): Promise<Officer[]> {
  const files = await fs.readdir(officersDirectory);
  const officers = await Promise.all(
    files
      .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(officersDirectory, file), "utf8");
        const parsed = YAML.parse(raw);
        const slug = file.replace(/\.ya?ml$/, "");

        return officerSchema.parse({ slug, ...parsed });
      })
  );

  return officers.sort((a, b) => a.order - b.order);
}

import { promises as fs } from "node:fs";
import path from "node:path";
import YAML from "yaml";
import type { z } from "zod";

export async function readYamlFile<TSchema extends z.ZodType>(contentPath: string, schema: TSchema): Promise<z.infer<TSchema>> {
  const raw = await fs.readFile(path.join(process.cwd(), "src", "content", contentPath), "utf8");
  return schema.parse(YAML.parse(raw));
}

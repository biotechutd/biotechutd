import { siteLinksSchema } from "./schemas";
import { readYamlFile } from "./readYamlFile";

export function getSiteLinks() {
  return readYamlFile("links.yaml", siteLinksSchema);
}

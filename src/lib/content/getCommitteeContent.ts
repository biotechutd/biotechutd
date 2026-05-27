import { committeeContentSchema } from "./schemas";
import { readYamlFile } from "./readYamlFile";

type CommitteeSlug = "philantropy" | "minimissions" | "projects";

export function getCommitteeContent(slug: CommitteeSlug) {
  return readYamlFile(`committees/${slug}/content.yaml`, committeeContentSchema);
}

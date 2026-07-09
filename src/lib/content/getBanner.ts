import { bannerSchema } from "./schemas";
import { readYamlFile } from "./readYamlFile";

export function getBanner() {
  return readYamlFile("banner.yaml", bannerSchema);
}

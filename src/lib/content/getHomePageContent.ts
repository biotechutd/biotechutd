import { homePageContentSchema } from "./schemas";
import { readYamlFile } from "./readYamlFile";

export function getHomePageContent() {
  return readYamlFile("home.yaml", homePageContentSchema);
}

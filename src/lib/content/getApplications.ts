import { applicationsSchema } from "./schemas";
import { readYamlFile } from "./readYamlFile";

export function getApplications() {
  return readYamlFile("applications.yaml", applicationsSchema);
}

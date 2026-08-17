import { contactContentSchema } from "./schemas";
import { readYamlFile } from "./readYamlFile";

export function getContactContent() {
  return readYamlFile("contact.yaml", contactContentSchema);
}

import { eventsContentSchema } from "./schemas";
import { readYamlFile } from "./readYamlFile";

export function getEventsContent() {
  return readYamlFile("events.yaml", eventsContentSchema);
}

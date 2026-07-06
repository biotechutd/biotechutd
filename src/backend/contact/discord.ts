import type { ContactRequest } from "@/backend/types";

export async function sendDiscordMessage(data: ContactRequest, webhookUrl: string) {
  const payload = {
    username: "Biotech UTD - Contact",
    content: [
      "+++++++++++++++++++++++++++++++++",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      "Message:",
      "```",
      data.message,
      "```",
      "+++++++++++++++++++++++++++++++++"
    ].join("\n")
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to send message to Discord.");
  }
}

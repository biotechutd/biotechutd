import type { ContactRequest } from "@/backend/types";

export async function sendDiscordMessage(data: ContactRequest, webhookUrl: string, roleId?: string) {
  const roleMention = roleId ? `<@&${roleId}>` : "";
  const payload = {
    username: "Biotech UTD - Contact",
    content: [
      roleMention,
      "+++++++++++++++++++++++++++++++++",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      "Message:",
      "```",
      data.message,
      "```",
      "+++++++++++++++++++++++++++++++++"
    ].filter(Boolean).join("\n"),
    allowed_mentions: roleId
      ? {
          roles: [roleId]
        }
      : undefined
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

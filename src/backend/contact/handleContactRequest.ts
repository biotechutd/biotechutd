import { corsHeaders, jsonResponse } from "@/backend/http";
import type { ContactRequest, Env } from "@/backend/types";
import { sendDiscordMessage } from "@/backend/contact/discord";

export async function handleContactRequest(request: Request, env: Env) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const body = await request.json().catch(() => null);
  const validation = validateContactRequest(body);

  if (!validation.ok) {
    return jsonResponse({ error: validation.error }, 400);
  }

  const missingSecrets = getMissingSecrets(env);
  if (missingSecrets.length > 0) {
    return jsonResponse({ error: `Contact form is missing configuration: ${missingSecrets.join(", ")}` }, 500);
  }

  try {
    await sendDiscordMessage(validation.data, env.DISCORD_WEBHOOK_URL!);
    // Disabled because we need to setup 2factor auth.
    // await appendContactToSheet(validation.data, env);

    return jsonResponse({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send contact message.";
    return jsonResponse({ error: message }, 500);
  }
}

function validateContactRequest(body: unknown): { ok: true; data: ContactRequest } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and message are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  if (name.length > 120 || email.length > 160 || message.length > 4000) {
    return { ok: false, error: "One or more fields is too long." };
  }

  return { ok: true, data: { name, email, message } };
}

function getMissingSecrets(env: Env) {
  return [
    ["DISCORD_WEBHOOK_URL", env.DISCORD_WEBHOOK_URL]
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  /*
  ["GOOGLE_SERVICE_ACCOUNT_EMAIL", env.GOOGLE_SERVICE_ACCOUNT_EMAIL],
  ["GOOGLE_PRIVATE_KEY", env.GOOGLE_PRIVATE_KEY],
  ["GOOGLE_SHEET_ID", env.GOOGLE_SHEET_ID]
  */
}

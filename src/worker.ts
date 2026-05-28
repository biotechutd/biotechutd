type Env = {
  ASSETS: Fetcher;
  DISCORD_WEBHOOK_URL?: string;
  GOOGLE_SERVICE_ACCOUNT_EMAIL?: string;
  GOOGLE_PRIVATE_KEY?: string;
  GOOGLE_SHEET_ID?: string;
};

type ContactRequest = {
  name: string;
  email: string;
  message: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContactRequest(request, env);
    }

    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;

async function handleContactRequest(request: Request, env: Env) {
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
    await appendContactToSheet(validation.data, env);

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
    ["DISCORD_WEBHOOK_URL", env.DISCORD_WEBHOOK_URL],
    ["GOOGLE_SERVICE_ACCOUNT_EMAIL", env.GOOGLE_SERVICE_ACCOUNT_EMAIL],
    ["GOOGLE_PRIVATE_KEY", env.GOOGLE_PRIVATE_KEY],
    ["GOOGLE_SHEET_ID", env.GOOGLE_SHEET_ID]
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);
}

async function sendDiscordMessage(data: ContactRequest, webhookUrl: string) {
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

async function appendContactToSheet(data: ContactRequest, env: Env) {
  const accessToken = await getGoogleAccessToken({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    privateKey: env.GOOGLE_PRIVATE_KEY!
  });
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    hour12: false
  });
  const values = [[timestamp, data.name, data.email, data.message]];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SHEET_ID}/values/Sheet1!A1:D1:append?valueInputOption=RAW`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ values })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to append message to Google Sheets.");
  }
}

async function getGoogleAccessToken({ email, privateKey }: { email: string; privateKey: string }) {
  const jwt = await generateGoogleJwt({ email, privateKey });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    })
  });

  if (!response.ok) {
    throw new Error("Failed to authenticate with Google.");
  }

  const token = (await response.json()) as { access_token?: string };
  if (!token.access_token) {
    throw new Error("Google did not return an access token.");
  }

  return token.access_token;
}

async function generateGoogleJwt({ email, privateKey }: { email: string; privateKey: string }) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };
  const toSign = `${base64UrlJson(header)}.${base64UrlJson(payload)}`;
  const key = await crypto.subtle.importKey("pkcs8", parsePrivateKey(privateKey), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(toSign));

  return `${toSign}.${base64UrlBytes(new Uint8Array(signature))}`;
}

function base64UrlJson(value: unknown) {
  return base64UrlBytes(new TextEncoder().encode(JSON.stringify(value)));
}

function base64UrlBytes(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function parsePrivateKey(privateKey: string) {
  const normalized = privateKey.replace(/\\n/g, "\n");
  const base64 = normalized
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: corsHeaders
  });
}

type Env = {
  DISCORD_WEBHOOK_URL?: string;
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  return Response.json({
    ok: true,
    message: "Contact endpoint scaffolded.",
    discordConfigured: Boolean(env.DISCORD_WEBHOOK_URL),
    sheetsConfigured: Boolean(env.GOOGLE_SHEETS_WEBHOOK_URL)
  });
};

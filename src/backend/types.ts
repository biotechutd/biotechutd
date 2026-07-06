export type Env = {
  ASSETS: Fetcher;
  DISCORD_WEBHOOK_URL?: string;
  GOOGLE_SERVICE_ACCOUNT_EMAIL?: string;
  GOOGLE_PRIVATE_KEY?: string;
  GOOGLE_SHEET_ID?: string;
};

export type ContactRequest = {
  name: string;
  email: string;
  message: string;
};

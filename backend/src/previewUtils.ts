const CRAWLER_PATTERN =
  /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Slackbot|Discordbot|Pinterest|Embedly|Quora|redditbot|Google-Structured-Data/i;

export function isSocialCrawler(userAgent: string): boolean {
  return CRAWLER_PATTERN.test(userAgent);
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const SITE_URL = "https://bytewrite.yashguptaiiit.in";

/** Static image on your domain — LinkedIn rejects workers.dev and flaky dynamic image URLs. */
export function generateOGImageUrl(): string {
  return `${SITE_URL}/image.png`;
}

import { google } from 'googleapis';

/**
 * OAuth2 client for Google Calendar (user’s primary calendar).
 * After visiting /api/google/oauth/start once, add GOOGLE_REFRESH_TOKEN to the server env.
 */
export function createOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')}/api/google/oauth/callback`;

  if (!clientId || !clientSecret) {
    return null;
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

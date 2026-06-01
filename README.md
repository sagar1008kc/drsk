## Dr. SK / SK Creation

Production Next.js 14 App Router site for SK Creation: marketing pages, Supabase auth, a member dashboard, Stripe checkout, protected PDF downloads, booking fulfillment, Google Calendar Meet creation, and email via Zoho SMTP or Resend.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Required Services

- Supabase Auth, Postgres, and Storage.
- Stripe Checkout and webhook delivery.
- Zoho SMTP or Resend for transactional email.
- Optional Google Calendar API for automatic Meet links.
- Optional hosted handbook URL through `HANDBOOK_PUBLIC_URL`.

## Environment Variables

Create `.env.local` locally. Do not commit env files.

Core:

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BOOKING_ACTION_TOKEN_SECRET=
```

Payments:

```bash
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Email:

```bash
NOTIFICATION_TO_EMAIL=
ZOHO_MAIL_USER=
ZOHO_MAIL_PASS=
ZOHO_MAIL_HOST=smtppro.zoho.com
ZOHO_MAIL_PORT=465
ZOHO_MAIL_SECURE=true
# or
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

Google Calendar / Meet:

```bash
ENABLE_GOOGLE_MEET_AUTOCREATE=false
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_CALENDAR_ID=primary
GOOGLE_OAUTH_SETUP_SECRET=
```

Downloads:

```bash
SUPABASE_PREMIUM_DOWNLOADS_BUCKET=premium-downloads
HANDBOOK_PUBLIC_URL=
PREMIUM_PDF_PRICE_CENTS=599
PREMIUM_PDF_CURRENCY=usd
```

## Supabase Setup

Apply migrations in order from `supabase/migrations`.

Important migrations:

- `004_customer_resources.sql` creates resources, access grants, and download logs.
- `005_profiles_auth_trigger.sql` creates profiles and the auth trigger.
- `007_lock_profile_roles.sql` prevents users from changing their own role.
- `008_seed_default_resources.sql` seeds the default dashboard PDF catalog.

Storage bucket `premium-downloads` should remain private. Downloads are served through authenticated API routes that create short-lived signed URLs.

## Stripe Webhook

Configure Stripe to send `checkout.session.completed` to:

```text
/api/stripe/webhook
```

Set `STRIPE_WEBHOOK_SECRET` in every deployed environment. The webhook grants premium PDF access and fulfills paid booking emails/Meet links.

## Google Calendar Setup

See `docs/GOOGLE_MEET_SETUP.md`. In production, `/api/google/oauth/start` is protected by `GOOGLE_OAUTH_SETUP_SECRET`; pass it as `?setup_secret=...` only during one-time setup.

## Security Notes

- Authenticated dashboard routes are protected by middleware and server-side Supabase checks.
- Service-role Supabase access is server-only; keep API route validation strict.
- Public write routes have lightweight in-process rate limits. For high traffic, replace with a durable store such as Redis or a managed edge rate limiter.
- Do not place member-only PDFs under `public/`.

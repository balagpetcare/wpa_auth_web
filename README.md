# wpa_auth_web — WPA Account

Public authentication web application for **WPA Central Auth** (organization:
World Pet Association) — sign in, register, email verification, password
reset, OAuth/OIDC authorize + consent, and a basic account/security area.
This is **not** an admin panel; it is the user-facing identity surface that
other WPA client apps redirect users into.

> One account for all WPA pet platforms.

In production this app is deployed at `auth.worldpetassociation.com`.

## Architecture

```
src/
  app/              Next.js App Router routes (thin — render feature components)
  components/       Presentational, stateless UI shared across features
    auth/           Auth page chrome (AuthShell, AuthCard, RedirectNotice)
    layout/         Account-area layout shells (AccountShell, SectionCard, ComingSoonNote)
    ui/             Design-system primitives (Button, PrimaryButton, AlertMessage)
    forms/          Accessible form building blocks (FormInput, PasswordInput, FieldError)
    branding/       Brand mark/name/tagline/support footer
    oauth/          Consent screen presentational pieces (ConsentAppCard)
  config/           Typed env + app-level config (routes, urls)
  features/         Feature-owned logic: API calls + stateful components
    auth/           login/register/verify-otp/forgot/reset/logout
    oauth/          authorize/consent/callback
    account/        account overview + security
  lib/              Cross-cutting utilities (API client, token storage, validation, errors, redirects)
  types/            Shared TypeScript contracts (api/auth/oauth)
```

Routes under `app/` stay thin: each `page.tsx` just wires up metadata and
renders the corresponding component from `features/`. All business logic
(API calls, auth state, redirects) lives in `features/` and `lib/`.

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and adjust values for your local API:

   ```bash
   cp .env.example .env.local
   ```

3. Start the WPA Auth API (see `wpa_auth_api`) so `NEXT_PUBLIC_API_BASE_URL`
   has something to talk to. Its default local port is **5010** (see
   `wpa_auth_api/.env`'s `PORT`), i.e. `http://localhost:5010/api/v1` — make
   sure `NEXT_PUBLIC_API_BASE_URL` in `.env.local` matches whatever port it's
   actually running on, and add this app's origin
   (`http://localhost:3002`) to the API's `ALLOWED_PUBLIC_ORIGINS` or its
   requests will be rejected by CORS.

4. Run the dev server. It's pinned to port **3002** by default:

   ```bash
   npm run dev
   ```

   You can also be explicit / override the port the same way:

   ```bash
   npm run dev -- -p 3002
   ```

   The app will be available at http://localhost:3002.

## Environment variables

All variables are `NEXT_PUBLIC_*` because this is a fully client-rendered
auth surface (no server-side secrets are held here — token exchange happens
directly between the browser and the API). All env access goes through
`src/config/env.ts`, which also exposes safe accessor helpers:

- `getAuthWebUrl()` — this app's own origin, trailing slash stripped
- `getApiBaseUrl()` — the WPA Auth API base URL, trailing slash stripped
- `getDefaultRedirectUrl()` — fallback post-login destination, trailing slash stripped

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_ENV` | `local` \| `staging` \| `production` — selects the default URL set below when a specific URL var isn't set |
| `NEXT_PUBLIC_APP_NAME` | Short product name shown in page titles and branding ("WPA Account") |
| `NEXT_PUBLIC_AUTH_WEB_URL` | This app's own public origin (used to build absolute callback/redirect URLs) |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the WPA Auth API, including its version prefix — **never** `worldpetassociation.com` itself |
| `NEXT_PUBLIC_DEFAULT_REDIRECT_URL` | Where to send an already-authenticated user with no explicit `next`/redirect target |
| `NEXT_PUBLIC_BRAND_NAME` | Organization name used in copy ("World Pet Association") |
| `NEXT_PUBLIC_APP_TAGLINE` | Shown under the brand mark on auth pages ("One account for all WPA pet platforms.") |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Support contact surfaced in the UI |

### Per-environment URL defaults

If you only set `NEXT_PUBLIC_APP_ENV` and skip the individual URL variables,
`src/config/env.ts` falls back to these defaults:

| `NEXT_PUBLIC_APP_ENV` | Auth web URL | API base URL |
| --- | --- | --- |
| `local` (default) | `http://localhost:3002` | `http://localhost:5010/api/v1` |
| `staging` | `https://auth.staging.worldpetassociation.com` | `https://api.staging.worldpetassociation.com/api/v1` |
| `production` | `https://auth.worldpetassociation.com` | `https://api.worldpetassociation.com/api/v1` |

Explicit `NEXT_PUBLIC_*_URL` values always take precedence over these
defaults — set them explicitly in each deployment target rather than relying
on the fallback in production.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3002 |
| `npm run build` | Production build (type-checked) |
| `npm run start` | Serve the production build on port 3002 |
| `npm run lint` | Run ESLint |

## Production deployment mapping

- `worldpetassociation.com` — the public WPA brand/landing website. Separate
  project, not this repo, and **never** the API URL.
- `auth.worldpetassociation.com` — **this app** (`wpa_auth_web`). The
  public-facing identity/login surface.
- `api.worldpetassociation.com` — the WPA Auth API (`wpa_auth_api`). This is
  what `NEXT_PUBLIC_API_BASE_URL` must point to in production, never the
  brand site.
- `admin.worldpetassociation.com` — the admin dashboard (`wpa_auth_admin`).
  Separate project, not this repo.

| Environment | Domain | Notes |
| --- | --- | --- |
| Public brand site | `worldpetassociation.com` | Separate project, not this repo |
| **This app** | `auth.worldpetassociation.com` | Deploy this repo here; set `NEXT_PUBLIC_AUTH_WEB_URL` and `NEXT_PUBLIC_DEFAULT_REDIRECT_URL` to this origin |
| API | `api.worldpetassociation.com` | Set `NEXT_PUBLIC_API_BASE_URL=https://api.worldpetassociation.com/api/v1`; add `https://auth.worldpetassociation.com` to the API's `ALLOWED_PUBLIC_ORIGINS` |
| Admin dashboard | `admin.worldpetassociation.com` | Separate project (`wpa_auth_admin`), not this repo |

Deployment checklist:

1. Set `NEXT_PUBLIC_APP_ENV=production` plus the `NEXT_PUBLIC_*` variables
   above explicitly (don't rely on the built-in environment defaults) in the
   hosting platform's environment configuration for the
   `auth.worldpetassociation.com` target.
2. Double-check `NEXT_PUBLIC_API_BASE_URL` resolves to
   `https://api.worldpetassociation.com/api/v1` — **not**
   `worldpetassociation.com` itself.
3. Confirm the API's CORS allowlist (`ALLOWED_PUBLIC_ORIGINS`) includes the
   production auth origin.
4. Run `npm run build` as the build command and `npm run start` (or your
   platform's Next.js runtime) to serve it.
5. Verify the OAuth `redirect_uri` values registered for each client
   application point at this app's `/oauth/authorize` and, if used,
   `/oauth/callback` paths.

## Connecting a new client app

This app never hardcodes which client apps exist — every consumer (current
or future: `furtail.world`, `bangladeshpetassociation.com`, campaign portals,
donation portals, membership portals, etc.) is just an OAuth/OIDC client
registered on the **API side**. No changes to this repo are needed to add
one. To connect a new client:

1. Register the client on the API (`wpa_auth_api`) with its `client_id`,
   type (`FIRST_PARTY_APP` for auto-approved, `THIRD_PARTY_APP` to require
   the `/oauth/consent` screen), and its registered `redirect_uri`(s). Public
   web/mobile clients should be registered without a `client_secret` and use
   PKCE (`code_challenge`/`code_challenge_method=S256`); this frontend never
   holds a client secret.
2. Add the new client's origin to the API's `ALLOWED_PUBLIC_ORIGINS` if it
   calls the API directly (e.g. for its own token exchange).
3. Point the client app at:
   `https://auth.worldpetassociation.com/oauth/authorize?client_id=...&redirect_uri=...&response_type=code&scope=openid%20profile%20email&state=...&code_challenge=...&code_challenge_method=S256`
4. That's it — this app handles login-if-needed, consent (if required), and
   redirecting back to the client's `redirect_uri` with `code`/`state`, all
   driven by what the API returns for that `client_id`.

## Security notes

- **No secrets in this app.** Every env var is `NEXT_PUBLIC_*` by design —
  there is nothing here that isn't already visible in the shipped bundle.
  OAuth client secrets are never read, stored, or referenced with a real
  value anywhere in this codebase (see `TokenExchangePayload.client_secret`
  in `src/types/oauth.ts` — an optional type field for documentation only,
  never populated).
- **No sensitive logging.** Nothing in this app calls `console.log`/`error`/
  `warn` with tokens, passwords, OTPs, or raw API response bodies. Errors
  are always narrowed through `parseApiError`/`getErrorMessage` first.
- **Redirect safety.** `src/lib/redirect.ts` centralizes every redirect
  decision:
  - `isSafeInternalPath` / `normalizeRedirectTo` — only same-origin relative
    paths are ever used for internal `next` navigation; anything else falls
    back to `/account`.
  - `isValidHttpUrl` — sanity-checks external redirect targets (OAuth
    `redirect_uri`, post-logout `redirect_uri`) before ever navigating to
    them. This app never decides on its own that an external redirect is
    *safe*, only that it's *well-formed* — the API is the actual trust
    boundary, since it only issues an authorization code after validating
    `redirect_uri` against the client's registered values.
  - `preserveOAuthParams` — forwards only the known OAuth/OIDC authorize
    params through the login flow, rather than passing arbitrary query
    strings through unchecked.
  - `buildLoginRedirect` — the one place that constructs a `/auth/login?next=`
    URL, so every caller encodes it consistently.
- **Token handling.** `src/lib/authTokens.ts` is the only place tokens are
  read from/written to storage; `src/lib/apiClient.ts` is the only place
  that attaches the `Authorization` header and performs the refresh-and-
  retry-once dance on a 401. Neither module ever logs a token value.
- **Strict TypeScript.** `tsconfig.json` has `strict`, plus
  `noUncheckedIndexedAccess`, `noImplicitReturns`, and
  `noFallthroughCasesInSwitch` enabled.

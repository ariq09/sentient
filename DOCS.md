# Sentient — Developer Documentation

> **"Log out of yourself. Log into Sentient."**
>
> A social platform where users step into the perspective of everyday inanimate objects and share life from their side of the shelf.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started](#4-getting-started)
5. [Environment Variables](#5-environment-variables)
6. [Authentication](#6-authentication)
7. [Database Schema](#7-database-schema)
8. [API Reference](#8-api-reference)
9. [Pages & Routes](#9-pages--routes)
10. [Components](#10-components)
11. [Theme System](#11-theme-system)
12. [Server Actions](#12-server-actions)
13. [Fonts & Typography](#13-fonts--typography)
14. [Color Palette](#14-color-palette)
15. [Known Gaps & Future Work](#15-known-gaps--future-work)

---

## 1. Project Overview

Sentient is a Next.js 16 social media application built around an unusual premise: users don't represent themselves — they pick an inanimate object (lamp, plant, book, camera, etc.) and post "sentient thoughts" from that object's perspective.

### Core Features

| Feature | Status |
|---------|--------|
| Email/password authentication via Supabase | ✅ Live |
| Profile creation with photo upload and object selection | ✅ Live |
| Global post feed with status broadcasting | ✅ Live |
| Comments on posts (from feed and profile pages) | ✅ Live |
| Individual user profile pages | ✅ Live |
| Dark / light mode toggle | ✅ Live |
| Email verification flow | ✅ Live |
| Profile editing | ❌ Not yet built |
| Search / filter | ❌ Not yet built |
| Likes / reactions | ❌ Not yet built |

### User Flow

```
Landing (/) → Sign Up (/signup) → Email Verify (/verify-email)
                                        ↓
                               Pick Profile (/pickyourprofile)
                                        ↓
                                  Feed (/feed)
                                        ↓
                            Profile (/myprofile/[id])
```

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.0.10 |
| UI Library | React | 19.2.1 |
| Styling | Tailwind CSS | 4.x |
| Database & Auth | Supabase | JS SDK 2.96.0 |
| Supabase SSR | @supabase/ssr | 0.8.0 |
| Theming | next-themes | 0.4.6 |
| Fonts | Google Fonts via next/font | — |
| Language | TypeScript | 5.x |
| Linting | ESLint | — |

---

## 3. Project Structure

```
sentient/
├── app/
│   ├── api/
│   │   └── profile/
│   │       └── route.ts          # POST — create profile
│   ├── auth/
│   │   ├── callback/
│   │   │   └── route.ts          # OAuth / email verification callback
│   │   └── auth-code-error/
│   │       └── page.tsx          # Auth error page
│   ├── components/
│   │   ├── AuthLayout.tsx        # Shared wrapper for login + signup
│   │   ├── ThemeProvider.tsx     # next-themes provider (client)
│   │   └── ThemeToggle.tsx       # Sun/moon toggle button (client)
│   ├── error/
│   │   └── page.tsx              # Generic error page
│   ├── feed/
│   │   └── page.tsx              # Main feed (server component)
│   ├── login/
│   │   ├── actions.ts            # login() and signup() server actions
│   │   └── page.tsx              # Login page
│   ├── myprofile/
│   │   └── [id]/
│   │       └── page.tsx          # Dynamic profile page (server component)
│   ├── pickyourprofile/
│   │   └── page.tsx              # Profile creation form (client component)
│   ├── signup/
│   │   └── page.tsx              # Signup page
│   ├── verify-email/
│   │   └── page.tsx              # Post-signup verification notice
│   ├── globals.css               # Global styles + CSS theme variables
│   ├── layout.tsx                # Root layout — fonts, ThemeProvider
│   └── page.tsx                  # Landing page (always light)
├── lib/
│   └── utils.ts                  # cn() utility (clsx + tailwind-merge)
├── middleware.ts                 # Supabase session refresh on every request
├── utils/
│   └── supabase/
│       ├── client.ts             # Browser Supabase client
│       ├── middleware.ts         # Session management helper
│       └── server.ts             # Server-side Supabase client
├── supabase/
│   └── migrations/
│       ├── 001_create_profiles_table.sql
│       ├── 002_create_statuses_table.sql
│       ├── 003_create_comments_table.sql
│       └── 004_add_auth_id_to_profiles.sql
├── public/
│   ├── sentient-logo.png
│   ├── bulb.svg
│   ├── plant.svg
│   ├── book.svg
│   ├── camera.svg
│   ├── window.svg
│   ├── globe.svg
│   └── file.svg
├── .env.local                    # Local environment variables (not committed)
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 4. Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier is fine)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd sentient

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Running Migrations

The SQL migrations in `supabase/migrations/` need to be applied to your Supabase project. You can do this via the Supabase dashboard SQL editor, or using the Supabase CLI:

```bash
supabase db push
```

Run them in order:

```
001_create_profiles_table.sql
002_create_statuses_table.sql
003_create_comments_table.sql
004_add_auth_id_to_profiles.sql
```

### Build for Production

```bash
npm run build
npm run start
```

---

## 5. Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Both values are available in your Supabase project under **Settings → API**.

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | The base URL of your Supabase project | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key for client-side queries | Yes |

> **Security note:** These are `NEXT_PUBLIC_` variables, meaning they are exposed to the browser. Never put your Supabase service role key in `.env.local`. The anon key is safe because Supabase Row Level Security (RLS) controls what anonymous clients can access.

---

## 6. Authentication

Authentication is handled entirely by Supabase Auth using email and password.

### Flow

```
1. User submits email + password on /signup
2. signup() server action calls supabase.auth.signUp()
3. If email verification is required → redirect to /verify-email
4. If no verification required → redirect to /pickyourprofile
5. User clicks verification email link → /auth/callback processes the code
6. User completes profile at /pickyourprofile
7. Subsequent logins: /login → login() → redirect to /feed
```

### Session Management

Sessions are persisted via cookies and refreshed on every request by `middleware.ts`. This file calls `updateSession()` from `utils/supabase/middleware.ts` which reads the current session and writes fresh tokens to the response cookies.

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
```

The middleware runs on all routes matching the configured matcher. This ensures that server components always have access to a fresh, valid session via `createClient()`.

### Supabase Clients

There are two Supabase client factories:

**Server-side** (`utils/supabase/server.ts`)

Used in server components, server actions, and API routes. Reads/writes cookies directly.

```typescript
import { createClient } from '@/utils/supabase/server'

const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

**Client-side** (`utils/supabase/client.ts`)

Used in client components when direct browser-side queries are needed.

```typescript
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()
```

### Auth Callback (`/auth/callback`)

Handles the redirect after a user clicks their verification email. The handler:

1. Receives a `code` query parameter from Supabase
2. Exchanges it for a session via `supabase.auth.exchangeCodeForSession(code)`
3. Redirects new users to `/pickyourprofile`, returning users to `/feed`

---

## 7. Database Schema

The database has three tables. Row Level Security (RLS) is currently disabled on all tables — this is a known gap described in [Section 15](#15-known-gaps--future-work).

### `profiles`

Stores user profile information. One row per user.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `bigint` | Primary key, auto-generated |
| `name` | `text` | Username (display name) |
| `photo_url` | `text` | Profile photo stored as base64 data URL |
| `icon` | `text` | Path to selected object SVG (e.g. `/bulb.svg`) |
| `auth_id` | `uuid` | Foreign key to `auth.users.id` (Supabase auth) |
| `created_at` | `timestamptz` | Auto-set on insert |

### `statuses`

Stores posts/broadcasts made by users.

| Column | Type | Notes |
|--------|------|-------|
| `status_id` | `bigint` | Primary key, set to `Date.now()` on insert |
| `status` | `text` | Post content |
| `user_id` | `bigint` | Foreign key → `profiles.id` |
| `created_at` | `timestamptz` | Auto-set on insert |

### `comments`

Stores comments on individual statuses.

| Column | Type | Notes |
|--------|------|-------|
| `comment_id` | `bigint` | Primary key, auto-generated |
| `status_id` | `bigint` | Foreign key → `statuses.status_id` |
| `user_id` | `bigint` | Foreign key → `profiles.id` |
| `comment` | `text` | Comment text content |
| `created_at` | `timestamptz` | Auto-set on insert |

### Entity Relationship Diagram

```
auth.users (Supabase managed)
    │
    │ auth_id
    ▼
profiles ──────────────────┐
    │                      │
    │ user_id              │ user_id
    ▼                      ▼
statuses ◄──── status_id ──── comments
```

---

## 8. API Reference

### `POST /api/profile`

Creates a new user profile. Called from the `/pickyourprofile` client component on form submission.

**Request body (JSON)**

```json
{
  "username": "chairlin",
  "image": "data:image/jpeg;base64,...",
  "icon": "/bulb.svg"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | Yes | Display name for the profile |
| `image` | string | Yes | Profile photo as a base64 data URL |
| `icon` | string | No | Path to the selected object SVG |

**Success response — `200 OK`**

```json
{
  "profileId": 1234567890
}
```

**Error responses**

| Status | Body | Cause |
|--------|------|-------|
| `400` | `{ "error": "Username and image are required" }` | Missing required fields |
| `401` | `{ "error": "Unauthorized" }` | No active Supabase session |
| `500` | `{ "error": "..." }` | Database insert failure |

**Example usage**

```typescript
const response = await fetch('/api/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'chairlin',
    image: photoPreview,   // base64 data URL from FileReader
    icon: '/bulb.svg',
  }),
})

const { profileId } = await response.json()
window.location.href = `/myprofile/${profileId}`
```

---

## 9. Pages & Routes

### `GET /`

**Landing page.** Always rendered in the light theme regardless of user preference.

- If the user is authenticated: shows "Go to Feed" and "Sign Out" CTAs.
- If unauthenticated: shows "Become an Object" (→ `/signup`) and "Log In" (→ `/login`) CTAs.
- Contains: navbar, hero section, brand tagline banner, three example object post cards, final CTA section, footer.

---

### `GET /login`

Login form. Renders via `AuthLayout`. Accepts email and password. On success, redirects to `/feed`.

---

### `GET /signup`

Signup form. Renders via `AuthLayout`. Accepts email and password. On success, redirects to either `/pickyourprofile` (if no email verification required) or `/verify-email`.

Accepts an optional `?error=` query parameter to display inline error messages (e.g. duplicate email).

---

### `GET /verify-email`

Static page shown after signup when email verification is required. Instructs the user to check their inbox.

---

### `GET /pickyourprofile`

**Client component.** Profile creation wizard. Requires an active auth session. Contains:

- Profile photo upload (converted to base64 via `FileReader`)
- Username input field
- Object selection grid (7 options: Lamp, Plant, Book, Camera, Window, Globe, File)

On submit, calls `POST /api/profile` and redirects to the new profile page.

---

### `GET /feed`

**Server component.** Main application feed. Requires an active auth session.

Data fetched on the server:
- All profiles (to identify current user and build network sidebar)
- All statuses with nested profile and comment data (Supabase join query)

Three-column layout:
- **Left (hidden below lg):** Current user profile card with navigation links
- **Center:** Post composer + scrolling status cards with comment threads
- **Right (hidden below xl):** Network sidebar listing other users

---

### `GET /myprofile/[id]`

**Server component.** Dynamic profile page for any user. The `id` param corresponds to `profiles.id`.

Fetches:
- The profile matching `id`
- The authenticated user's profile (to enable commenting)
- All statuses by that user with nested comments

If the profile is not found, redirects to `/pickyourprofile`.

---

### `GET /error`

Generic error fallback page. Shown when an unhandled error occurs.

---

### `GET /auth/auth-code-error`

Shown when the auth callback code exchange fails (e.g. expired or invalid link).

---

## 10. Components

### `AuthLayout`

**Path:** `app/components/AuthLayout.tsx`
**Type:** Client component

Shared layout wrapper for the login and signup pages. Provides:
- Dark/light themed background with subtle indigo glow
- Centered card container
- Logo linking back to `/`
- Title and subtitle slot
- `ThemeToggle` fixed in the top-right corner

**Props**

```typescript
interface AuthLayoutProps {
  children: React.ReactNode  // The form content
  title: string              // Heading text
  subtitle: React.ReactNode  // Subtext (can contain JSX links)
}
```

**Usage**

```tsx
<AuthLayout
  title="Welcome back"
  subtitle={<>No account? <Link href="/signup">Create one</Link></>}
>
  <form>...</form>
</AuthLayout>
```

---

### `ThemeProvider`

**Path:** `app/components/ThemeProvider.tsx`
**Type:** Client component

Wraps `ThemeProvider` from `next-themes`. Mounted in the root layout so all pages share a single theme context.

- `attribute="class"` — applies `dark` or `light` class to `<html>`
- `defaultTheme="dark"` — dark mode is the default for all app pages
- `enableSystem={false}` — ignores OS-level preference

---

### `ThemeToggle`

**Path:** `app/components/ThemeToggle.tsx`
**Type:** Client component

A small square button that toggles between dark and light themes. Renders a sun icon in dark mode and a moon icon in light mode.

Uses a `mounted` guard to avoid hydration mismatches — renders an invisible placeholder until the component is hydrated on the client.

**Props**

```typescript
interface ThemeToggleProps {
  className?: string  // Optional additional Tailwind classes
}
```

**Usage**

```tsx
import { ThemeToggle } from '@/app/components/ThemeToggle'

// In a navbar:
<div className="flex items-center gap-2">
  <ThemeToggle />
  <button>Log out</button>
</div>

// Fixed position:
<div className="fixed top-4 right-4 z-50">
  <ThemeToggle />
</div>
```

---

## 11. Theme System

The theme system uses CSS custom properties (variables) combined with `next-themes` class toggling.

### CSS Variables

Defined in `app/globals.css`. Two sets of values — light (`:root`) and dark (`.dark`):

```css
:root {
  --app-bg:       #F5F6FF;   /* Page background */
  --app-surface:  #FFFFFF;   /* Card background */
  --app-elevated: #EDEEFF;   /* Inputs, nested cards */
  --app-text:     #1F2937;   /* Primary text */
  --app-text-2:   #4B5563;   /* Secondary text, labels */
  --app-text-3:   #9CA3AF;   /* Tertiary text, timestamps, placeholders */
  --app-border:   #E5E7EB;   /* Borders and dividers */
}

.dark {
  --app-bg:       #0A0B14;
  --app-surface:  #13141F;
  --app-elevated: #1C1D2E;
  --app-text:     #F9FAFB;
  --app-text-2:   #9CA3AF;
  --app-text-3:   #6B7280;
  --app-border:   #2D2F45;
}
```

The `dark` class is toggled on `<html>` by `next-themes`. All app pages consume these variables via Tailwind arbitrary value syntax:

```tsx
// Card background
<div className="bg-[var(--app-surface)] border border-[var(--app-border)]">

// Primary text
<p className="text-[var(--app-text)]">

// Input field
<input className="bg-[var(--app-elevated)] text-[var(--app-text)] placeholder:text-[var(--app-text-3)]" />
```

### Theme Scope

| Page | Theme |
|------|-------|
| `/` (landing) | Always light — uses hardcoded `#F5F6FF`, `#1F2937` etc. |
| All other pages | Controlled by user toggle, default dark |

The landing page is intentionally excluded from the theme system. Its hardcoded light values are unaffected by the `dark` class on `<html>`.

### Persistent Preference

`next-themes` stores the user's preference in `localStorage` under the key `theme`. On subsequent visits, the stored preference is applied before the first paint, eliminating flash of unstyled content on the client.

---

## 12. Server Actions

Server actions are defined directly inside server components using the `'use server'` directive.

### `postStatus` — `/feed`

Posts a new status to the feed.

```typescript
const postStatus = async (formData: FormData) => {
  'use server'
  const statusText = formData.get('status')
  const userId = formData.get('user_id')
  // Inserts into `statuses` table, then revalidates /feed
}
```

Called via a `<form action={postStatus}>` in the feed composer.

---

### `postComment` — `/feed`

Posts a comment on a status in the main feed.

```typescript
const postComment = async (formData: FormData) => {
  'use server'
  const commentText = formData.get('comment')
  const statusId = formData.get('status_id')
  const userId = formData.get('user_id')
  // Inserts into `comments` table, then revalidates /feed
}
```

---

### `postProfileComment` — `/myprofile/[id]`

Posts a comment on a status from a profile page. Also receives `profile_id` to revalidate the correct profile route.

```typescript
const postProfileComment = async (formData: FormData) => {
  'use server'
  // Inserts into `comments` table
  // Revalidates /myprofile/[profileId]
}
```

---

### `logoutUser` — `/feed`

Signs the user out and redirects to the landing page.

```typescript
const logoutUser = async () => {
  'use server'
  await supabaseClient.auth.signOut()
  redirect('/')
}
```

---

### `login` / `signup` — `/login/actions.ts`

Named server actions for the auth forms. These live in a separate `actions.ts` file rather than inline in the page, since the login and signup pages are server components.

```typescript
export const login = async (formData: FormData) => {
  // Calls supabase.auth.signInWithPassword()
  // On success: redirect('/feed')
  // On error: redirect('/login?error=...')
}

export const signup = async (formData: FormData) => {
  // Calls supabase.auth.signUp()
  // If session exists immediately: redirect('/pickyourprofile')
  // Else: redirect('/verify-email')
}
```

---

## 13. Fonts & Typography

Fonts are loaded using `next/font/google` in `app/layout.tsx` and injected as CSS custom properties.

| Font | Variable | Use |
|------|----------|-----|
| **Sora** | `--font-sora` | Headings, brand wordmark, display text |
| **Inter** | `--font-inter` | Body text, UI labels, inputs |

Both are configured with `display: 'swap'` to prevent invisible text during loading.

### Applying Fonts in CSS/Tailwind

The `@theme` block in `globals.css` maps the font variables to Tailwind utilities:

```css
@theme inline {
  --font-sans:    var(--font-inter);    /* font-sans → Inter */
  --font-display: var(--font-sora);     /* font-display → Sora */
}
```

Usage in JSX:

```tsx
<h1 className="font-display">Log out of yourself.</h1>
<p className="font-sans">Body text here.</p>
```

---

## 14. Color Palette

### Brand Colors (theme-invariant)

These are consistent across both light and dark modes.

| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#6366F1` | Buttons, active states, links, logo |
| Secondary | `#818CF8` | Hover states, secondary actions |
| Accent | `#A5B4FC` | Highlights, tags, badges |

### Light Theme

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| Background | `#F5F6FF` | `--app-bg` |
| Surface | `#FFFFFF` | `--app-surface` |
| Elevated | `#EDEEFF` | `--app-elevated` |
| Text | `#1F2937` | `--app-text` |
| Text secondary | `#4B5563` | `--app-text-2` |
| Text tertiary | `#9CA3AF` | `--app-text-3` |
| Border | `#E5E7EB` | `--app-border` |

### Dark Theme

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| Background | `#0A0B14` | `--app-bg` |
| Surface | `#13141F` | `--app-surface` |
| Elevated | `#1C1D2E` | `--app-elevated` |
| Text | `#F9FAFB` | `--app-text` |
| Text secondary | `#9CA3AF` | `--app-text-2` |
| Text tertiary | `#6B7280` | `--app-text-3` |
| Border | `#2D2F45` | `--app-border` |

---

## 15. Known Gaps & Future Work

This section documents technical debt, incomplete features, and security considerations that should be addressed before a production launch.

### Security

#### Row Level Security (RLS) is disabled

All three database tables (`profiles`, `statuses`, `comments`) have RLS disabled. This means any authenticated user — or even unauthenticated clients with the anon key — can read and write all data.

**Fix:** Enable RLS on each table and write policies scoped to `auth.uid()`. Example for statuses:

```sql
-- Allow anyone to read
CREATE POLICY "Public read" ON statuses FOR SELECT USING (true);

-- Only allow insert if user_id matches the caller's profile
CREATE POLICY "Own insert" ON statuses FOR INSERT
  WITH CHECK (
    user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid())
  );
```

#### Profile photos stored as base64

Photos are stored directly in the `profiles.photo_url` column as base64-encoded strings. This is highly inefficient — base64 inflates file size by ~33% and bloats every database query that selects profiles.

**Fix:** Use Supabase Storage. Upload the file to a bucket, store only the public URL in `photo_url`.

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.jpg`, file)

const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(data.path)
```

### Data Model Gaps

#### Missing `bio` column in `profiles`

The profile creation form previously included a bio field, but there is no `bio` column in the database. Any bio text submitted is silently dropped.

**Fix:**
```sql
ALTER TABLE profiles ADD COLUMN bio text;
```

#### Missing `interests` column in `profiles`

Similar to bio — the interests feature was partially scaffolded but never completed.

**Fix:**
```sql
ALTER TABLE profiles ADD COLUMN interests text[];
```

#### `status_id` set to `Date.now()`

New statuses use `Date.now()` as their primary key. Under concurrent writes, this could produce collisions.

**Fix:** Remove the manual `status_id` from the insert and let the database auto-generate it (change `status_id` to a `bigserial`).

### Missing Features

| Feature | Notes |
|---------|-------|
| **Profile editing** | No edit page or update API endpoint. Users cannot change their username, photo, or chosen object after creation. |
| **Profile deletion** | No delete functionality and no cascade rules to clean up statuses/comments. |
| **Search** | No search or filter for profiles or posts. |
| **Loading states** | Server actions (post status, post comment) provide no optimistic UI or pending feedback. |
| **Error handling in feed** | If a status or comment insert fails silently, the user sees nothing. |
| **Likes / reactions** | No engagement metric beyond comments. |
| **Pagination** | The feed loads all statuses at once. With enough posts this will be slow. |
| **Username uniqueness** | The frontend does not check for duplicate usernames before submitting. The database also has no unique constraint on `profiles.name`. |

### Code Quality

| Issue | Location |
|-------|----------|
| `any` typing on fetched data | `app/feed/page.tsx`, `app/myprofile/[id]/page.tsx` |
| Unused `ProfileSetupModal` component | `app/components/ProfileSetupModal.tsx` |
| Unused `three` dependency | `package.json` |
| No image size / file type validation | `app/pickyourprofile/page.tsx` |

---

*Last updated: April 2026*

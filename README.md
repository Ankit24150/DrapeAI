# DrapeAI

> See the drape before the delivery.

DrapeAI is a polished virtual try-on experience for exploring garments on your own image before you buy. The project combines an editorial fashion landing page, a privacy-minded Supabase authentication flow, and a personalized fitting-room hero experience.

## What is inside

- Premium fashion landing page with scroll reveals and product storytelling
- Responsive login and signup experience
- Email/password authentication with Supabase
- Google OAuth sign in and sign up
- Live email validation and password-strength guidance
- Protected personalized hero page after authentication
- Account-aware welcome screen with fitting-room stats
- One-time DrapeAI welcome email through a Supabase Edge Function and Resend
- Responsive layouts for desktop and mobile
- Reduced-motion support for accessibility

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 18, TypeScript |
| Build | Vite |
| Styling | Tailwind CSS, custom CSS animations |
| Routing | React Router |
| Icons | Lucide React |
| Authentication | Supabase Auth |
| Email | Supabase Edge Functions + Resend |

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment variables

Create a `.env` file in the project root, next to `package.json`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-or-publishable-key
```

Never add `.env` to Git. It is already ignored by this repository. Never expose a `service_role` or `sb_secret` key in frontend code.

### 3. Start the app

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## Available commands

```bash
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run preview   # Preview the production build locally
```

## Routes

| Route | Description |
| --- | --- |
| `/` | DrapeAI landing page |
| `/login` | Supabase email/password and Google login |
| `/signup` | Account creation with validation |
| `/hero` | Protected personalized fitting-room page |

## Supabase authentication

The client is initialized in `src/lib/supabase.ts`. Before testing auth:

1. Create a Supabase project.
2. Copy the Project URL and public anon/publishable key into `.env`.
3. Enable Email in **Authentication → Providers**.
4. Enable Google in **Authentication → Providers → Google**.
5. Add the Supabase callback URL to Google Cloud OAuth credentials:

```text
https://your-project-id.supabase.co/auth/v1/callback
```

6. Add your local app URL in Supabase **Authentication → URL Configuration**:

```text
http://localhost:5173/hero
```

After authentication, `/hero` checks the real Supabase session. Users without a session are redirected to `/login`.

## Welcome email

The optional welcome email function lives at:

```text
supabase/functions/send-welcome-email/index.ts
```

It sends a one-time greeting after an authenticated user reaches the hero page. To deploy it, install and authenticate the Supabase CLI, then run:

```bash
supabase login
supabase link --project-ref your-project-ref
supabase secrets set RESEND_API_KEY=re_your_key
supabase secrets set WELCOME_FROM_EMAIL="DrapeAI <onboarding@resend.dev>"
supabase secrets set APP_URL=http://localhost:5173
supabase functions deploy send-welcome-email
```

For production delivery to arbitrary recipients, use a verified sending domain in Resend and replace `WELCOME_FROM_EMAIL` with that sender address.

## Project structure

```text
src/
  components/
    AuthLayout.tsx        # Shared auth shell and visual fitting-room panel
    GoogleButton.tsx      # Google auth action
    ...                   # Landing page sections
  lib/
    supabase.ts           # Supabase browser client
  pages/
    Landing.tsx           # Public landing page
    Login.tsx             # Login flow
    Signuppage.tsx        # Signup flow and password guidance
    HeroPage.tsx          # Protected member experience
  hooks/
    useReveal.ts          # Scroll-triggered reveal behavior
  index.css               # Design tokens, responsive rules, and animations
supabase/
  functions/
    send-welcome-email/   # Resend-backed welcome email function
```

## Design direction

DrapeAI uses a warm editorial palette inspired by a fitting studio:

- Canvas: `#F6F3EE`
- Ink: `#17140F`
- Charcoal: `#524A3E`
- Brass: `#8A6A3B`
- Studio green: `#26352F`

The interface uses restrained motion, tactile hover states, and clear form feedback without hiding important actions behind decorative effects.

## Security notes

- Keep `.env` local and out of version control.
- Use only the public Supabase key in the browser.
- Store `service_role`, `sb_secret`, and Resend API keys only in server-side secrets.
- Enable Row Level Security for any Supabase tables added later.
- Use a verified Resend domain before sending production email.

## Status

This is an active Vite + React prototype with the core landing, authentication, and personalized post-login experience in place.

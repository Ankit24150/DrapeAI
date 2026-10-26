<div align="center">

<img
  src="https://capsule-render.vercel.app/api?type=waving&height=230&color=0:171717,45:34332e,100:8A6A3B&text=DRAPE%20AI&fontColor=F8F7F4&fontSize=58&fontAlignY=40&desc=FASHION,%20SEEN%20DIFFERENTLY&descSize=14&descAlignY=62&animation=fadeIn"
  alt="DrapeAI — Fashion, seen differently"
  width="100%"
/>

<br />

<img
  src="https://readme-typing-svg.demolab.com?font=DM+Serif+Display&size=25&pause=1200&color=8A6A3B&center=true&vCenter=true&width=680&height=45&lines=Find+your+next+look.;Imagine+the+fit+before+you+buy.;A+more+personal+way+to+shop."
  alt="Find your next look. Imagine the fit before you buy. A more personal way to shop."
/>

<br />

<p>
  <img src="https://img.shields.io/badge/React-18-171717?style=for-the-badge&logo=react&logoColor=9ADCF5" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5-171717?style=for-the-badge&logo=typescript&logoColor=7CB7FF" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-171717?style=for-the-badge&logo=vite&logoColor=C7A9FF" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-171717?style=for-the-badge&logo=tailwindcss&logoColor=75D9E8" alt="Tailwind CSS" />
</p>

<p>
  <b>An editorial fashion-shopping experience with virtual try-on at its heart.</b>
  <br />
  <sub>Explore the concept · preview the experience · imagine what comes next</sub>
</p>

<br />

<a href="#the-idea">THE IDEA</a>
&nbsp;&nbsp;·&nbsp;&nbsp;
<a href="#experience">EXPERIENCE</a>
&nbsp;&nbsp;·&nbsp;&nbsp;
<a href="#get-started">GET STARTED</a>
&nbsp;&nbsp;·&nbsp;&nbsp;
<a href="#road-ahead">ROAD AHEAD</a>

</div>

<br />

## The idea

Online, a great outfit can still feel like a question mark.

**Will it fit? Will it drape the way I imagined? Will it feel like me?**

DrapeAI explores a more confident way to shop: bring fashion and personal style together through an elegant digital fitting-room experience, with AI-powered virtual try-on as the vision.

<div align="center">

> **Your style. Your perspective. A whole new way to see it.**

</div>

## The experience

<table>
  <tr>
    <td width="50%">
      <h3>01 &nbsp; A considered first impression</h3>
      <p>A fashion-led landing page introduces the DrapeAI world with editorial imagery, product storytelling, and a refined visual system.</p>
    </td>
    <td width="50%">
      <h3>02 &nbsp; Your fitting-room concept</h3>
      <p>A dedicated logged-in experience sets the stage for a more personal, photo-aware way to discover a look.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>03 &nbsp; A responsive wardrobe</h3>
      <p>Layouts adapt across screen sizes, with tactile controls, warm neutral surfaces, and subtle transitions.</p>
    </td>
    <td width="50%">
      <h3>04 &nbsp; Built to evolve</h3>
      <p>The existing React app provides a foundation for future garment previews, personalized discovery, and commerce integrations.</p>
    </td>
  </tr>
</table>

<br />

<div align="center">

| **DISCOVER** | **IMAGINE** | **MAKE IT YOURS** |
|:---:|:---:|:---:|
| Browse a fashion-first experience | Explore the virtual fitting-room idea | Bring your own style point of view |

</div>

## The vision

The longer-term idea is simple: choose a garment, add a photo of yourself, and see a more personal preview before deciding what to buy.

```text
YOUR PHOTO  +  A CLOTHING PIECE  →  A PERSONAL TRY-ON PREVIEW
```

More confident choices can mean fewer surprises, fewer avoidable returns, and a more thoughtful relationship with what we wear.

## Get started

### You’ll need

- Node.js 18+
- npm

### Run locally

```bash
git clone https://github.com/Ankit24150/DrapeAI.git
cd DrapeAI
npm install
cp .env.example .env.local
npm run dev
```

Before starting Vite, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local` using the project URL and anon/public key from your Supabase project settings. Never put a Supabase `service_role` key in frontend environment variables or commit credentials.

### Build for production

```bash
npm run build
npm run preview
```

## Deploy to Vercel

This project is a Vite single-page app. The included [`vercel.json`](./vercel.json) sends app routes such as `/login`, `/signup`, and `/hero` back to the React entry point, so direct links and page refreshes work after deployment.

1. Push this repository to GitHub.
2. Sign in at [vercel.com](https://vercel.com) and choose **Add New → Project**.
3. Import the DrapeAI GitHub repository.
4. Keep the detected Vite settings, or set:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. Add these under **Environment Variables** before deploying:
   - `VITE_SUPABASE_URL` — your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — your Supabase anon/public key
6. Select **Deploy**. Vercel will build the project and provide a live URL.

In the Supabase dashboard, enable **Authentication → Providers → Email**, then set **Authentication → URL Configuration → Site URL** to your Vercel production URL. Add both `http://localhost:5173/hero` and your production URL ending in `/hero` to the allowed **Redirect URLs**. If you want Google sign-in, enable the Google provider and configure its OAuth credentials in Supabase too. After changing Vercel environment variables, redeploy so the build uses them.

The app uses Supabase email/password authentication and protects `/hero` behind an active session. Never put a Supabase `service_role` key in Vercel frontend environment variables; only use the anon/public key with appropriate Supabase policies.

## Under the hood

<div align="center">

| **UI** | **Styling** | **Auth & navigation** | **Tooling** |
|:---:|:---:|:---:|:---:|
| React · TypeScript | Tailwind CSS · CSS | Supabase · React Router | Vite · Lucide |

</div>

### App routes

| Route | Experience |
|:---|:---|
| `/` | Public landing page |
| `/login` | Login screen |
| `/signup` | Sign-up screen |
| `/hero` | Logged-in home / fitting-room concept |

## Road ahead

> **Current state:** email/password authentication is connected to Supabase and `/hero` requires a valid session. Google sign-in requires enabling and configuring the Google provider in Supabase. The virtual try-on model/service, generated person-and-garment result, and live product catalog are not connected yet; the fitting-room concept does not claim to generate AI results.

The project is designed to grow toward:

- Uploading a person photo and a clothing photo
- Connecting a real virtual try-on service
- Showing a generated preview with clear privacy controls
- Integrating product discovery and commerce data

<br />

<div align="center">

### Fashion should feel personal—even before it arrives.

<sub>Made with care for a more considered way to discover what you wear.</sub>

<br /><br />

<img
  src="https://capsule-render.vercel.app/api?type=waving&color=0:8A6A3B,55:34332e,100:171717&height=110&section=footer"
  alt=""
  width="100%"
/>

</div>

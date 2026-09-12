# DrapeAI — Landing Page

A premium landing page for DrapeAI, an AI-powered virtual try-on platform.
Built with React, TypeScript, Vite, Tailwind CSS, React Router, and Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/     Navbar, Hero, HowItWorks, Features, ProductShowcase,
                   TechPipeline, CTASection, Footer
  pages/          Landing (/), Login (/login), Signup (/signup)
  hooks/          useReveal — scroll-triggered fade/rise-in for sections
  index.css       Tailwind layers + custom keyframes (drape-line, float-slow)
tailwind.config.js  Design tokens: canvas / ink / charcoal / stone / brass
```

## Notes

- Imagery is pulled from Unsplash by URL for this draft — swap in DrapeAI's
  own photography before shipping.
- Login and Signup are static forms wired for routing only; connect them to
  your auth backend when ready.
- Respects `prefers-reduced-motion` throughout.

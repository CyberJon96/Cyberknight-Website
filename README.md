# Knightwatch Cybersecurity — Website

A polished single-page marketing site for Knightwatch Cybersecurity, a placeholder name
for a solo cybersecurity/GRC advisory practice. Plain HTML/CSS/JS — no build step, no
framework, no external paid assets or fonts.

## File structure

```
knightwatch-cybersecurity/
├── index.html        # All page content/sections (single-page site with anchor nav)
├── css/
│   └── styles.css    # All styling (navy→black gradient theme, animations, responsive)
├── js/
│   └── main.js       # Nav toggle, scroll progress, reveal animations, card spotlight,
│                     # founder-photo fallback, contact form handling
├── assets/
│   ├── founder.jpg   # founder headshot (optimized for web)
│   ├── logo.png      # Knightwatch logo, transparent background (hero emblem)
│   └── originals/    # original full-size PNGs (not referenced by the site)
└── README.md
```

## Running locally

No build tools are required. Pick any one of these:

**Option A — just open the file**
Double-click `index.html`, or open it directly in a browser:
```
open index.html
```

**Option B — simple local server (recommended, avoids some browser file:// quirks)**
```bash
# Python 3 (usually preinstalled on macOS)
python3 -m http.server 8000
# then visit http://localhost:8000

# or, if you have Node installed
npx serve .
```

## Deploying

### 1. GitHub Pages (starting point — free static hosting)

The repo is Pages-ready (a `.nojekyll` file is included so GitHub serves files as-is).

1. Create a **public** repo on GitHub (Pages on the free plan requires public repos),
   then push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/knightwatch-cybersecurity.git
   git push -u origin main
   ```
   (Or with the GitHub CLI: `gh repo create knightwatch-cybersecurity --public --source . --push`)
2. On GitHub: **Settings → Pages → Build and deployment** → Source: *Deploy from a
   branch* → Branch: `main`, folder `/ (root)` → Save.
3. The site goes live at `https://YOUR_USERNAME.github.io/knightwatch-cybersecurity/`
   within a minute or two.

### 2. Custom domain

1. Buy the domain (e.g. `knightwatchcyber.com`) at any registrar — Cloudflare
   Registrar sells at cost; Porkbun and Namecheap are also fine.
2. In the repo: **Settings → Pages → Custom domain** → enter the domain and save
   (GitHub commits a `CNAME` file to the repo).
3. At your DNS provider add:
   - `CNAME` record: `www` → `YOUR_USERNAME.github.io`
   - `A` records for the apex (`@`): `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
4. Back in Pages settings, tick **Enforce HTTPS** once the certificate is issued.

### 3. Taking inquiries through the site

Done — a Formspace form is embedded in the contact section (see "Contact form" below).
For a self-owned backend later, move hosting to Cloudflare Pages or Netlify (both free
for this) and point a native form at a serverless function that emails you via
Resend/SES/Postmark; the previous native form + fetch handler is preserved in git
history and `js/main.js`.

### 4. Email @ your domain

- **Google Workspace** (~$7/user/mo) — the professional default; best deliverability.
- **Zoho Mail** — free/cheap tier, solid for a solo practice.
- **Cloudflare Email Routing** — free *receive-only* forwarding (hello@domain → your
  Gmail); pair with a paid sending option when you need to reply from the domain.

Once live, update the `hello@knightwatchcyber.com` placeholders (see the `REPLACE:`
markers in `index.html` and `js/main.js`).

## Images

- **`assets/founder.jpg`** — founder headshot, shown in the About section. If the file
  is missing, a styled "JR" monogram appears instead, so the site never looks broken.
- **`assets/logo.png`** — the Knightwatch logo (transparent background), shown as a
  glowing emblem beside the hero copy on wide screens (hidden on mobile to keep the
  hero focused).
- **`assets/originals/`** — the original full-size PNGs. The site references only the
  optimized versions (~510KB total vs ~3.6MB for the originals). To regenerate after
  swapping an original:
  - photo: `sips -s format jpeg -s formatOptions 78 -Z 800 in.png --out out.jpg`
  - logo (keeps transparency): `sips -Z 760 in.png --out out.png`

## Placeholders to replace before launch

Search the project for `REPLACE:` comments — each marks something to update:

- **Email address** — currently `hello@knightwatchcyber.com`, used in:
  - [`index.html`](index.html) (contact section + footer)
  - [`js/main.js`](js/main.js) (mailto fallback destination)
- **Location** — currently "Remote-first / United States" in the footer of `index.html`.
- **Business name** — "Knightwatch Cybersecurity" is a placeholder brand name used
  consistently throughout; rename via find-and-replace across `index.html` if the
  business name changes.
- **Favicon** — a minimal inline SVG shield is used as the favicon (in the `<head>` of
  `index.html`); swap for a real icon file later if desired.

## Contact form

Inquiries are collected through a **Formspace** form (hosted at forms.space) embedded
inline in the contact section via Formspace's official embed script
(`https://formspace.com/embed.js`, loaded at the bottom of `index.html`). Submissions
land in the Formspace dashboard; configure email notifications / workflows there
(Formspace → form → Workflows). A fallback link under the embed opens the hosted form
directly if the embed can't load. This is the site's only external script — style the
form's colors inside Formspace to match the site theme (dark navy `#0d1633`,
text `#edf1fa`, gold accent `#d4a94e`).

**If you ever switch to an endpoint-style backend** (e.g. Formspree): the previous
custom-built form markup lives in git history, and its submit handler is still in
`js/main.js` — it auto-detects a form `action` URL (fetch + inline success message)
and falls back to mailto without one.

## Design & animation notes

- **Theme**: full-page navy → near-black gradient (fixed layer behind all content),
  with a muted gold + steel-blue accent gradient used for headings, buttons, and rings.
  All colors are CSS custom properties at the top of `css/styles.css`.
- **Animations** (all honor `prefers-reduced-motion`):
  - Scroll-reveal: elements with `.reveal` fade/slide in via IntersectionObserver;
    `.stagger` containers cascade their children.
  - Scroll progress bar along the top edge.
  - Hero: floating gradient orbs, faint grid backdrop, pulsing status dot, scroll hint.
  - Marquee positioning bar (pauses on hover; wraps statically under reduced motion).
  - Hover morphing: tiles shift hue and corner shape (`.morph-tile`); cards lift with a
    gradient border ring and a mouse-tracking spotlight (`.spotlight-card`).
  - Sticky header gains background/border once scrolled.
- **Typography/icons**: system font stack and hand-written inline SVGs — no web fonts,
  icon libraries, or external requests of any kind.
- No fake testimonials, client logos, certifications, or team members are included, per
  the project's requirements — content reflects only what the practice actually offers.

## Content accuracy

This site intentionally avoids claims of guaranteed compliance, legal advice, formal
audits, certifications, penetration testing, 24/7 monitoring, incident response
ownership, or breach prevention. Keep future copy edits consistent with that boundary —
see the "Advisory boundaries" section in `index.html` for the canonical disclaimer
language.

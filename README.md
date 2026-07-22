# Sentinel Keep Cyber Advisory — Website

A polished single-page marketing site for Sentinel Keep Cyber Advisory, a remote-first
cybersecurity readiness and GRC advisory practice. The site uses plain HTML, CSS, and
JavaScript with no framework or build step.

## File structure

```text
sentinel-keep-site/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── founder.jpg
│   ├── logo.png
│   └── originals/
│       ├── founder.png
│       └── sentinel-keep-logo.png
└── README.md
```

## Run locally

Open `index.html` directly, or serve the directory locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Contact workflow

The primary call to action opens a Google Form owned by
`jonathan.e.j.rothe@gmail.com`. The form asks for:

- Name
- Work email
- Company or organization
- The security or compliance trigger
- Any deadline or triggering event

Direct email links also use `jonathan.e.j.rothe@gmail.com` with a prefilled subject.
The site does not collect or store form submissions itself.

## Images

- `assets/logo.png` is the optimized 900 × 600 transparent logo used in the hero.
- `assets/originals/sentinel-keep-logo.png` is the supplied full-resolution source.
- `assets/founder.jpg` is the optimized founder headshot.

## Deployment

The repository is ready for GitHub Pages and includes `.nojekyll`. If Pages is already
configured to deploy from `main`, pushing the changed files will update the live site.

For a custom domain, a practical option is `sentinelkeepcyber.com`. Configure it in the
repository's Pages settings, add the DNS records provided by GitHub, and enable HTTPS
after the certificate is issued.

## Brand and content boundaries

Use the full name **Sentinel Keep Cyber Advisory** in formal contexts and **Sentinel
Keep** in short copy. The preferred descriptor is **Cybersecurity & GRC Advisory**.

The site intentionally avoids claims of guaranteed compliance, legal advice, formal
audits, certifications, penetration testing, 24/7 monitoring, incident-response
ownership, or breach prevention. Keep future edits consistent with the advisory
boundaries section in `index.html`.

## Design notes

- Navy-to-black background with steel-blue and restrained gold accents
- Responsive single-page layout
- Accessible navigation, focus states, and reduced-motion support
- Scroll-reveal, progress, marquee, and card spotlight effects
- No fake testimonials, client logos, certifications, or team members

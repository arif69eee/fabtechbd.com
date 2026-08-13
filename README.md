# fabtechbd.com

Static marketing website for **FABTECH Bangladesh** — built from the company
profile (Rev 06). No build step is required to deploy: every file in this
repository is served as-is by GitHub Pages.

## Structure

```
.
├── index.html            Home
├── about.html            About us, standards, departments
├── services.html         Work scopes (mechanical works + industrial solutions)
├── projects.html         All completed and ongoing projects, with photo galleries
├── capabilities.html     Workshop tools & equipment, manpower
├── quality.html          Quality & HSE policy
├── contact.html          Offices, key contact, enquiry form
├── 404.html              Not-found page
├── CNAME                 Custom domain (fabtechbd.com)
├── robots.txt
├── sitemap.xml
├── .nojekyll             Serve files as-is, skip Jekyll processing
└── assets/
    ├── css/fonts.css     Self-hosted @font-face declarations
    ├── css/style.css     All site styling
    ├── fonts/            Oswald + Poppins woff2 (SIL Open Font License 1.1)
    ├── js/main.js        Nav, scroll reveal, project filter, lightbox, form
    └── img/
        ├── brand/        Logo, favicon, hero image
        ├── scopes/       Photos used on the services page
        └── projects/     Project photographs (pNN-N.jpg = profile page NN)
```

## Deploying

1. Push this repository to `main`.
2. In **Settings → Pages**, set *Source* to **Deploy from a branch**,
   branch `main`, folder `/ (root)`.
3. The `CNAME` file already points the site at `fabtechbd.com`. Add these DNS
   records with your domain registrar:

   | Type  | Name  | Value |
   |-------|-------|-------|
   | A     | `@`   | `185.199.108.153` |
   | A     | `@`   | `185.199.109.153` |
   | A     | `@`   | `185.199.110.153` |
   | A     | `@`   | `185.199.111.153` |
   | CNAME | `www` | `<your-github-username>.github.io` |

4. Once DNS resolves, tick **Enforce HTTPS** on the Pages settings screen.

## Editing content

Two options:

**Edit the HTML directly.** Every page is plain, readable HTML — change the text
and commit. Nothing else is needed.

**Regenerate from the source script.** `build.py` (kept outside this repo, in the
project working folder) holds all copy, the project list and the page templates in
Python data structures. Running `python3 build.py` rewrites every `.html` file.
Use this if you want to add a project or reorder the navigation in one place —
but remember it overwrites any hand-edits made to the HTML.

## Notes

- The enquiry form on `contact.html` has no server behind it: submitting opens the
  visitor's own mail client with the message pre-filled to `info@fabtechbd.com`.
  To collect submissions directly, point the form at a service such as Formspree
  or Netlify Forms.
- Project photographs were extracted from the company profile PDF and compressed
  for the web. Scanned legal documents and workforce certificates were
  deliberately left out; the site refers to them as available on request.
- Fonts are self-hosted, so the site loads no third-party resources and sets no
  cookies.

# Deemannie's Digital — Website

Premium, minimalist marketing site for a modern African digital agency.

- **Tagline:** BE SEEN. GET CHOSEN.
- **Services:** Business Websites · Digital Menus · Business Growth Solutions
- **Palette:** Black (`#0B0B0C`), warm muted gold (`#C8A96A`), white (`#F7F5F1`)
- **Stack:** Plain HTML, CSS and JavaScript. No build step, no paid services, no dependencies.

## Structure

```
deemannies-digital-site/
├── index.html                   # Page markup and content
├── css/styles.css               # All styling (mobile-first, responsive breakpoints)
├── js/main.js                   # Nav, reveals, parallax, tile tilt, inquiry form
├── assets/
│   ├── brand-mark.svg           # Reusable DD monogram (standalone)
│   ├── favicon.svg              # Favicon, same DD monogram on a black tile
│   └── hero-architecture.svg    # Local cinematic hero background (colonnade)
└── README.md                    # This file
```

## Previewing locally

Any static file server works. From inside the project folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`. Opening `index.html` directly from disk also works.

## Previewing in AnyClaw

AnyClaw serves static sites straight from the project folder — no build or install step is required.

1. Open AnyClaw and choose **Open folder / Open project**.
2. Select the `deemannies-digital-site` folder (not the parent `hi` folder).
3. AnyClaw serves it as a static site. The entry point is `index.html` at the root of that folder.
4. Use the **Preview / Live server** panel to open the served URL, typically `http://localhost:<port>`.
5. If AnyClaw offers a "port" or "server" setting, keep it on the default and make sure it points at the `deemannies-digital-site` folder so `/css/styles.css` and `/js/main.js` resolve.

The site works on a static host as-is. Deploy by uploading the contents of this folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages) — no server-side code is used.

## Placeholders to replace before launch

| Item | Current placeholder | Where |
|---|---|---|
| Location | "Location to be confirmed" | `index.html` → contact list |

The location is deliberately left as a placeholder until a real, public business address is confirmed. No office address is claimed anywhere on the site.

### Brand mark

`assets/brand-mark.svg` is the supplied Deemannie's Digital monogram, vectorised from the supplied artwork so it stays crisp at any size and on retina displays. It is used in the header and footer via `<img>` and repeated on the favicon tile.

The vector trace keeps the artwork's geometry and its real gold tones — champagne `#F0CC6C` at the top falling to deep amber `#A9701F` at the base, with the two highlights from the original artwork reproduced as soft radial overlays. The metallic grain of the source render is not reproduced.

If you later receive the master logo as a vector or high-resolution PNG, drop it in as `assets/brand-mark.svg` and `assets/favicon.svg` — no other file needs to change.

No testimonials, client results, awards or credentials have been included. Add them only with real, verified information.

## Confirmed contact details

| Detail | Value |
|---|---|
| WhatsApp (display) | `08115767834` |
| WhatsApp (link, international) | `2348115767834` — used in every `wa.me` href |
| Email | `Deemanniesdigital@gmail.com` — linked as `mailto:Deemanniesdigital@gmail.com` |

The WhatsApp number is stored as `WHATSAPP_NUMBER` in `js/main.js` in international format and referenced by every `wa.me` link in `index.html`. To change it, update both places. The email appears once, in the contact list.

## Notes

- Typography loads from Google Fonts (Sora + Inter) and falls back to system fonts if offline.
- The contact form does not post anywhere. On submit it opens WhatsApp with the enquiry pre-filled — there is no backend and no data is stored.
- Scroll animations respect `prefers-reduced-motion` and degrade to a static layout.
- Reusable WhatsApp links use the `data-wa` attribute so they can be targeted centrally later.
- The hero background is a local SVG (no external image request). It sits under layered gradients and a grain overlay, so the hero still reads well if the image fails to load.
- Service tiles are fully clickable: selecting one scrolls to the enquiry form with that service pre-selected.
- Pointer tilt and hero parallax only run on fine pointers with motion enabled, and are disabled under `prefers-reduced-motion`.

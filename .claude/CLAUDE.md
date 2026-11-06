# Enactus H.R. College website: notes for Claude

Static site on GitHub Pages, served from `main`: https://vanshpurohit10.github.io/enactus-hrc/
`index.html` (home), `inaayat.html`, `sanchay.html`, `events.html`, `team.html`, `contact.html`, all on the shared
`assets/enactus.css` and `assets/enactus.js`. Every page has the same top nav (Home, Inaayat, Sanchay, Events, Team, Contact);
the phone menu adds the page's own sections. Each page adds its own palette and styles inline; the only inline scripts are
the gallery lists and Sanchay's credits calculator.
`video/` is a Remotion project for the two promo videos (see `video/README.md`).

## Working here
- Work on a branch and merge with a pull request; the live site updates about a minute after a merge to `main`.
- Claude must be connected to GitHub as `vanshpurohit10` (the repo owner). Another account can read but gets 403 on push.
- Check pages at phone (390 px) and desktop widths after edits.
- The team asked for a calmer, more professional site like enactussrcc.org (Nov 2026). Keep motion to the two shared effects:
  `data-reveal` (fade in once) and `.count` (count up once). No intros, pinned scroll scenes, marquees, cursor effects or parallax.
  Bump the `?v=` on the CSS/JS links when changing the shared files.

## Preview artifact
A private claude.ai preview of the site: https://claude.ai/artifact/Un4jg5jmUZ4bTcxYe5iSLG
The user reviews changes there before they are merged; GitHub `main` stays the source of truth for the live site.
To refresh it from the repo: copy the six pages, drop the `?v=N` from the asset links, remove the home page's
`<!doctype html>`, `<html>`, `<head>` and `<body>` tags (the host adds its own) and set its `<title>` to
`Enactus H.R. College`. Then publish that home page with `url` set to the link above, with the other five pages
and every `assets/` file except `og-*` in `files`. YouTube, Instagram and LinkedIn embeds are blocked in the
preview but work on the live site.

## Done (Oct–Nov 2026)
- Teacher-in-Charge is Darshit Shah.
- Videos: full film (9:46) and a 3-minute cut, with original synthesised music. They still show old facts
  (50,000 lives, Top 4, ₹5,000 costs, "What's next" content) and need re-rendering once the questions below are answered.
- Team review applied (PR #1): "Enactus India Nationals" out of the home hero strip; new hero description of Enactus;
  "What is Enactus?" section removed, "We believe in engaging students..." kept; 80,000+ lives; "ocean waste" for the 7,000 kg;
  Social Media department; no project count anywhere; Inaayat Top 5 at Envision 2026; Inaayat order is hero → problem →
  2026 campaign; videos right after "Watch it for yourself"; gallery Instagram embeds removed; only the ₹170 kit cost
  (calculator = kits × ₹170); "What's next" removed on both project pages (closing quotes kept); Sanchay drifting particles,
  "Our approach", the QR block and "Next 12 months" removed; message buttons say "on Instagram".
- Calmer design (5 Nov 2026): intro, cursor line, scene labels, marquees, glitch/kinetic type, pinned scenes, stacking cards,
  horizontal scroll, parallax and canvases removed; those sections are now plain grids and bands with the same copy.
  Sanchay's batch record shows its finished state, and its
  traceability grid's missing closing tag was fixed. The videos still show the old animated site.

- Voice-note review (6 Nov 2026, from Vaishnavi Chaturvedi, president): home lost the World Cup "3rd" badge (outdated) and the
  297 villages number (unverified; Chirag's card now leads with the World Cup result), the EN·ACT·US band and the
  "We believe in engaging students" statement; Wins run newest first; presidents moved to a new Team page with a
  "Meet the team" section near the end of home. Inaayat lost its Instagram reels (GHTW 3.0 photo stands in), its numbers
  section, "Let's talk period", the kit section (wrong contents) and all costing (₹170 box, cost calculator, home join card).
  Give Her the Wings moved to a new Events page with Synapse. New Contact page has only the two presidents. Sanchay lost
  the "Every single kilo counts" band.

- Second round from Vaishnavi (6 Nov 2026): the team's Enactus description (first sentence in the hero, the rest in a new
  "About us" section with its closing line as the statement); the presidents' phone numbers and emails on Contact; Inaayat's
  three numbers (80,000+ beneficiaries, 4,800 kg plastic waste saved, 20,000+ kits; also on the home page); the kit is back
  with its real contents (drawstring bag, 2 L-size 28 cm + 1 XL-size 33 cm cotton pads, Marathi manual, soap; no prices);
  Synapse uses the team's own text, with no dates, no registration link and no "one-day"; Sanchay's LinkedIn and Instagram
  posts were removed.

## Waiting on the team
1. Kit pads: the middle (absorbent) layer's fabric. The voice note sounds like "cotton punch"; the site says "an absorbent
   cotton layer" until confirmed. Also confirm Vaishnavi's email is vaishnavichaturved@gmail.com (no final "i").
2. Inaayat "Latest": photos from Give Her the Wings 2026 to replace the GHTW 3.0 stand-in.
3. Team page: names, roles and photos of all TYs.
4. Synapse photos (no dates or registration link, by the team's choice).
5. Inaayat hero description: the "little change" they want.
6. Photos for the Sanchay "Recycle" step (raincoats for NMMC, helmets for Rajasthan Police).
7. IFAT India 2025: what is wrong (hero strip and journey entry).
8. Envision 2025 Samudra Manthan "Top 4 of 478": still correct? Year of the Enactus Cares win (for the Wins order)?

## Ideas discussed, not started
- Custom domain enactushrc.com (unregistered on 4 Nov 2026): A records 185.199.108.153 to .111.153, `www` CNAME to
  `vanshpurohit10.github.io`, set it in repo Settings → Pages, then Enforce HTTPS; afterwards update og:url/og:image and the
  video outro. Hosting stays free on GitHub Pages; buy the domain on the club's email with auto-renew.
- A contact email for sponsors; pages for products, events and the team; a press page.
- Speed: photos are about 3.5 MB per page; convert to WebP at display sizes.
- SEO: sitemap.xml, robots.txt, canonical tags.
- Login/accounts would need a service such as Firebase or Supabase; GitHub Pages only serves files.

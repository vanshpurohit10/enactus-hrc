# Enactus H.R. College website: notes for Claude

Static site on GitHub Pages, served from `main`: https://vanshpurohit10.github.io/enactus-hrc/
`index.html` (home), `inaayat.html`, `sanchay.html`, shared `assets/enactus.css` and `assets/enactus.js`.
Each page also has inline styles and scripts; `sanchay.html` carries its own full script.
`video/` is a Remotion project for the two promo videos (see `video/README.md`).

## Working here
- Work on a branch and merge with a pull request; the live site updates about a minute after a merge to `main`.
- Claude must be connected to GitHub as `vanshpurohit10` (the repo owner). Another account can read but gets 403 on push.
- Check pages at phone (390 px) and desktop widths after edits. Removing a section means removing its script too:
  Sanchay's scene labels (`NAMES` in its script) list section ids, and the home globe code needed its canvas.

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

## Waiting on the team
1. Villages lit (297) is unverified: the Chirag NGO now claims 500+ to 863 villages and says Chirag began in 2010 (site says 2009).
2. Meet our team: names, roles and photos of all TYs (to extend the two-president section).
3. Inaayat hero description: the "little change" they want.
4. Inaayat numbers: correct values for 2,600 kits (Bindu), 1,000 kits per campaign, 1,200 pads (Nagpur).
5. Correct kit contents.
6. Their own GHTW 2026 videos to replace the last two Instagram reels in Inaayat's "Latest" section (the first reel may be removed).
7. Photos for the Sanchay "Recycle" step (raincoats for NMMC, helmets for Rajasthan Police).
8. IFAT India 2025: what is wrong (hero strip and journey entry).
9. "Visual consistency": anything beyond the gallery and the cost box.
10. Sanchay gallery: remove its Instagram and LinkedIn embeds too?
11. Envision 2025 Samudra Manthan "Top 4 of 478": still correct?
If "nationals achievement at top" meant the World Cup 2012 badge rather than the Nationals strip, move that instead.

## Ideas discussed, not started
- Custom domain enactushrc.com (unregistered on 4 Nov 2026): A records 185.199.108.153 to .111.153, `www` CNAME to
  `vanshpurohit10.github.io`, set it in repo Settings → Pages, then Enforce HTTPS; afterwards update og:url/og:image and the
  video outro. Hosting stays free on GitHub Pages; buy the domain on the club's email with auto-renew.
- A contact email for sponsors; pages for products, events and the team; a press page.
- Speed: photos are about 3.5 MB per page; convert to WebP at display sizes.
- SEO: sitemap.xml, robots.txt, canonical tags.
- Login/accounts would need a service such as Firebase or Supabase; GitHub Pages only serves files.

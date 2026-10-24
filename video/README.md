# Enactus H.R. College: the motion video

A 9 min 47 s, 1920×1080 motion film of everything on the website: the chapter, its story and wins, Project Inaayat, Project Sanchay, and how to join or partner. It is built with [Remotion](https://www.remotion.dev) in the site's own colours and type.

## Chapters

1. **Enactus HRC**: intro, hero, impact numbers, what the name means, what Enactus is, how we work, guides, presidents
2. **Our story**: Chirag and the projects that followed it
3. **Wins**: all ten wins, the Mid-day story, and the two projects side by side
4. **Project Inaayat**: the whole page, from the problem to the sponsor calculator
5. **Project Sanchay**: the whole page, from the shoreline to plastic credits
6. **Join us**: life at Enactus, joining, partnering, links

## Commands

```console
npm i                     # install
npm run dev               # preview and edit in Remotion Studio
npx remotion render EnactusHRC out/enactus-hrc.mp4 --crf=20
```

Every scene is also its own composition in the Studio sidebar, grouped by chapter, so a single scene can be previewed or rendered on its own.

## Where things live

- `src/scenes.ts`: the running order, each scene's length and how it transitions in. Change a duration here and the film re-times itself.
- `src/scenes/<chapter>/`: the scenes. All copy is taken from the website.
- `src/ui/`: the shared look: palettes and fonts (`theme.ts`), text and number animations, and the scene templates (hero, stats, cards, timeline and so on).
- `public/img/`: copies of the site's photos and logos. `public/fonts/`: Archivo, Inter, JetBrains Mono and Tiro Devanagari Hindi, as on the site.
- `public/audio/`: the background track and transition whoosh. Both are synthesised by `scripts/music.py` (needs Python 3 and NumPy), so they are original and free to use anywhere the video is posted. If the film's length changes, regenerate the track:

  ```console
  python3 scripts/music.py <seconds> /tmp/audio
  ffmpeg -i /tmp/audio/music.wav -b:a 192k public/audio/music.mp3
  cp /tmp/audio/whoosh.wav public/audio/whoosh.wav
  ```

  To use a different song, replace `public/audio/music.mp3` with any MP3.

- `scripts/stills.mjs`: renders preview frames, e.g. `node scripts/stills.mjs /tmp/stills Home-Hero:200 Outro:220`.

Remotion is free for teams of up to three; see its [license](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).

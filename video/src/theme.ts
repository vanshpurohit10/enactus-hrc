import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// The website's own type: Archivo (stretched) for display, Inter for body, JetBrains Mono for labels.
const LATIN =
  "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";
const LATIN_EXT =
  "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF";

const faces: Parameters<typeof loadFont>[0][] = [
  ["Archivo", "Archivo", "500 900", "100% 125%"],
  ["Inter", "Inter", "100 900", undefined],
  ["JetBrains Mono", "JetBrainsMono", "100 800", undefined],
].flatMap(([family, file, weight, stretch]) =>
  [
    ["latin", LATIN],
    ["latin-ext", LATIN_EXT],
  ].map(([subset, unicodeRange]) => ({
    family: family as string,
    url: staticFile(`fonts/${file}-${subset}.woff2`),
    weight: weight as string,
    stretch: stretch as string | undefined,
    unicodeRange,
  })),
);
faces.push({
  family: "Tiro Devanagari Hindi",
  url: staticFile("fonts/TiroDevanagariHindi-devanagari.woff2"),
  weight: "400",
});
faces.forEach((f) => loadFont(f));

export const DISPLAY = '"Archivo", system-ui, sans-serif';
export const BODY = '"Inter", system-ui, sans-serif';
export const MONO = '"JetBrains Mono", ui-monospace, monospace';
export const DEVA = '"Tiro Devanagari Hindi", serif';

export type Palette = {
  deep: string;
  ink: string;
  sea: string;
  sand: string;
  paper: string;
  text: string;
  mute: string;
  muteD: string;
  acc: string;
  accInk: string;
  accDeep: string;
  acc2: string;
};

// Each page of the site has its own palette; the video keeps them per chapter.
export const HOME: Palette = {
  deep: "#0b0b0e",
  ink: "#16161b",
  sea: "#2a2a33",
  sand: "#f2efe7",
  paper: "#faf8f2",
  text: "#15151a",
  mute: "#5d5d68",
  muteD: "#a7a7b3",
  acc: "#ffc21a",
  accInk: "#1a1400",
  accDeep: "#e0a200",
  acc2: "#ff5a7e",
};

export const INAAYAT: Palette = {
  deep: "#1b0b16",
  ink: "#2a1222",
  sea: "#7a2a52",
  sand: "#f8ebe7",
  paper: "#fdf6f3",
  text: "#2a1222",
  mute: "#6e5563",
  muteD: "#c9adbb",
  acc: "#ff5a7e",
  accInk: "#2a0610",
  accDeep: "#e23b62",
  acc2: "#ffc21a",
};

export const SANCHAY: Palette = {
  deep: "#061320",
  ink: "#0b2236",
  sea: "#123a57",
  sand: "#f3efe5",
  paper: "#fbf9f3",
  text: "#0b2236",
  mute: "#566779",
  muteD: "#9cb2c6",
  acc: "#ffc21a",
  accInk: "#1a1400",
  accDeep: "#e0a200",
  acc2: "#41c9c1",
};

export const TEAL = "#41c9c1";

// Safe area for a 1920×1080 frame.
export const SIDE = 140;
export const TOP = 110;

import React, { createContext, useContext } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BODY, Palette } from "../theme";

type Tone = "deep" | "ink" | "sand" | "paper";

type Ctx = {
  pal: Palette;
  dark: boolean;
  fg: string;
  mute: string;
  line: string;
};

const PalCtx = createContext<Ctx | null>(null);

export const usePal = () => {
  const c = useContext(PalCtx);
  if (!c) throw new Error("usePal() must be used inside <Scene>");
  return c;
};

/**
 * A full frame in one of the chapter's four surfaces, with the site's dot grid
 * and a slow accent glow. Children read the palette through usePal().
 */
export const Scene: React.FC<{
  pal: Palette;
  tone: Tone;
  grid?: boolean;
  glow?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ pal, tone, grid = true, glow = true, style, children }) => {
  const frame = useCurrentFrame();
  const dark = tone === "deep" || tone === "ink";
  const ctx: Ctx = {
    pal,
    dark,
    fg: dark ? "#f0f0f4" : pal.text,
    mute: dark ? pal.muteD : pal.mute,
    line: dark ? "rgba(255,255,255,.13)" : "rgba(0,0,0,.1)",
  };
  const dot = dark ? "rgba(255,255,255,.09)" : "rgba(0,0,0,.07)";
  return (
    <PalCtx.Provider value={ctx}>
      <AbsoluteFill
        style={{
          backgroundColor: pal[tone],
          color: ctx.fg,
          fontFamily: BODY,
          overflow: "hidden",
        }}
      >
        {glow ? (
          <AbsoluteFill
            style={{
              background: `radial-gradient(900px circle at ${70 + Math.sin(frame / 90) * 12}% ${
                30 + Math.cos(frame / 110) * 14
              }%, ${pal.acc}${dark ? "24" : "1f"}, transparent 65%)`,
            }}
          />
        ) : null}
        {grid ? (
          <AbsoluteFill
            style={{
              backgroundImage: `radial-gradient(${dot} 1.4px, transparent 2px)`,
              backgroundSize: "36px 36px",
              backgroundPosition: `${-frame * 0.2}px 0px`,
            }}
          />
        ) : null}
        <AbsoluteFill style={style}>{children}</AbsoluteFill>
      </AbsoluteFill>
    </PalCtx.Provider>
  );
};

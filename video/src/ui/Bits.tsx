import React from "react";
import { Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { DISPLAY, MONO } from "../theme";
import { lerp, prog } from "./anim";
import { usePal } from "./Scene";

/** A number that counts up like the site's odometers, with Indian digit grouping. */
export const Counter: React.FC<{
  to: number;
  delay?: number;
  dur?: number;
  decimals?: number;
}> = ({ to, delay = 0, dur = 54, decimals = 0 }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, delay, dur, Easing.bezier(0.22, 1, 0.36, 1));
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {(to * p).toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
};

/** A photo that fills its box and drifts slowly, Ken Burns style. */
export const Photo: React.FC<{
  src: string;
  zoom?: [number, number];
  drift?: [string, string];
  dur?: number;
  position?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({
  src,
  zoom = [1.14, 1.02],
  drift = ["0px 0px", "0px 0px"],
  dur = 300,
  position = "50% 50%",
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const p = lerp(frame, [0, dur], [0, 1], Easing.linear);
  const [dx0, dy0] = drift[0].split(" ").map(parseFloat);
  const [dx1, dy1] = drift[1].split(" ").map(parseFloat);
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      <Img
        src={staticFile(`img/${src}`)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          scale: `${zoom[0] + (zoom[1] - zoom[0]) * p}`,
          translate: `${dx0 + (dx1 - dx0) * p}px ${dy0 + (dy1 - dy0) * p}px`,
        }}
      />
      {children}
    </div>
  );
};

/** An endless row of items sliding sideways. */
export const Marquee: React.FC<{
  items: string[];
  speed?: number;
  reverse?: boolean;
  gap?: number;
  sep?: React.ReactNode;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}> = ({
  items,
  speed = 2.4,
  reverse = false,
  gap = 44,
  sep,
  style,
  itemStyle,
}) => {
  const frame = useCurrentFrame();
  const { pal } = usePal();
  const row = Array.from({ length: 8 }, () => items).flat();
  const shift = reverse ? -3000 + frame * speed : -frame * speed;
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", ...style }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap,
          translate: `${shift}px 0`,
        }}
      >
        {row.map((item, i) => (
          <React.Fragment key={i}>
            <span style={itemStyle}>{item}</span>
            {sep ?? (
              <span
                style={{
                  width: 12,
                  height: 12,
                  background: pal.acc,
                  rotate: "45deg",
                  flex: "none",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/** A small pill label. */
export const Chip: React.FC<{
  children: React.ReactNode;
  delay?: number;
  solid?: boolean;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, solid = false, color, size = 24, style }) => {
  const frame = useCurrentFrame();
  const { pal, dark } = usePal();
  const p = prog(frame, delay, 18, Easing.spring({ damping: 14, mass: 0.5 }));
  const o = prog(frame, delay, 12);
  const bg = color ?? pal.acc;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: `${size * 0.55}px ${size * 0.85}px`,
        borderRadius: 999,
        background: solid ? bg : "transparent",
        color: solid ? pal.accInk : dark ? "#fff" : pal.text,
        boxShadow: solid
          ? undefined
          : `inset 0 0 0 2px ${dark ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.2)"}`,
        opacity: o,
        scale: `${0.6 + 0.4 * p}`,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
};

/** A raised panel that reads well on both light and dark surfaces. */
export const cardStyle = (
  dark: boolean,
  extra?: React.CSSProperties,
): React.CSSProperties => ({
  background: dark ? "rgba(255,255,255,.06)" : "#fff",
  boxShadow: dark
    ? "inset 0 0 0 1.5px rgba(255,255,255,.12)"
    : "0 1px 0 rgba(0,0,0,.04), 0 18px 50px -24px rgba(0,0,0,.25)",
  borderRadius: 32,
  ...extra,
});

/** Rows of a word repeated and sliding, like the site's kinetic type bands. */
export const Kinetic: React.FC<{
  word: string;
  size: number;
  speed?: number;
  reverse?: boolean;
  outline?: boolean;
  color?: string;
  style?: React.CSSProperties;
}> = ({
  word,
  size,
  speed = 4,
  reverse = false,
  outline = false,
  color,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fg } = usePal();
  const shift = reverse ? -2400 + frame * speed : -frame * speed;
  return (
    <div style={{ whiteSpace: "nowrap", overflow: "hidden", ...style }}>
      <div
        style={{
          display: "inline-block",
          translate: `${shift}px 0`,
          fontFamily: DISPLAY,
          fontWeight: 900,
          fontStretch: "125%",
          fontSize: size,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: outline ? "transparent" : (color ?? fg),
          WebkitTextStroke: outline ? `2px ${color ?? fg}` : undefined,
        }}
      >
        {Array.from({ length: 14 }, () => word).join(" ")}
      </div>
    </div>
  );
};

/** A step number in a small accent-ringed disc. */
export const Num: React.FC<{
  n: string | number;
  size?: number;
  style?: React.CSSProperties;
}> = ({ n, size = 64, style }) => {
  const { pal } = usePal();
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        display: "grid",
        placeItems: "center",
        background: pal.acc,
        color: pal.accInk,
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: size * 0.38,
        flex: "none",
        ...style,
      }}
    >
      {typeof n === "number" ? String(n).padStart(2, "0") : n}
    </span>
  );
};

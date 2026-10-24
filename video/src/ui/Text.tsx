import React from "react";
import { useCurrentFrame } from "remotion";
import { DISPLAY, MONO } from "../theme";
import { prog } from "./anim";
import { usePal } from "./Scene";

/**
 * A headline whose words rise out of their own line, one after another.
 * Wrap a part of a word in *asterisks* to set it in the accent colour: "ENACTUS*.*"
 */
export const Words: React.FC<{
  children: string;
  delay?: number;
  stagger?: number;
  dur?: number;
  hl?: string;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, stagger = 3, dur = 24, hl, style }) => {
  const frame = useCurrentFrame();
  const { pal } = usePal();
  const words = children.split(" ").filter(Boolean);
  return (
    <div style={style}>
      {words.map((word, i) => {
        const p = prog(frame, delay + i * stagger, dur);
        const parts = word.split(/(\*[^*]+\*)/).filter(Boolean);
        return (
          <React.Fragment key={i}>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
                padding: "0.08em 0.04em 0.16em",
                margin: "-0.08em -0.04em -0.16em",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  translate: `0 ${(1 - p) * 110}%`,
                  rotate: `${(1 - p) * 4}deg`,
                }}
              >
                {parts.map((part, j) =>
                  part.startsWith("*") ? (
                    <span key={j} style={{ color: hl ?? pal.acc }}>
                      {part.slice(1, -1)}
                    </span>
                  ) : (
                    <span key={j}>{part}</span>
                  ),
                )}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** Big display type, in the site's stretched Archivo. */
export const display = (
  size: number,
  weight = 840,
  extra?: React.CSSProperties,
): React.CSSProperties => ({
  fontFamily: DISPLAY,
  fontSize: size,
  fontWeight: weight,
  fontStretch: "112%",
  lineHeight: 0.98,
  letterSpacing: "-0.025em",
  margin: 0,
  ...extra,
});

/** The site's eyebrow: a small accent diamond and spaced mono capitals. */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  delay?: number;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, color, size = 26, style }) => {
  const frame = useCurrentFrame();
  const { pal, dark } = usePal();
  const p = prog(frame, delay, 20);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: color ?? (dark ? pal.acc : pal.sea),
        opacity: p,
        translate: `${(1 - p) * -24}px 0`,
        ...style,
      }}
    >
      <span
        style={{
          width: size * 0.42,
          height: size * 0.42,
          background: pal.acc,
          rotate: `${45 + (1 - p) * 180}deg`,
          flex: "none",
        }}
      />
      <span>{children}</span>
    </div>
  );
};

/** Supporting paragraph text. */
export const Lede: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, size = 40, style }) => {
  const frame = useCurrentFrame();
  const { mute } = usePal();
  const p = prog(frame, delay, 26);
  return (
    <p
      style={{
        margin: 0,
        fontSize: size,
        lineHeight: 1.38,
        color: mute,
        opacity: p,
        translate: `0 ${(1 - p) * 30}px`,
        textWrap: "pretty",
        ...style,
      }}
    >
      {children}
    </p>
  );
};

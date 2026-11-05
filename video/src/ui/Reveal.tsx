import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { prog } from "./anim";

/** Fades, lifts and un-blurs its children in, `delay` frames into the scene. */
export const Reveal: React.FC<{
  delay?: number;
  dur?: number;
  x?: number;
  y?: number;
  scale?: number;
  blur?: number;
  spring?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({
  delay = 0,
  dur = 24,
  x = 0,
  y = 40,
  scale = 1,
  blur = 6,
  spring = false,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const p = prog(
    frame,
    delay,
    dur,
    spring ? Easing.spring({ damping: 12, mass: 0.6 }) : undefined,
  );
  const o = Math.min(1, prog(frame, delay, dur));
  return (
    <div
      style={{
        opacity: o,
        translate: `${(1 - p) * x}px ${(1 - p) * y}px`,
        scale: scale === 1 ? undefined : `${scale + (1 - scale) * p}`,
        filter: blur && o < 1 ? `blur(${(1 - o) * blur}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

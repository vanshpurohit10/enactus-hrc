import { Easing, interpolate } from "remotion";

// The site's motion curve: fast out of the gate, long soft landing.
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 → 1 between `start` and `start + dur` frames. */
export const prog = (frame: number, start: number, dur: number, easing = OUT) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...CLAMP, easing });

/** Maps `frame` across `input` keyframes onto `output`, clamped. */
export const lerp = (
  frame: number,
  input: number[],
  output: number[],
  easing = OUT,
) => interpolate(frame, input, output, { ...CLAMP, easing });

export const S = (seconds: number) => Math.round(seconds * 30);

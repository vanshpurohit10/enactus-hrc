import { Audio } from "@remotion/media";
import {
  TransitionPresentation,
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { iris } from "@remotion/transitions/iris";
import { pushCut } from "@remotion/transitions/push-cut";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  staticFile,
} from "remotion";
import { Enter, SCENES } from "./scenes";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

const TRANSITION: Record<Enter, number> = {
  fade: 16,
  slide: 22,
  slideUp: 22,
  wipe: 24,
  iris: 26,
  push: 22,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const presentation = (enter: Enter): TransitionPresentation<any> => {
  switch (enter) {
    case "slide":
      return slide({ direction: "from-right" });
    case "slideUp":
      return slide({ direction: "from-bottom" });
    case "wipe":
      return wipe({ direction: "from-right" });
    case "iris":
      return iris({ width: WIDTH, height: HEIGHT });
    case "push":
      return pushCut({ flashColor: "#ffc21a", flashOpacity: 0.25 });
    default:
      return fade();
  }
};

const frames = (seconds: number) => Math.round(seconds * FPS);

// Where each scene starts once transitions overlap its neighbours.
export const TIMELINE = SCENES.reduce<{ start: number; overlap: number }[]>(
  (acc, s, i) => {
    const overlap = i > 0 ? TRANSITION[s.enter ?? "fade"] : 0;
    const prev = acc[i - 1];
    const start = prev
      ? prev.start + frames(SCENES[i - 1].seconds) - overlap
      : 0;
    acc.push({ start, overlap });
    return acc;
  },
  [],
);

export const TOTAL_FRAMES =
  TIMELINE[TIMELINE.length - 1].start +
  frames(SCENES[SCENES.length - 1].seconds);

const MUSIC_FADE = 3 * FPS;

export const Main: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b0b0e" }}>
    <TransitionSeries>
      {SCENES.flatMap((s, i) => {
        const items: React.ReactNode[] = [];
        if (i > 0) {
          const enter = s.enter ?? "fade";
          items.push(
            <TransitionSeries.Transition
              key={`${s.id}-in`}
              presentation={presentation(enter)}
              timing={linearTiming({
                durationInFrames: TRANSITION[enter],
                easing: Easing.bezier(0.65, 0, 0.35, 1),
              })}
            />,
          );
        }
        items.push(
          <TransitionSeries.Sequence
            key={s.id}
            name={s.id}
            durationInFrames={frames(s.seconds)}
          >
            <s.component />
          </TransitionSeries.Sequence>,
        );
        return items;
      })}
    </TransitionSeries>
    <Audio
      src={staticFile("audio/music.mp3")}
      volume={(f) =>
        0.55 *
        interpolate(
          f,
          [0, MUSIC_FADE, TOTAL_FRAMES - MUSIC_FADE, TOTAL_FRAMES],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        )
      }
    />
    {SCENES.map((s, i) =>
      i > 0 && s.enter && s.enter !== "fade" ? (
        <Sequence
          key={s.id}
          name={`whoosh ${s.id}`}
          from={Math.max(0, TIMELINE[i].start - 6)}
          durationInFrames={45}
        >
          <Audio src={staticFile("audio/whoosh.wav")} volume={0.5} />
        </Sequence>
      ) : null,
    )}
  </AbsoluteFill>
);

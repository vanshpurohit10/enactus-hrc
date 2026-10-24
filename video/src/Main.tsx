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
import { Enter, SCENES, SHORT_SCENES, SceneDef } from "./scenes";

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
const timeline = (scenes: SceneDef[]) =>
  scenes.reduce<number[]>((starts, s, i) => {
    const prev = scenes[i - 1];
    starts.push(
      prev
        ? starts[i - 1] + frames(prev.seconds) - TRANSITION[s.enter ?? "fade"]
        : 0,
    );
    return starts;
  }, []);

const totalFrames = (scenes: SceneDef[]) =>
  timeline(scenes)[scenes.length - 1] +
  frames(scenes[scenes.length - 1].seconds);

const MUSIC_FADE = 3 * FPS;

/** A cut of the film: its scenes in order, over its own music track. */
const Film: React.FC<{ scenes: SceneDef[]; music: string }> = ({
  scenes,
  music,
}) => {
  const starts = timeline(scenes);
  const total = totalFrames(scenes);
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0e" }}>
      <TransitionSeries>
        {scenes.flatMap((s, i) => {
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
        src={staticFile(music)}
        volume={(f) =>
          0.55 *
          interpolate(
            f,
            [0, MUSIC_FADE, total - MUSIC_FADE, total],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        }
      />
      {scenes.map((s, i) =>
        i > 0 && s.enter && s.enter !== "fade" ? (
          <Sequence
            key={s.id}
            name={`whoosh ${s.id}`}
            from={Math.max(0, starts[i] - 6)}
            durationInFrames={45}
          >
            <Audio src={staticFile("audio/whoosh.wav")} volume={0.5} />
          </Sequence>
        ) : null,
      )}
    </AbsoluteFill>
  );
};

/** Every section of the site, in full. */
export const Main: React.FC = () => (
  <Film scenes={SCENES} music="audio/music.mp3" />
);
export const TOTAL_FRAMES = totalFrames(SCENES);

/** The three-minute highlights. */
export const Short: React.FC = () => (
  <Film scenes={SHORT_SCENES} music="audio/music-short.mp3" />
);
export const SHORT_FRAMES = totalFrames(SHORT_SCENES);

import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { HOME, MONO, TEAL } from "../../theme";
import { lerp, prog } from "../../ui/anim";
import { Scene } from "../../ui/Scene";
import { display } from "../../ui/Text";

const W = 1920;
const waveY = (x: number) =>
  Math.sin((x / W) * Math.PI * 4 + 0.6) * 70 * Math.sin((x / W) * Math.PI);
const WAVE = Array.from({ length: 97 }, (_, i) => {
  const x = (i / 96) * W;
  return `${i ? "L" : "M"}${x.toFixed(1)},${(150 + waveY(x)).toFixed(1)}`;
}).join(" ");

const TITLE = display(250, 900, {
  fontStretch: "125%",
  letterSpacing: "-0.045em",
  lineHeight: 1,
});

// The site's intro: a spark draws a line, a streak cuts it open, the name slices in,
// and the full stop opens into the page.
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = prog(frame, 4, 40, Easing.bezier(0.45, 0, 0.2, 1));
  const waveOut = prog(frame, 50, 16);
  const streak = prog(frame, 40, 14, Easing.bezier(0.7, 0, 0.3, 1));
  const flash = lerp(frame, [48, 54, 70], [0, 0.4, 0], Easing.linear);
  const settled = frame >= 84;
  const open = prog(frame, 142, 36, Easing.bezier(0.7, 0, 0.84, 0));
  return (
    <Scene pal={HOME} tone="deep" glow={false}>
      <AbsoluteFill style={{ opacity: prog(frame, 0, 24) }} />
      <svg
        viewBox="0 0 1920 300"
        style={{
          position: "absolute",
          left: 0,
          top: 390,
          width: 1920,
          height: 300,
          opacity: 1 - waveOut,
        }}
      >
        <path
          d={WAVE}
          pathLength={1}
          fill="none"
          stroke={TEAL}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="1"
          strokeDashoffset={1 - draw}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: draw * W - 9,
          top: 390 + 150 + waveY(draw * W) - 9,
          width: 18,
          height: 18,
          borderRadius: 99,
          background: "#fff",
          boxShadow: `0 0 18px 6px ${HOME.acc}, 0 0 60px 20px ${HOME.acc}80`,
          opacity: draw > 0 && draw < 1 ? 1 : 1 - waveOut,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 539,
          width: "100%",
          height: 3,
          background:
            "linear-gradient(90deg, transparent, #fff 35%, #fff 65%, transparent)",
          boxShadow: "0 0 24px 3px rgba(255,255,255,.6)",
          scale: `${streak} 1`,
          transformOrigin: "left",
          opacity: 1 - prog(frame, 56, 14),
        }}
      />
      <AbsoluteFill style={{ background: HOME.acc, opacity: flash }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", ...TITLE, color: "#fff" }}>
          <span style={{ visibility: "hidden" }}>
            ENACTUS<span>.</span>
          </span>
          {settled
            ? null
            : Array.from({ length: 6 }, (_, k) => {
                const p = prog(
                  frame,
                  50 + k * 3,
                  24,
                  Easing.bezier(0.16, 1, 0.3, 1),
                );
                return (
                  <span
                    key={k}
                    style={{
                      position: "absolute",
                      inset: 0,
                      clipPath: `inset(${k * 16.667}% 0 ${(5 - k) * 16.667}% 0)`,
                      translate: `${(1 - p) * (k % 2 ? 2400 : -2400)}px 0`,
                    }}
                  >
                    ENACTUS<span style={{ color: HOME.acc }}>.</span>
                  </span>
                );
              })}
          {settled ? (
            <span style={{ position: "absolute", inset: 0 }}>
              ENACTUS
              <span style={{ position: "relative", color: HOME.acc }}>
                .
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "79%",
                    width: 44,
                    height: 44,
                    marginLeft: -22,
                    marginTop: -22,
                    borderRadius: 999,
                    background: HOME.acc,
                    opacity: open > 0 ? 1 : 0,
                    scale: `${1 + open * 100}`,
                  }}
                />
              </span>
            </span>
          ) : null}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 250,
          textAlign: "center",
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: "0.32em",
          color: HOME.muteD,
          opacity: prog(frame, 80, 24) * (1 - open),
        }}
      >
        H.R. COLLEGE · MUMBAI · SINCE 2009
      </div>
    </Scene>
  );
};

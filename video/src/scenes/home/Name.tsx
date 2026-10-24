import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { HOME, SIDE } from "../../theme";
import { Kinetic } from "../../ui/Bits";
import { lerp, prog } from "../../ui/anim";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Lede, display } from "../../ui/Text";

const ROWS: [string, string][] = [
  ["EN", "TREPRENEURIAL"],
  ["ACT", "ION"],
  ["US", ""],
];

// What the name means: the three words fold down to their first letters, then into ENACTUS.
export const Name: React.FC = () => {
  const frame = useCurrentFrame();
  const fold = prog(frame, 92, 28, Easing.bezier(0.65, 0, 0.35, 1));
  const swap = prog(frame, 120, 30);
  return (
    <Scene pal={HOME} tone="deep">
      <AbsoluteFill
        style={{ justifyContent: "center", opacity: 0.5 * (1 - swap) }}
      >
        <Kinetic
          word="ACTION"
          size={330}
          speed={5}
          outline
          color="rgba(255,255,255,.14)"
        />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: SIDE, top: 110 }}>
        <Eyebrow>What the name means</Eyebrow>
      </div>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          paddingLeft: SIDE,
          gap: 8,
          opacity: 1 - swap,
          translate: `0 ${swap * -80}px`,
        }}
      >
        {ROWS.map(([key, rest], i) => {
          const p = prog(frame, 8 + i * 14, 30);
          return (
            <div
              key={key}
              style={{
                ...display(170, 900, {
                  fontStretch: "100%",
                  letterSpacing: "-0.03em",
                }),
                whiteSpace: "nowrap",
                translate: `${(1 - p) * -900}px 0`,
                opacity: p,
              }}
            >
              <span style={{ color: HOME.acc }}>{key}</span>
              <span
                style={{
                  display: "inline-block",
                  verticalAlign: "bottom",
                  overflow: "hidden",
                  maxWidth: `${(1 - fold) * 1500}px`,
                  opacity: 1 - fold * 0.8,
                }}
              >
                {rest.toLowerCase()}
              </span>
            </div>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", gap: 50 }}
      >
        <div
          style={{
            ...display(280, 900, {
              fontStretch: "125%",
              letterSpacing: "-0.045em",
            }),
            opacity: swap,
            scale: `${lerp(frame, [120, 160], [1.3, 1])}`,
          }}
        >
          <span style={{ color: HOME.acc }}>EN</span>ACT
          <span style={{ color: HOME.acc }}>US</span>
          <span style={{ color: HOME.acc }}>.</span>
        </div>
        <Lede delay={140} size={46} style={{ color: "#fff" }}>
          Entrepreneurial. Action. Us. Enactus.
        </Lede>
      </AbsoluteFill>
    </Scene>
  );
};

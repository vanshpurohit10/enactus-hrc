import { HOME, MONO, SIDE, TOP } from "../../theme";
import { Chip, cardStyle } from "../../ui/Bits";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, display } from "../../ui/Text";

const ROWS = [
  [
    "EN",
    "Entrepreneurial:",
    "igniting business innovation with integrity and passion.",
  ],
  [
    "ACT",
    "Action:",
    "the experience of social impact that sparks social enterprise.",
  ],
  [
    "US",
    "Us:",
    "student, academic and business leaders collaborating to create a better world.",
  ],
];

export const Eau: React.FC = () => (
  <Scene pal={HOME} tone="paper">
    <div
      style={{
        position: "absolute",
        left: SIDE,
        right: SIDE,
        top: TOP,
        bottom: TOP,
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <Eyebrow>What is Enactus?</Eyebrow>
      <div
        style={cardStyle(false, {
          overflow: "hidden",
          padding: 0,
          marginTop: 10,
        })}
      >
        {ROWS.map(([key, word, text], i) => (
          <Reveal
            key={key}
            delay={8 + i * 14}
            x={-120}
            y={0}
            style={{
              display: "grid",
              gridTemplateColumns: "400px 1fr",
              alignItems: "center",
              padding: "38px 56px",
              borderTop: i ? "2px solid rgba(0,0,0,.07)" : undefined,
            }}
          >
            <span
              style={display(130, 900, {
                fontStretch: "125%",
                color: HOME.accDeep,
              })}
            >
              {key}
            </span>
            <span style={{ fontSize: 44, lineHeight: 1.3, color: HOME.mute }}>
              <strong style={{ color: HOME.text, fontWeight: 700 }}>
                {word}
              </strong>{" "}
              {text}
            </span>
          </Reveal>
        ))}
      </div>
      <Reveal
        delay={56}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          marginTop: 24,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: HOME.sea,
            marginRight: 12,
          }}
        >
          Triple bottom line
        </span>
        <Chip solid delay={62} size={26}>
          Economic
        </Chip>
        <Chip
          delay={68}
          size={26}
          style={{ background: HOME.ink, color: "#fff", boxShadow: "none" }}
        >
          Social
        </Chip>
        <Chip
          delay={74}
          size={26}
          style={{ background: HOME.ink, color: "#fff", boxShadow: "none" }}
        >
          Environmental
        </Chip>
      </Reveal>
    </div>
  </Scene>
);

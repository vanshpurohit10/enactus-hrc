import { random, useCurrentFrame } from "remotion";
import { HOME, MONO, SIDE } from "../../theme";
import { Counter, cardStyle } from "../../ui/Bits";
import { prog } from "../../ui/anim";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Lede, Words, display } from "../../ui/Text";
import { Chapter, Track } from "../../ui/templates";

export const StoryOpener: React.FC = () => (
  <Scene pal={HOME} tone="deep">
    <Chapter
      n="17"
      kicker="Where we've been"
      title="Seventeen years, one idea at a time."
      photo="team-enactus.jpg"
    />
  </Scene>
);

// 297 villages, lighting up one by one.
const COLS = 18;
const VILLAGES = 297;
const ORDER = Array.from({ length: VILLAGES }, (_, i) => i).sort(
  (a, b) => random(`v${a}`) - random(`v${b}`),
);
const LIT_AT = new Map(ORDER.map((v, k) => [v, k]));

export const Chirag: React.FC = () => {
  const frame = useCurrentFrame();
  const lit = prog(frame, 30, 170) * VILLAGES;
  return (
    <Scene pal={HOME} tone="deep" glow={false}>
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 120,
          width: 860,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <Eyebrow>2009 – 2012 · Our first project</Eyebrow>
        <Words
          delay={6}
          style={display(190, 900, { fontStretch: "125%", color: HOME.acc })}
        >
          Chirag
        </Words>
        <Lede delay={22} size={34}>
          “Light for All”: differently-abled communities assembled, tested and
          maintained solar lamps for villages without grid power. It took us to
          the Enactus World Cup 2012, 3rd among 36 nations, and became the
          Chirag Rural Development Foundation.
        </Lede>
        <Reveal delay={50} style={{ display: "flex", gap: 60, marginTop: 20 }}>
          <div>
            <div style={display(96, 900)}>
              <Counter to={11918} delay={50} dur={150} />
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "0.16em",
                color: HOME.muteD,
                marginTop: 10,
              }}
            >
              HOUSES LIT
            </div>
          </div>
          <div>
            <div style={display(96, 900, { color: HOME.acc })}>
              <Counter to={297} delay={30} dur={170} />
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "0.16em",
                color: HOME.muteD,
                marginTop: 10,
              }}
            >
              VILLAGES
            </div>
          </div>
        </Reveal>
      </div>
      <div
        style={{
          position: "absolute",
          right: SIDE,
          top: 150,
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 30px)`,
          gap: 10,
        }}
      >
        {Array.from({ length: VILLAGES }, (_, v) => {
          const on = Math.max(0, Math.min(1, lit - (LIT_AT.get(v) ?? 0)));
          return (
            <span
              key={v}
              style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                background: on > 0 ? HOME.acc : "rgba(255,255,255,.08)",
                opacity: 0.25 + 0.75 * on,
                boxShadow:
                  on > 0
                    ? `0 0 ${18 * on}px ${4 * on}px ${HOME.acc}88`
                    : undefined,
              }}
            />
          );
        })}
      </div>
    </Scene>
  );
};

const LEGACY = [
  {
    era: "2012 – 2015",
    name: "Aasha",
    text: "Trained women from underprivileged communities as skilled beauty professionals, so they could earn for their families.",
    big: "50+",
    small: "women trained",
  },
  {
    era: "2015",
    name: "The Peach Vibe",
    text: "Aasha's next phase: workplace wellness sessions for companies, delivered by women from the community as massage therapists.",
    big: "2-in-1",
    small: "less stress at work, more jobs for women",
  },
  {
    era: "Earlier",
    name: "Saarthi",
    text: "Literacy and English proficiency for underprivileged communities.",
    big: "ABC",
    small: "language as a way up",
  },
  {
    era: "Earlier",
    name: "Jalvruddhi",
    text: "Low-cost water filters for rural families, sold through community champions trained in the village, with sessions on water conservation.",
    big: "H₂O",
    small: "clean water, run by the village",
  },
  {
    era: "Livelihood",
    name: "Aajeevika",
    text: "“Livelihood”: rural women of Maharashtra trained as seamstresses, making zero-waste bags, scrunchies and pouches from fabric cut-offs.",
    big: "2,000",
    small: "bags sold",
  },
  {
    era: "2024 – 25",
    name: "Samudra Manthan",
    text: "Recycling ghost nets and supporting Mumbai's fishing communities. Its waste-offsetting pilots grew into Project Sanchay.",
    big: "Best Innovation",
    small: "Envision 2025, IIT Roorkee",
  },
];

export const LEGACY_HOLD = 96;
export const LEGACY_MOVE = 22;

export const Legacy: React.FC = () => (
  <Scene pal={HOME} tone="ink">
    <div style={{ position: "absolute", left: SIDE, top: 110 }}>
      <Eyebrow>Where we've been · after Chirag</Eyebrow>
    </div>
    <Track
      count={LEGACY.length}
      cardW={1000}
      hold={LEGACY_HOLD}
      move={LEGACY_MOVE}
      top={210}
      height={760}
      render={(k) => {
        const c = LEGACY[k];
        return (
          <div
            style={cardStyle(true, {
              height: "100%",
              padding: "60px 64px",
              display: "flex",
              flexDirection: "column",
              gap: 28,
            })}
          >
            <div
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: HOME.acc,
              }}
            >
              {c.era}
            </div>
            <div style={display(c.name.length > 12 ? 104 : 124, 900)}>
              {c.name}
            </div>
            <div style={{ fontSize: 38, lineHeight: 1.4, color: HOME.muteD }}>
              {c.text}
            </div>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "baseline",
                gap: 26,
                borderTop: "2px solid rgba(255,255,255,.12)",
                paddingTop: 30,
              }}
            >
              <span
                style={display(c.big.length > 8 ? 60 : 84, 900, {
                  color: HOME.acc,
                  whiteSpace: "nowrap",
                })}
              >
                {c.big}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 24,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: HOME.muteD,
                }}
              >
                {c.small}
              </span>
            </div>
          </div>
        );
      }}
    />
  </Scene>
);

export const LEGACY_SECONDS =
  (LEGACY.length * LEGACY_HOLD + (LEGACY.length - 1) * LEGACY_MOVE + 20) / 30;

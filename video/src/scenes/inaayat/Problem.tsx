import { AbsoluteFill, useCurrentFrame } from "remotion";
import { INAAYAT, MONO, SIDE } from "../../theme";
import { Counter, cardStyle } from "../../ui/Bits";
import { prog } from "../../ui/anim";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { display } from "../../ui/Text";
import { Block, Shout } from "../../ui/templates";

const Girls: React.FC = () => {
  const frame = useCurrentFrame();
  const filled = prog(frame, 30, 70) * 41;
  return (
    <div style={{ position: "absolute", right: SIDE, top: 170, width: 640 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: 16,
        }}
      >
        {Array.from({ length: 100 }, (_, i) => {
          const on = Math.max(0, Math.min(1, filled - i));
          const appear = prog(frame, 4 + (i % 10) + Math.floor(i / 10), 14);
          return (
            <span
              key={i}
              style={{
                aspectRatio: "1",
                borderRadius: 999,
                background: on > 0 ? INAAYAT.acc : "rgba(255,255,255,.12)",
                scale: `${appear * (1 + on * 0.08)}`,
                boxShadow: on > 0 ? `0 0 20px ${INAAYAT.acc}88` : undefined,
              }}
            />
          );
        })}
      </div>
      <Reveal
        delay={60}
        style={{
          marginTop: 40,
          display: "flex",
          alignItems: "baseline",
          gap: 20,
        }}
      >
        <span style={display(120, 900, { color: INAAYAT.acc })}>
          <Counter to={41} delay={30} dur={70} />
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: INAAYAT.muteD,
          }}
        >
          of 100 girls, before their first period
        </span>
      </Reveal>
    </div>
  );
};

export const InaayatGirls: React.FC = () => (
  <Scene pal={INAAYAT} tone="deep">
    <Girls />
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: SIDE }}>
      <Block
        eyebrow="The problem"
        title="41% of girls don't know about periods until they *start.*"
        size={92}
        width={920}
        ledeSize={34}
        lede="Around 41% of girls are unaware of menstruation before their first period, and limited access to hygienic products leads to unsafe practices and infections."
      />
    </AbsoluteFill>
  </Scene>
);

export const InaayatWaste: React.FC = () => (
  <Scene pal={INAAYAT} tone="ink">
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: SIDE }}>
      <Block
        eyebrow="The waste"
        title="Over a billion pads thrown away. Every *month.*"
        size={104}
        width={1000}
        lede="Each one can take 500 years or more to decompose."
      />
    </AbsoluteFill>
    <div
      style={{
        position: "absolute",
        right: SIDE,
        top: 230,
        width: 600,
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      {[
        ["1 billion+", "pads thrown away, every month"],
        ["500+ years", "for each one to decompose"],
      ].map(([big, small], i) => (
        <Reveal key={big} delay={30 + i * 14} x={120} y={0}>
          <div style={cardStyle(true, { padding: "44px 48px" })}>
            <div
              style={display(78, 900, {
                color: INAAYAT.acc,
                whiteSpace: "nowrap",
              })}
            >
              {big}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: INAAYAT.muteD,
                marginTop: 16,
              }}
            >
              {small}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </Scene>
);

const Venn: React.FC = () => {
  const frame = useCurrentFrame();
  const join = prog(frame, 20, 40);
  const circle = (label: string, sub: string, side: -1 | 1) => (
    <div
      style={{
        position: "absolute",
        left: 270 + side * (110 + (1 - join) * 120) - 230,
        top: 0,
        width: 460,
        height: 460,
        borderRadius: 999,
        background: side < 0 ? `${INAAYAT.acc}d0` : `${INAAYAT.sea}d0`,
        mixBlendMode: "multiply",
        display: "grid",
        placeItems: "center",
        opacity: prog(frame, 6, 20),
      }}
    >
      <div
        style={{
          translate: `${side * 105}px 0`,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div style={display(40, 860)}>{label}</div>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
  return (
    <div
      style={{
        position: "absolute",
        right: SIDE,
        top: 290,
        width: 540,
        height: 460,
      }}
    >
      {circle("Awareness", "sessions", -1)}
      {circle("Access", "kits", 1)}
    </div>
  );
};

export const InaayatIdea: React.FC = () => (
  <Scene pal={INAAYAT} tone="paper">
    <Venn />
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: SIDE }}>
      <Block
        eyebrow="The idea"
        title="Inaayat: a *blessing.*"
        size={140}
        width={1000}
        lede="Awareness and access, together. Sessions that end the silence, and reusable kits stitched by women who earn a livelihood from them."
      />
    </AbsoluteFill>
  </Scene>
);

export const TalkPeriod: React.FC = () => (
  <Scene pal={INAAYAT} tone="deep">
    <Shout
      eyebrow="Our series, since 2020"
      rows={["LET'S", "TALK", "PERIOD.", "NO SHAME."]}
      band={1}
      caption="Let's talk period. No shame."
    />
  </Scene>
);

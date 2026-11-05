import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { MONO, SANCHAY, SIDE, TOP } from "../../theme";
import { Photo, cardStyle } from "../../ui/Bits";
import { prog } from "../../ui/anim";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Lede, Words, display } from "../../ui/Text";
import { Cards } from "../../ui/templates";

export const SanchayApproach: React.FC = () => (
  <Scene pal={SANCHAY} tone="paper">
    <Cards
      eyebrow="Our approach"
      title="More than a clean-up drive."
      size={92}
      lede="A clean beach lasts until the next tide. So we built Sanchay around what happens after the plastic is picked up: where it goes, who gets paid, and who pays for it."
      cardH={440}
      cards={[
        {
          k: "01",
          title: "Recover",
          text: "Women waste-pickers and a supervisor clear plastic from the shoreline at Mahim Causeway, with Enactus volunteers on site.",
        },
        {
          k: "02",
          title: "Recycle",
          text: "We sort and segregate it, then send it through our partners to recovery and recycling, where it becomes new products.",
        },
        {
          k: "03",
          title: "Empower",
          text: "The work pays. Waste-pickers earn from every drive, and plastic credits and scrap sales keep the next one funded.",
        },
      ]}
    />
  </Scene>
);

const Outputs: React.FC = () => (
  <AbsoluteFill
    style={{
      background: SANCHAY.sea,
      padding: 50,
      display: "flex",
      flexDirection: "column",
      gap: 28,
      justifyContent: "center",
    }}
  >
    <div
      style={{
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: "0.18em",
        color: SANCHAY.acc2,
      }}
    >
      WHERE IT GOES
    </div>
    {[
      [
        "Raincoats",
        "for Navi Mumbai municipal workers",
        "M14 10h18l6 8-4 4v18H12V22l-4-4zM23 10v30",
      ],
      [
        "Helmets",
        "for Rajasthan Police",
        "M6 30a17 17 0 0 1 34 0zM4 30h38v5H4zM23 13v-4",
      ],
    ].map(([a, b, d], i) => (
      <Reveal key={a} delay={10 + i * 10} x={60} y={0}>
        <div
          style={{
            ...cardStyle(true),
            padding: "34px 36px",
            display: "flex",
            gap: 28,
            alignItems: "center",
          }}
        >
          <svg
            width={74}
            height={74}
            viewBox="0 0 46 46"
            fill="none"
            stroke={SANCHAY.acc}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={d} />
          </svg>
          <div>
            <div style={display(48, 860, { color: "#fff" })}>{a}</div>
            <div style={{ fontSize: 26, color: SANCHAY.muteD, marginTop: 6 }}>
              {b}
            </div>
          </div>
        </div>
      </Reveal>
    ))}
  </AbsoluteFill>
);

export const CreditCard: React.FC<{ delay?: number }> = ({ delay = 6 }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, delay, 34);
  return (
    <AbsoluteFill
      style={{ background: SANCHAY.sea, display: "grid", placeItems: "center" }}
    >
      <div
        style={{
          width: 560,
          borderRadius: 30,
          padding: "40px 44px",
          background: `linear-gradient(135deg, ${SANCHAY.acc} 0%, #ffd866 100%)`,
          color: SANCHAY.accInk,
          rotate: `${(1 - p) * -14}deg`,
          scale: `${0.8 + 0.2 * p}`,
          opacity: p,
          boxShadow: "0 40px 90px -30px rgba(0,0,0,.7)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "0.18em",
          }}
        >
          <span>PLASTIC CREDIT</span>
          <span>SANCHAY</span>
        </div>
        <div style={display(96, 900, { marginTop: 28 })}>₹50</div>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "0.12em",
          }}
        >
          PER CREDIT
        </div>
        <div
          style={{
            marginTop: 26,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          {[
            "Plastic recovered from Mumbai's coast",
            "Sent for recycling through partners",
            "Women waste-pickers paid for the work",
          ].map((t) => (
            <span key={t}>✓ {t}</span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const STEPS: {
  kicker: string;
  title: string;
  text: string;
  visual: React.ReactNode;
  caption?: string;
}[] = [
  {
    kicker: "On the shore",
    title: "Collect",
    text: "A crew of women waste-pickers and a supervisor work the coastline at Mahim Causeway. Our volunteers manage the site and keep count.",
    visual: (
      <Photo
        src="waste-pickers-reti-bunder.jpg"
        zoom={[1.15, 1.02]}
        dur={130}
        style={{ position: "absolute", inset: 0 }}
      />
    ),
    caption: "Mahim Reti Bunder, Mumbai",
  },
  {
    kicker: "At the collection point",
    title: "Sort & segregate",
    text: "What comes off the beach is mixed. We sort it by type so each kind of plastic can go where it will be recovered best.",
    visual: (
      <Photo
        src="sorting-point.jpg"
        zoom={[1.15, 1.02]}
        dur={130}
        style={{ position: "absolute", inset: 0 }}
      />
    ),
    caption: "Sorting at the collection point",
  },
  {
    kicker: "On record",
    title: "Weigh & document",
    text: "Every shift is photographed with a GPS and time stamp, and every bag is weighed, so each kilo can be traced back to the day and place it was recovered.",
    visual: (
      <Photo
        src="bagged-and-logged.jpg"
        zoom={[1.15, 1.02]}
        dur={130}
        style={{ position: "absolute", inset: 0 }}
      />
    ),
    caption: "Bagged and logged",
  },
  {
    kicker: "Through our partners",
    title: "Recycle",
    text: "With Yashlok Welfare Foundation, the plastic goes to recovery and recycling facilities and comes back as useful things: raincoats for municipal workers, helmets for police.",
    visual: <Outputs />,
  },
  {
    kicker: "For companies",
    title: "Credit",
    text: "Companies buy plastic credits for the plastic we recover. That money pays the crew and funds the next drive.",
    visual: <CreditCard />,
  },
];

export const STEP_DUR = 132;
export const STEP_LEAD = 20;
export const SANCHAY_HOW_SECONDS = (STEP_LEAD + STEPS.length * STEP_DUR) / 30;

const Step: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const s = STEPS[i];
  const out = i === STEPS.length - 1 ? 0 : prog(frame, STEP_DUR - 12, 12);
  const wipe = prog(frame, 0, 26);
  return (
    <AbsoluteFill style={{ opacity: 1 - out }}>
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 290,
          width: 820,
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
          <span
            style={display(130, 900, {
              color: SANCHAY.acc,
              fontStretch: "125%",
            })}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 25,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: SANCHAY.muteD,
            }}
          >
            {s.kicker}
          </span>
        </div>
        <Words delay={4} style={display(92, 880)}>
          {s.title}
        </Words>
        <Lede delay={12} size={35}>
          {s.text}
        </Lede>
      </div>
      <div
        style={{
          position: "absolute",
          right: SIDE,
          top: 260,
          width: 760,
          height: 640,
          borderRadius: 34,
          overflow: "hidden",
          clipPath: `inset(0 0 0 ${(1 - wipe) * 100}% round 34px)`,
        }}
      >
        {s.visual}
        {s.caption ? (
          <div
            style={{
              position: "absolute",
              left: 24,
              bottom: 24,
              padding: "12px 20px",
              borderRadius: 99,
              background: "rgba(6,19,32,.8)",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "0.1em",
              color: "#fff",
            }}
          >
            {s.caption}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

export const SanchayHow: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame - STEP_LEAD;
  return (
    <Scene pal={SANCHAY} tone="ink">
      <div
        style={{
          position: "absolute",
          left: SIDE,
          right: SIDE,
          top: TOP - 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <Eyebrow>How it works</Eyebrow>
          <Words
            delay={4}
            style={display(54, 840, { marginTop: 20, whiteSpace: "nowrap" })}
          >
            From the shoreline to a plastic credit.
          </Words>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          {STEPS.map((_, k) => {
            const fill = Math.max(
              0,
              Math.min(1, (t - k * STEP_DUR) / STEP_DUR),
            );
            return (
              <div
                key={k}
                style={{
                  width: 70,
                  height: 8,
                  borderRadius: 8,
                  background: "rgba(255,255,255,.14)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${fill * 100}%`,
                    height: "100%",
                    background: SANCHAY.acc,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Lede
        delay={10}
        size={28}
        style={{ position: "absolute", left: SIDE, top: 1000 - 30 }}
      >
        Five steps, and every one of them is something you can see on the
        ground.
      </Lede>
      {STEPS.map((_, i) => (
        <Sequence
          key={i}
          from={STEP_LEAD + i * STEP_DUR}
          durationInFrames={i === STEPS.length - 1 ? STEP_DUR + 30 : STEP_DUR}
          layout="none"
        >
          <Step i={i} />
        </Sequence>
      ))}
    </Scene>
  );
};

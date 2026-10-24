import { useCurrentFrame } from "remotion";
import { INAAYAT, MONO, SIDE, TOP } from "../../theme";
import { Photo, cardStyle } from "../../ui/Bits";
import { prog } from "../../ui/anim";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Lede, Words, display } from "../../ui/Text";
import { Track } from "../../ui/templates";

const STEPS = [
  {
    k: "01 · Stitch",
    title: "Made by women, for women",
    text: "Reusable sanitary kits are stitched by women from underserved communities, so every kit is also a livelihood.",
    photo: "mhm-women-session.jpg",
  },
  {
    k: "02 · Partner",
    title: "Schools and NGOs",
    text: "We work with schools and NGOs who know the community, from Mumbai's municipal schools to villages in Palghar.",
    photo: "mhm-hands-up.jpg",
  },
  {
    k: "03 · Talk",
    title: "The session",
    text: "A menstrual hygiene session: the biology, hygiene practices, myths against facts, and a space to ask anything.",
    photo: "mhm-smiles.jpg",
  },
  {
    k: "04 · Hand over",
    title: "Kits at the session",
    text: "Kits are given out at the session itself, with a picture guide on how to use and care for them.",
    photo: "kits-distribution-2021.jpg",
  },
  {
    k: "05 · Fund",
    title: "Orders pay for reach",
    text: "Paying orders fund production, while partnerships carry the kits to communities where access is hardest.",
    photo: "",
  },
];

export const HOW_HOLD = 104;
export const HOW_MOVE = 22;
export const HOW_LEAD = 30;
export const HOW_SECONDS =
  (HOW_LEAD + STEPS.length * HOW_HOLD + (STEPS.length - 1) * HOW_MOVE + 10) /
  30;

const Rupee: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
      background: INAAYAT.acc,
    }}
  >
    <span style={display(360, 900, { color: INAAYAT.accInk })}>₹</span>
  </div>
);

export const InaayatHow: React.FC = () => (
  <Scene pal={INAAYAT} tone="ink">
    <div
      style={{
        position: "absolute",
        left: SIDE,
        top: TOP - 10,
        display: "flex",
        alignItems: "baseline",
        gap: 40,
      }}
    >
      <Eyebrow>How it works</Eyebrow>
      <Words delay={4} style={display(64, 840)}>
        Two halves of one project.
      </Words>
    </div>
    <Track
      count={STEPS.length}
      cardW={1300}
      hold={HOW_HOLD}
      move={HOW_MOVE}
      lead={HOW_LEAD}
      top={250}
      height={720}
      render={(k) => {
        const s = STEPS[k];
        return (
          <div
            style={cardStyle(true, {
              height: "100%",
              display: "flex",
              overflow: "hidden",
            })}
          >
            <div
              style={{
                flex: 1,
                padding: "64px 60px",
                display: "flex",
                flexDirection: "column",
                gap: 30,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 28,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: INAAYAT.acc,
                }}
              >
                {s.k}
              </div>
              <div style={display(84, 880)}>{s.title}</div>
              <div
                style={{ fontSize: 38, lineHeight: 1.42, color: INAAYAT.muteD }}
              >
                {s.text}
              </div>
            </div>
            <div style={{ width: 520, position: "relative", flex: "none" }}>
              {s.photo ? (
                <Photo
                  src={s.photo}
                  zoom={[1.1, 1.1]}
                  style={{ position: "absolute", inset: 0 }}
                />
              ) : (
                <Rupee />
              )}
            </div>
          </div>
        );
      }}
    />
  </Scene>
);

const ITEMS: { n: string; label: string; icon: React.ReactNode }[] = [
  {
    n: "×2",
    label: "Shield",
    icon: (
      <path d="M23 6c6 4 11 4 15 4 0 14-4 24-15 30C12 34 8 24 8 10c4 0 9 0 15-4z" />
    ),
  },
  {
    n: "×8",
    label: "Absorbent liner",
    icon: (
      <path d="M12 8h22a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4zM8 18h30M8 28h30" />
    ),
  },
  {
    n: "×1",
    label: "Menstrual chart",
    icon: (
      <path d="M8 10h30v28H8zM8 18h30M16 6v8M30 6v8M14 26h4M22 26h4M30 26h4M14 32h4M22 32h4" />
    ),
  },
  {
    n: "×1",
    label: "Pictorial guide",
    icon: (
      <path d="M8 8h30v30H8zM8 30l9-9 7 7 5-5 9 9M30 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    ),
  },
  {
    n: "×2",
    label: "Soap",
    icon: (
      <path d="M10 18h26a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4zM16 12a3 3 0 1 0 0-1M26 10a2 2 0 1 0 0-1" />
    ),
  },
];

export const InaayatKit: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene pal={INAAYAT} tone="paper">
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 120,
          width: 900,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <Eyebrow>What's in the kit</Eyebrow>
        <Words delay={6} style={display(96, 860)}>
          Everything she needs, in one *pouch.*
        </Words>
        <Lede delay={22} size={33}>
          The original Inaayat kit, made with Days for Girls: two shields, eight
          absorbent liners, a menstrual chart, a pictorial guide and two soaps.
        </Lede>
        <Lede delay={40} size={33}>
          Kits change with the community. For Give Her the Wings 3.0 each kit
          held three reusable pads, an instruction chart in Marathi and a bar of
          soap.
        </Lede>
      </div>
      <div
        style={{
          position: "absolute",
          right: SIDE,
          top: 150,
          width: 640,
          height: 780,
          borderRadius: 60,
          background: INAAYAT.acc,
          padding: 44,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          rotate: `${(1 - prog(frame, 0, 40)) * 8}deg`,
          scale: `${0.85 + 0.15 * prog(frame, 0, 40)}`,
          boxShadow: `0 40px 90px -30px ${INAAYAT.accDeep}`,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "0.18em",
            color: INAAYAT.accInk,
            textAlign: "center",
          }}
        >
          THE INAAYAT KIT
        </div>
        {ITEMS.map((it, i) => (
          <Reveal
            key={it.label}
            delay={20 + i * 9}
            y={30}
            scale={0.8}
            style={{ flex: 1 }}
          >
            <div
              style={{
                height: "100%",
                background: "#fff",
                borderRadius: 26,
                display: "flex",
                alignItems: "center",
                gap: 26,
                padding: "0 32px",
                color: INAAYAT.text,
              }}
            >
              <svg
                width={62}
                height={62}
                viewBox="0 0 46 46"
                fill="none"
                stroke={INAAYAT.accDeep}
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {it.icon}
              </svg>
              <span style={display(40, 780, { flex: 1 })}>{it.label}</span>
              <span style={display(46, 900, { color: INAAYAT.accDeep })}>
                {it.n}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Scene>
  );
};

import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { INAAYAT, MONO, SIDE } from "../../theme";
import { Chip, Photo } from "../../ui/Bits";
import { lerp, prog } from "../../ui/anim";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Lede, Words, display } from "../../ui/Text";
import { Block } from "../../ui/templates";

export const WingsOpener: React.FC = () => (
  <Scene pal={INAAYAT} tone="deep" grid={false} glow={false}>
    <Photo
      src="ghtw-3-team.jpg"
      zoom={[1.18, 1.04]}
      dur={210}
      style={{ position: "absolute", inset: 0, opacity: 0.5 }}
    />
    <AbsoluteFill
      style={{
        background: `linear-gradient(90deg, ${INAAYAT.deep} 15%, ${INAAYAT.deep}66 100%)`,
      }}
    />
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: SIDE }}>
      <Block
        eyebrow="Our flagship campaign"
        title="Give Her the *Wings.*"
        size={170}
        width={1300}
        lede="Once a year we raise funds, prepare a thousand kits and take sessions to villages where most women have never had a reusable option."
      />
    </AbsoluteFill>
  </Scene>
);

const Edition: React.FC<{
  when: string;
  title: string;
  text: string;
  chips: string[];
  big: string;
  bigLabel: string;
}> = ({ when, title, text, chips, big, bigLabel }) => {
  const frame = useCurrentFrame();
  return (
    <Scene pal={INAAYAT} tone="ink">
      <div
        style={{
          position: "absolute",
          right: SIDE - 40,
          top: 190,
          textAlign: "right",
          opacity: prog(frame, 6, 30),
          translate: `${lerp(frame, [0, 240], [60, -20], Easing.linear)}px 0`,
        }}
      >
        <div
          style={display(big.length > 4 ? 170 : 260, 900, {
            fontStretch: "125%",
            color: INAAYAT.acc,
            letterSpacing: "-0.05em",
          })}
        >
          {big}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: INAAYAT.muteD,
            marginTop: 16,
          }}
        >
          {bigLabel}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 0,
          bottom: 0,
          width: 900,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 32,
        }}
      >
        <Eyebrow>{when}</Eyebrow>
        <Words delay={6} style={display(92, 860)}>
          {title}
        </Words>
        <Lede delay={22} size={34}>
          {text}
        </Lede>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 10 }}
        >
          {chips.map((c, i) => (
            <Chip key={c} delay={44 + i * 6} size={22}>
              {c}
            </Chip>
          ))}
        </div>
      </div>
    </Scene>
  );
};

export const WingsCharoti: React.FC = () => (
  <Edition
    when="September 2024 · Charoti, Dahanu"
    title="Where 80% had no proper facilities"
    text="A village visit found that 80% of women in Charoti lacked adequate sanitary facilities. A fundraiser at college raised over ₹2 lakh, and 54 members, with faculty and student volunteers, took 1,000 reusable kits, 2,000 innerwear items and sessions to the village."
    chips={["₹2 lakh+ raised", "54 members", "2,000 innerwear"]}
    big="1,000"
    bigLabel="reusable kits"
  />
);

export const WingsThree: React.FC = () => (
  <Edition
    when="22 September 2025 · GHTW 3.0 · Palghar"
    title="Twenty days, three villages"
    text="Preponed by almost a month, the team found a community, raised funds and prepared over 1,000 kits in 20 days. 31 members ran sessions for girls and women in Dhaniwari, Kasa and Murbad."
    chips={["31 members", "3 villages", "Featured in Mid-day"]}
    big="3.0"
    bigLabel="Give Her the Wings"
  />
);

export const WingsNow: React.FC = () => (
  <Edition
    when="October 2026 · the latest edition"
    title="Back again, with a whole lot of heart"
    text="The campaign returned to the villages this October, with village sessions and reusable kits. The reels are on @projectinaayat."
    chips={["Village sessions", "Reusable kits", "Watch the reels"]}
    big="2026"
    bigLabel="the latest edition"
  />
);

const PARTNERS = [
  "Days for Girls",
  "Bindu",
  "Rainbow Foundation",
  "Alambana Foundation",
  "Tap2Smile",
  "Connect For",
  "Bhumi",
  "Pahile Majhe Kartavya Foundation",
  "The 1% Club",
  "Think India HRC",
  "Help and Feed India",
  "The Period Society",
];

export const InaayatPartners: React.FC = () => (
  <Scene pal={INAAYAT} tone="paper">
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: `0 ${SIDE}px`,
        gap: 70,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Eyebrow style={{ justifyContent: "center" }}>Partners</Eyebrow>
        <Words delay={4} style={display(100, 860, { marginTop: 26 })}>
          Sessions and kits *with*
        </Words>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 22,
          maxWidth: 1560,
        }}
      >
        {PARTNERS.map((p, i) => (
          <Reveal key={p} delay={16 + i * 4} y={30} scale={0.7}>
            <span
              style={{
                display: "inline-block",
                ...display(42, 760, { lineHeight: 1 }),
                padding: "26px 38px",
                borderRadius: 999,
                background: i % 3 === 0 ? INAAYAT.acc : "#fff",
                color: i % 3 === 0 ? "#fff" : INAAYAT.text,
                boxShadow: "0 14px 40px -22px rgba(42,18,34,.5)",
              }}
            >
              {p}
            </span>
          </Reveal>
        ))}
      </div>
    </AbsoluteFill>
  </Scene>
);

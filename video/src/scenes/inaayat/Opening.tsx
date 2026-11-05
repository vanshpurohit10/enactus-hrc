import { INAAYAT, MONO, SIDE } from "../../theme";
import { Chip, cardStyle } from "../../ui/Bits";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Lede, Words, display } from "../../ui/Text";
import { Hero, Stats } from "../../ui/templates";

export const InaayatHero: React.FC = () => (
  <Scene pal={INAAYAT} tone="deep" grid={false} glow={false}>
    <Hero
      photo="mhm-session-aug-2025.jpg"
      eyebrow="Project Inaayat · since 2018"
      title="Periods, without the *silence.*"
      lede="We run menstrual hygiene sessions with schools and NGOs, and hand out reusable sanitary kits stitched by women from underserved communities, right at the session."
      note={"Inaayat · Urdu for “a blessing”"}
      seal={["IIT Roorkee · 2026", "Top 4", "Envision, Mature Stage"]}
      stripLabel="Inaayat"
      strip={[
        "Days for Girls · India's first chapter",
        "Give Her the Wings",
        "Top 4 · Envision 2026, IIT Roorkee",
        "National Award for Women Empowerment",
        "Featured in Mid-day",
        "Red Dot Foundation · 2nd of 105",
      ]}
    />
  </Scene>
);

const UPDATES = [
  ["Oct 2026", "Give Her the Wings, village sessions and kits."],
  ["Mar 2026", "Top 4 in the Mature Stage at Envision, IIT Roorkee."],
  [
    "Feb 2026",
    "Session in Colaba under the Sakhi drive, with Think India HRC.",
  ],
];

export const InaayatLatest: React.FC = () => (
  <Scene pal={INAAYAT} tone="ink">
    <div
      style={{
        position: "absolute",
        left: SIDE,
        top: 120,
        width: 960,
        display: "flex",
        flexDirection: "column",
        gap: 34,
      }}
    >
      <Reveal delay={0} y={0} scale={0.6}>
        <Chip solid size={26}>
          New · October 2026
        </Chip>
      </Reveal>
      <Words delay={6} style={display(100, 860)}>
        Give Her the Wings is back in the *villages.*
      </Words>
      <Lede delay={24} size={36}>
        Our flagship campaign went out again this October: menstrual hygiene
        sessions for girls and women, and reusable kits handed over at the
        session itself. It's more than a campaign. Watch it for yourself.
      </Lede>
      <Reveal delay={50} style={{ display: "flex", gap: 18 }}>
        {[
          "▶  11 Oct 2026 · the campaign",
          "▶  20 Oct 2026 · village diaries",
        ].map((r) => (
          <Chip key={r} size={21} delay={52}>
            {r}
          </Chip>
        ))}
      </Reveal>
    </div>
    <div
      style={{
        position: "absolute",
        right: SIDE,
        top: 170,
        width: 600,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <Eyebrow delay={20}>Latest</Eyebrow>
      {UPDATES.map(([when, what], i) => (
        <Reveal key={when} delay={30 + i * 10} x={100} y={0}>
          <div
            style={cardStyle(true, { padding: "32px 38px", borderRadius: 26 })}
          >
            <div
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: INAAYAT.acc,
              }}
            >
              {when}
            </div>
            <div style={{ fontSize: 34, lineHeight: 1.36, marginTop: 10 }}>
              {what}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </Scene>
);

export const InaayatImpact: React.FC = () => (
  <Scene pal={INAAYAT} tone="sand">
    <Stats
      eyebrow="Project Inaayat"
      title="Eight years of breaking the silence."
      lede="From one project in 2018 to sessions across Mumbai, Palghar and beyond."
      stats={[
        {
          to: 50000,
          suffix: "+",
          label: "Lives impacted",
          text: "Through sessions and kits since 2018.",
        },
        {
          to: 2600,
          label: "Kits in one order",
          text: "Made for Bindu in 2021, for North and Central India.",
        },
        {
          to: 1000,
          label: "Kits per campaign",
          text: "Handed out in each of Give Her the Wings 2024 and 3.0.",
        },
        {
          to: 1200,
          label: "Reusable pads, Nagpur",
          text: "Donated at a tribal police camp in 2025.",
        },
      ]}
    />
  </Scene>
);

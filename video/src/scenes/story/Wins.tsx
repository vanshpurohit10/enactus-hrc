import { useCurrentFrame } from "remotion";
import { HOME, MONO, SIDE, TOP } from "../../theme";
import { Chip, Photo } from "../../ui/Bits";
import { prog } from "../../ui/anim";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Words, display } from "../../ui/Text";
import { Chapter } from "../../ui/templates";

export const WinsOpener: React.FC = () => (
  <Scene pal={HOME} tone="deep">
    <Chapter
      n="10"
      kicker="Wins"
      title="Recognised, from Mumbai to the world."
      photo="ghtw-3-team.jpg"
    />
  </Scene>
);

type Win = { where: string; big: string; text: string; tag?: string };

const WINS: Win[] = [
  {
    where: "Enactus World Cup · 2012",
    big: "3rd of 36 nations",
    text: "Project Chirag represented India on the world stage.",
  },
  {
    where: "Bhavishya Bharat · 2022",
    big: "National Award",
    text: "Best Social Initiative for Women Empowerment, among 186 colleges.",
    tag: "Inaayat + Aajeevika",
  },
  {
    where: "Enactus India Nationals · 2024",
    big: "Top 20 of 60",
    text: "Selected for the Mature Stage competition at Amity University, Delhi.",
  },
  {
    where: "Envision · IIT Roorkee · 2025",
    big: "Best Innovation",
    text: "Top 4 of 478 national teams.",
    tag: "Samudra Manthan",
  },
  {
    where: "TISS · 2025",
    big: "Top 10 of 128",
    text: "Two teams in the Social Business Idea Competition.",
  },
  {
    where: "Enactus India Nationals · 2025",
    big: "Top 20 in India",
    text: "Early Stage category.",
    tag: "Sanchay",
  },
  {
    where: "Envision · IIT Roorkee · 2026",
    big: "Top 4",
    text: "Mature Stage, at E-Summit '26.",
    tag: "Inaayat",
  },
  {
    where: "Red Dot Foundation · Safecity",
    big: "2nd of 105",
    text: "Youth Innovation Challenge, with UN-Habitat and UNICEF among the partners.",
    tag: "Inaayat",
  },
  {
    where: "Enactus India",
    big: "Enactus Cares",
    text: "Winner of the Enactus Cares competition.",
  },
  {
    where: "Navi Mumbai · 2026",
    big: "Recognised by NMMC",
    text: "For our work recovering sea waste.",
    tag: "Sanchay",
  },
];

const WinsPage: React.FC<{ wins: Win[]; first: number }> = ({
  wins,
  first,
}) => (
  <Scene pal={HOME} tone="sand">
    <div
      style={{
        position: "absolute",
        left: SIDE,
        right: SIDE,
        top: TOP - 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Eyebrow>Wins</Eyebrow>
      <span
        style={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 26,
          color: HOME.mute,
        }}
      >
        {String(first + 1).padStart(2, "0")}–
        {String(first + wins.length).padStart(2, "0")} / 10
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        left: SIDE,
        right: SIDE,
        top: 190,
        bottom: 90,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {wins.map((w, i) => (
        <Reveal
          key={w.big}
          delay={6 + i * 10}
          x={140}
          y={0}
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "640px 1fr auto",
            alignItems: "center",
            gap: 44,
            borderTop: "2px solid rgba(0,0,0,.1)",
          }}
        >
          <div style={display(60, 880, { lineHeight: 1.02 })}>{w.big}</div>
          <div>
            <div
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 23,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: HOME.accDeep,
              }}
            >
              {w.where}
            </div>
            <div
              style={{
                fontSize: 31,
                lineHeight: 1.35,
                color: HOME.mute,
                marginTop: 8,
              }}
            >
              {w.text}
            </div>
          </div>
          {w.tag ? (
            <Chip
              delay={16 + i * 10}
              size={20}
              style={{ background: HOME.ink, color: "#fff", boxShadow: "none" }}
            >
              {w.tag}
            </Chip>
          ) : (
            <span />
          )}
        </Reveal>
      ))}
    </div>
  </Scene>
);

export const WinsOne: React.FC = () => (
  <WinsPage wins={WINS.slice(0, 5)} first={0} />
);
export const WinsTwo: React.FC = () => (
  <WinsPage wins={WINS.slice(5)} first={5} />
);

/** All ten wins on one grid, for the short cut. */
export const WinsGrid: React.FC = () => (
  <Scene pal={HOME} tone="sand">
    <div style={{ position: "absolute", left: SIDE, top: TOP }}>
      <Eyebrow>Wins</Eyebrow>
      <Words delay={4} style={display(84, 860, { marginTop: 26 })}>
        Recognised, from Mumbai to the *world.*
      </Words>
    </div>
    <div
      style={{
        position: "absolute",
        left: SIDE,
        right: SIDE,
        bottom: 100,
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 22,
      }}
    >
      {WINS.map((w, i) => (
        <Reveal key={w.big} delay={14 + i * 4} y={50} scale={0.9}>
          <div
            style={{
              height: 270,
              borderRadius: 26,
              background: i === 0 ? HOME.acc : "#fff",
              boxShadow: "0 18px 50px -24px rgba(0,0,0,.25)",
              padding: "28px 26px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={display(44, 880, { lineHeight: 1.04 })}>{w.big}</div>
            <div
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 19,
                lineHeight: 1.45,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: i === 0 ? HOME.accInk : HOME.accDeep,
              }}
            >
              {w.where}
              {w.tag ? (
                <div style={{ color: HOME.mute, marginTop: 6 }}>{w.tag}</div>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </Scene>
);

export const InTheNews: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene pal={HOME} tone="deep">
      <div
        style={{
          position: "absolute",
          left: 240,
          right: 240,
          top: 250,
          bottom: 250,
          background: "#f6f3ea",
          color: "#111",
          borderRadius: 10,
          padding: "70px 90px",
          rotate: `${-2 + prog(frame, 0, 40) * 1}deg`,
          scale: `${0.9 + prog(frame, 0, 40) * 0.1}`,
          opacity: prog(frame, 0, 20),
          boxShadow: "0 50px 120px -30px rgba(0,0,0,.8)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "3px solid #111",
            paddingBottom: 22,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: "0.2em",
            }}
          >
            IN THE NEWS
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: "0.1em",
            }}
          >
            MID-DAY · OCT 2025
          </span>
        </div>
        <Words
          delay={12}
          stagger={2}
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            fontSize: 76,
            lineHeight: 1.12,
            paddingBottom: 20,
          }}
        >
          “HR College students lead ‘Project Inaayat’ to promote menstrual
          hygiene across Maharashtra”
        </Words>
      </div>
    </Scene>
  );
};

export const ProjectsIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const panel = (i: number) => prog(frame, 14 + i * 8, 36);
  const PANELS = [
    {
      photo: "mhm-session-aug-2025.jpg",
      color: "#ff5a7e",
      deep: "#1b0b16",
      kicker: "Project 01 · since 2018 · menstrual health",
      name: "Inaayat",
      text: "Menstrual hygiene sessions with schools and NGOs, and reusable sanitary kits stitched by women from underserved communities. India's first chapter under Days for Girls.",
      stats: [
        ["50,000+", "lives impacted"],
        ["1,000", "kits each Give Her the Wings"],
        ["Top 4", "Envision 2026, IIT Roorkee"],
      ],
      badge: "New · GHTW 2026",
    },
    {
      photo: "shoreline-mahim.jpg",
      color: "#ffc21a",
      deep: "#061320",
      kicker: "Project 02 · since 2025 · ocean plastic",
      name: "Sanchay",
      text: "We recover plastic from Mumbai's coastline, send it for recycling, and create paid work for women waste-pickers. Plastic credits keep it going.",
      stats: [
        ["7,000 kg", "ocean plastic recovered"],
        ["₹1.6 lakh", "revenue from credits and scrap"],
        ["Top 20", "Enactus India Nationals 2025"],
      ],
      badge: "80,000 kg goal",
    },
  ];
  return (
    <Scene pal={HOME} tone="deep">
      <div style={{ position: "absolute", left: SIDE, top: 90 }}>
        <Eyebrow>Our projects</Eyebrow>
        <Words
          delay={4}
          style={display(66, 860, { marginTop: 24, whiteSpace: "nowrap" })}
        >
          Two projects. Real change, on the ground.
        </Words>
      </div>
      <div
        style={{
          position: "absolute",
          left: SIDE,
          right: SIDE,
          top: 270,
          bottom: 80,
          display: "flex",
          gap: 34,
        }}
      >
        {PANELS.map((p, i) => (
          <div
            key={p.name}
            style={{
              flex: 1,
              position: "relative",
              borderRadius: 34,
              overflow: "hidden",
              translate: `0 ${(1 - panel(i)) * (i ? 700 : -700)}px`,
            }}
          >
            <Photo
              src={p.photo}
              zoom={[1.15, 1.02]}
              dur={270}
              style={{ position: "absolute", inset: 0 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(0deg, ${p.deep} 18%, ${p.deep}cc 50%, ${p.deep}33 100%)`,
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 30,
                right: 30,
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "12px 20px",
                borderRadius: 99,
                background: p.color,
                color: "#1a0a10",
              }}
            >
              {p.badge}
            </span>
            <div
              style={{
                position: "absolute",
                left: 50,
                right: 50,
                bottom: 44,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 21,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: p.color,
                }}
              >
                {p.kicker}
              </div>
              <div
                style={display(118, 900, {
                  fontStretch: "120%",
                  color: "#fff",
                })}
              >
                {p.name}
                <span style={{ color: p.color }}>.</span>
              </div>
              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1.4,
                  color: "rgba(255,255,255,.82)",
                }}
              >
                {p.text}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 30,
                  marginTop: 10,
                  borderTop: "1.5px solid rgba(255,255,255,.2)",
                  paddingTop: 22,
                }}
              >
                {p.stats.map(([big, small]) => (
                  <div key={big} style={{ flex: 1 }}>
                    <div
                      style={display(40, 860, {
                        color: "#fff",
                        whiteSpace: "nowrap",
                      })}
                    >
                      {big}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        lineHeight: 1.3,
                        color: "rgba(255,255,255,.7)",
                        marginTop: 6,
                      }}
                    >
                      {small}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Scene>
  );
};

import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { DISPLAY, HOME, MONO, SIDE } from "../../theme";
import { Chip, Marquee, Photo, cardStyle } from "../../ui/Bits";
import { prog } from "../../ui/anim";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Lede, Words, display } from "../../ui/Text";
import { Block, Cards, Collage } from "../../ui/templates";

export const AYear: React.FC = () => (
  <Scene pal={HOME} tone="deep">
    <AbsoluteFill style={{ justifyContent: "center", gap: 46 }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Eyebrow style={{ justifyContent: "center" }}>Life at Enactus</Eyebrow>
        <Words delay={4} style={display(120, 880, { marginTop: 26 })}>
          A year at Enactus *HRC*
        </Words>
      </div>
      <Marquee
        items={[
          "Village campaigns",
          "Beach clean-ups",
          "MHM sessions",
          "Synapse",
          "Nationals",
        ]}
        speed={4.5}
        itemStyle={{
          fontFamily: DISPLAY,
          fontWeight: 880,
          fontStretch: "115%",
          fontSize: 100,
          color: "#fff",
        }}
      />
      <Marquee
        items={[
          "Stalls",
          "Case competitions",
          "Webinars",
          "Icebreakers",
          "Pitches",
        ]}
        speed={4.5}
        reverse
        itemStyle={{
          fontFamily: DISPLAY,
          fontWeight: 880,
          fontStretch: "115%",
          fontSize: 100,
          color: "transparent",
          WebkitTextStroke: `2px ${HOME.acc}`,
        }}
      />
    </AbsoluteFill>
  </Scene>
);

export const LifeAtEnactus: React.FC = () => (
  <Scene pal={HOME} tone="deep" glow={false} grid={false}>
    <Collage
      eyebrow="Life at Enactus"
      title="The people behind the projects."
      lede="Clean-ups at sunrise, village sessions, stalls at every fest, and Synapse, our first one-day intercollegiate conclave with panels, SDG stalls and a case study competition."
      photos={[
        "team-2025.jpg",
        "orientation-stall-2025.jpg",
        "team-on-beach.jpg",
        "team-enactus.jpg",
        "cleanup-drive-partners.jpg",
        "ghtw-3-team.jpg",
        "volunteers-on-site.jpg",
        "mhm-hands-up.jpg",
        "team-with-sacks.jpg",
      ]}
    />
  </Scene>
);

export const Join: React.FC = () => (
  <Scene pal={HOME} tone="deep" grid={false} glow={false}>
    <Photo
      src="team-on-beach.jpg"
      zoom={[1.2, 1.05]}
      dur={300}
      position="50% 60%"
      style={{ position: "absolute", inset: 0, opacity: 0.55 }}
    />
    <AbsoluteFill
      style={{
        background: `linear-gradient(90deg, ${HOME.deep} 20%, ${HOME.deep}55 100%)`,
      }}
    />
    <AbsoluteFill
      style={{ justifyContent: "center", paddingLeft: SIDE, gap: 44 }}
    >
      <Block
        eyebrow="Join us"
        title="Ready to be the *change?*"
        size={150}
        width={1200}
        lede="Whatever your stream, there's a team for you: operations, business development, finance, events. Come for the projects, stay for the people."
      />
      <div style={{ display: "flex", gap: 18 }}>
        <Chip solid delay={50} size={26}>
          Message @enactushrc
        </Chip>
        <Chip delay={56} size={26}>
          Connect on LinkedIn
        </Chip>
      </div>
    </AbsoluteFill>
  </Scene>
);

export const BackTheWork: React.FC = () => (
  <Scene pal={HOME} tone="sand">
    <Cards
      eyebrow="Partner with us"
      title="Sponsor kits. Buy credits. Follow along."
      cardH={430}
      cards={[
        {
          k: "Partner · Inaayat",
          title: "Sponsor menstrual kits",
          text: "About ₹170 a kit, for the next campaign.",
        },
        {
          k: "Partner · Sanchay",
          title: "Buy plastic credits",
          text: "₹50 a credit, for Mumbai's coast.",
        },
        {
          k: "Follow @enactushrc",
          title: "Everything we do, as it happens.",
          text: "Instagram · LinkedIn · YouTube · X",
        },
      ]}
    />
  </Scene>
);

const LINKS = [
  ["Website", "vanshpurohit10.github.io/enactus-hrc"],
  ["Instagram", "@enactushrc · @projectinaayat"],
  ["LinkedIn", "Enactus H.R. College"],
  ["YouTube", "@enactushrcollege4328"],
  ["X", "@EnactusHrc"],
];

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene pal={HOME} tone="deep">
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 120,
          display: "flex",
          alignItems: "center",
          gap: 40,
          opacity: prog(frame, 0, 24),
        }}
      >
        <Img
          src={staticFile("img/enactus-logo.png")}
          style={{
            height: 96,
            background: "#fff",
            borderRadius: 18,
            padding: "10px 18px",
          }}
        />
        <Img
          src={staticFile("img/hr-college-logo.png")}
          style={{
            height: 96,
            width: 96,
            background: "#fff",
            borderRadius: 999,
          }}
        />
      </div>
      <div style={{ position: "absolute", left: SIDE, top: 290, width: 960 }}>
        <Words
          delay={6}
          style={display(150, 900, {
            fontStretch: "125%",
            letterSpacing: "-0.045em",
          })}
        >
          ENACTUS*.*
        </Words>
        <Lede delay={22} size={34} style={{ marginTop: 34 }}>
          Enactus H.R. College is the Enactus chapter of H.R. College of
          Commerce &amp; Economics, Mumbai, and one of 1,600+ Enactus chapters
          worldwide.
        </Lede>
        <Reveal delay={40} style={{ marginTop: 44 }}>
          <div style={display(64, 860, { color: HOME.acc })}>
            At Enactus, you be the change.
          </div>
        </Reveal>
      </div>
      <Reveal
        delay={30}
        x={100}
        y={0}
        style={{ position: "absolute", right: SIDE, top: 270, width: 600 }}
      >
        <div
          style={cardStyle(true, {
            padding: "40px 44px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          })}
        >
          {LINKS.map(([k, v]) => (
            <div key={k}>
              <div
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: HOME.acc,
                }}
              >
                {k}
              </div>
              <div style={{ fontSize: 27, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <div
        style={{
          position: "absolute",
          left: SIDE,
          right: SIDE,
          bottom: 70,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: MONO,
          fontSize: 20,
          letterSpacing: "0.08em",
          color: HOME.muteD,
          opacity: prog(frame, 50, 20),
        }}
      >
        <span>© 2026 Enactus H.R. College</span>
        <span>Photos: Enactus HRC. Enactus logo by Enactus, CC BY-SA 4.0.</span>
      </div>
    </Scene>
  );
};

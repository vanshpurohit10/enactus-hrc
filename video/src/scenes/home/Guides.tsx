import { Img, staticFile } from "remotion";
import { HOME, MONO, SIDE, TOP } from "../../theme";
import { Chip, cardStyle } from "../../ui/Bits";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, display } from "../../ui/Text";

const role: React.CSSProperties = {
  fontFamily: MONO,
  fontWeight: 700,
  fontSize: 25,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: HOME.acc,
  marginTop: 14,
};

export const Guides: React.FC = () => (
  <Scene pal={HOME} tone="deep">
    <div
      style={{
        position: "absolute",
        left: SIDE,
        right: SIDE,
        top: TOP,
        bottom: TOP,
        display: "flex",
        gap: 40,
      }}
    >
      <Reveal delay={4} y={80} style={{ flex: 1.15 }}>
        <div
          style={cardStyle(true, {
            height: "100%",
            padding: 64,
            display: "flex",
            flexDirection: "column",
          })}
        >
          <Eyebrow delay={10}>Guided by</Eyebrow>
          <Reveal delay={18} style={{ marginTop: 60 }}>
            <div style={display(72, 820)}>Dr. Pooja Ramchandani</div>
            <div style={role}>Principal</div>
          </Reveal>
          <Reveal delay={30} style={{ marginTop: 54 }}>
            <div style={display(72, 820)}>Darshit Shah</div>
            <div style={role}>Teacher-in-Charge</div>
          </Reveal>
          <Reveal
            delay={44}
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              gap: 26,
            }}
          >
            <Img
              src={staticFile("img/hr-college-logo.png")}
              style={{
                width: 92,
                height: 92,
                borderRadius: 999,
                background: "#fff",
              }}
            />
            <span style={{ fontSize: 34, lineHeight: 1.35, color: HOME.muteD }}>
              H.R. College of Commerce &amp; Economics, Mumbai.
            </span>
          </Reveal>
        </div>
      </Reveal>
      <Reveal delay={16} y={80} style={{ flex: 1 }}>
        <div
          style={{
            ...cardStyle(true),
            background: HOME.acc,
            boxShadow: "none",
            color: HOME.accInk,
            height: "100%",
            padding: 64,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Eyebrow delay={22} color={HOME.accInk}>
            Run by students
          </Eyebrow>
          <div style={display(96, 880, { marginTop: 60 })}>
            Teams that run it like a company
          </div>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            {["Operations", "Business Development", "Finance", "Events"].map(
              (d, i) => (
                <Chip
                  key={d}
                  delay={50 + i * 7}
                  size={25}
                  style={{
                    background: HOME.ink,
                    color: "#fff",
                    boxShadow: "none",
                  }}
                >
                  {d}
                </Chip>
              ),
            )}
          </div>
        </div>
      </Reveal>
    </div>
  </Scene>
);

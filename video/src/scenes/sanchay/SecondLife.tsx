import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { MONO, SANCHAY, SIDE } from "../../theme";
import { Counter, cardStyle } from "../../ui/Bits";
import { prog } from "../../ui/anim";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Lede, Words, display } from "../../ui/Text";
import { Block, Cards } from "../../ui/templates";

const Story: React.FC<{
  when: string;
  title: string;
  text: string;
  icon: string;
  label: string;
}> = ({ when, title, text, icon, label }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, 0, 40, Easing.spring({ damping: 13, mass: 0.7 }));
  return (
    <Scene pal={SANCHAY} tone="sand">
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 230,
          width: 560,
          height: 560,
          borderRadius: 999,
          background: SANCHAY.sea,
          display: "grid",
          placeItems: "center",
          scale: `${p}`,
        }}
      >
        <svg
          width={300}
          height={300}
          viewBox="0 0 46 46"
          fill="none"
          stroke={SANCHAY.acc}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={icon} />
        </svg>
        <div
          style={{
            position: "absolute",
            bottom: -30,
            padding: "16px 28px",
            borderRadius: 99,
            background: SANCHAY.acc,
            color: SANCHAY.accInk,
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 820,
          right: SIDE,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <Eyebrow>{when}</Eyebrow>
        <Words delay={6} style={display(88, 860)}>
          {title}
        </Words>
        <Lede delay={20} size={34}>
          {text}
        </Lede>
      </div>
    </Scene>
  );
};

export const SecondLifeOpener: React.FC = () => (
  <Scene pal={SANCHAY} tone="paper">
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: SIDE }}>
      <Block
        eyebrow="Second life"
        title="Sea waste, back in *service.*"
        size={150}
        width={1500}
        lede="Plastic that once threatened marine life now protects the people who keep our cities running."
      />
    </AbsoluteFill>
  </Scene>
);

export const Raincoats: React.FC = () => (
  <Story
    when="14 July 2025 · Navi Mumbai"
    title="Raincoats for municipal workers"
    text="With Yashlok Welfare Foundation, we gave raincoats made from recycled sea-waste plastic to Navi Mumbai Municipal Corporation workers. The team was felicitated by Commissioner Dr. Kailash Shinde and Mr. Kishore Bhatija of Inorbit Malls and K Raheja Group."
    icon="M14 10h18l6 8-4 4v18H12V22l-4-4zM23 10v30"
    label="RECYCLED SEA-WASTE PLASTIC"
  />
);

export const Helmets: React.FC = () => (
  <Story
    when="October 2025 · Waves to Wheels"
    title="Helmets for Rajasthan Police"
    text="Through the “Waves to Wheels” CSR project by IIFL Foundation and Yashlok Welfare Foundation, Rajasthan Police received ISI-certified helmets made from recycled ocean and land plastic. The clean-ups behind them were run by Enactus H.R. College students."
    icon="M6 30a17 17 0 0 1 34 0zM4 30h38v5H4zM23 13v-4"
    label="ISI-CERTIFIED HELMETS"
  />
);

export const Revenue: React.FC = () => {
  const frame = useCurrentFrame();
  const bar = prog(frame, 50, 50);
  const rows = [
    {
      name: "Plastic credits",
      sub: "3,000 credits × ₹50 each",
      value: "₹1,50,000",
      share: 150000 / 160000,
    },
    {
      name: "Plastic scrap sales",
      sub: "Recovered material sold on",
      value: "₹10,000",
      share: 10000 / 160000,
    },
  ];
  return (
    <Scene pal={SANCHAY} tone="deep">
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 0,
          bottom: 0,
          width: 760,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Block
          eyebrow="Business model"
          title="Collection is only the *beginning.*"
          size={96}
          width={760}
          ledeSize={34}
          lede="For Sanchay to grow, it has to pay for itself. Two revenue streams connect recovering plastic with earning from it."
        />
      </div>
      <Reveal
        delay={20}
        x={120}
        y={0}
        style={{ position: "absolute", right: SIDE, top: 170, width: 820 }}
      >
        <div style={cardStyle(true, { padding: "54px 56px" })}>
          <div
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: SANCHAY.muteD,
            }}
          >
            Reported revenue so far
          </div>
          <div style={display(150, 900, { color: SANCHAY.acc, marginTop: 14 })}>
            ₹<Counter to={1.6} decimals={1} delay={26} dur={50} />
            <span style={{ fontSize: 70, color: "#fff" }}> lakh</span>
          </div>
          <div
            style={{
              display: "flex",
              height: 26,
              borderRadius: 99,
              overflow: "hidden",
              marginTop: 34,
              background: "rgba(255,255,255,.08)",
            }}
          >
            <div
              style={{
                width: `${rows[0].share * bar * 100}%`,
                background: SANCHAY.acc,
              }}
            />
            <div
              style={{
                width: `${rows[1].share * bar * 100}%`,
                background: SANCHAY.acc2,
              }}
            />
          </div>
          {rows.map((r, i) => (
            <div
              key={r.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                marginTop: 34,
                opacity: prog(frame, 60 + i * 10, 20),
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: i ? SANCHAY.acc2 : SANCHAY.acc,
                  flex: "none",
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={display(40, 800)}>{r.name}</div>
                <div
                  style={{ fontSize: 25, color: SANCHAY.muteD, marginTop: 4 }}
                >
                  {r.sub}
                </div>
              </div>
              <div style={display(50, 880)}>{r.value}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </Scene>
  );
};

export const WhyPartner: React.FC = () => (
  <Scene pal={SANCHAY} tone="ink">
    <Cards
      eyebrow="Why companies partner with us"
      title="Plastic credits are our main revenue stream."
      size={92}
      lede="Every credit funds recovery, sorting and the people who do it."
      cardH={380}
      cardTitle={38}
      cards={[
        {
          k: "01 · CSR",
          title:
            "Meet CSR goals with impact you can point to on Mumbai's coast.",
          text: "",
        },
        {
          k: "02 · Footprint",
          title:
            "Show real environmental responsibility for your plastic footprint.",
          text: "",
        },
        {
          k: "03 · People",
          title:
            "Help empower women and underprivileged communities through paid work.",
          text: "",
        },
      ]}
    />
  </Scene>
);

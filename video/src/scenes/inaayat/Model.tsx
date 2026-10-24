import { INAAYAT, MONO, SIDE } from "../../theme";
import { Counter } from "../../ui/Bits";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Words, display } from "../../ui/Text";
import { Cards } from "../../ui/templates";

export const InaayatModel: React.FC = () => (
  <Scene pal={INAAYAT} tone="sand">
    <Cards
      eyebrow="Business model"
      title="Three ways a kit reaches someone."
      size={96}
      lede="Paying orders fund production, while partnerships carry our reach to communities where access is hardest."
      cardH={400}
      cards={[
        {
          k: "01 · Community",
          title: "Distribution with NGOs",
          text: "Kits go out through NGO partners, at sessions, to the people who need them most.",
        },
        {
          k: "02 · B2B",
          title: "Corporates and institutions",
          text: "Partnerships and bulk orders, like the ₹4.15 lakh order for 2,600 kits from Bindu in 2021.",
        },
        {
          k: "03 · D2C",
          title: "Direct to you",
          text: "Anyone can buy a kit, and every sale keeps the production centre stitching.",
        },
      ]}
    />
  </Scene>
);

const COSTS = [
  { to: 170, label: "to make one kit" },
  { to: 5000, label: "fixed cost per order" },
  { to: 10, label: "of fixed cost per kit, depending on order size" },
];

export const InaayatCosts: React.FC = () => (
  <Scene pal={INAAYAT} tone="ink">
    <div style={{ position: "absolute", left: SIDE, top: 130 }}>
      <Eyebrow>Business model</Eyebrow>
      <Words delay={4} style={display(110, 860, { marginTop: 28 })}>
        What a kit *costs.*
      </Words>
    </div>
    <div
      style={{
        position: "absolute",
        left: SIDE,
        right: SIDE,
        top: 440,
        display: "flex",
        gap: 40,
      }}
    >
      {COSTS.map((c, i) => (
        <Reveal
          key={c.label}
          delay={16 + i * 12}
          y={80}
          style={{
            flex: 1,
            borderTop: `5px solid ${INAAYAT.acc}`,
            paddingTop: 34,
          }}
        >
          <div style={display(108, 900, { whiteSpace: "nowrap" })}>
            <span style={{ color: INAAYAT.muteD, fontSize: 70 }}>≈ </span>₹
            <Counter to={c.to} delay={20 + i * 12} dur={50} />
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: INAAYAT.muteD,
              marginTop: 22,
              lineHeight: 1.5,
            }}
          >
            {c.label}
          </div>
        </Reveal>
      ))}
    </div>
  </Scene>
);

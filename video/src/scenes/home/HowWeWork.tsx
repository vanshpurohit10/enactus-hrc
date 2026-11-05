import { AbsoluteFill } from "remotion";
import { HOME, MONO, SIDE } from "../../theme";
import { Counter } from "../../ui/Bits";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { display } from "../../ui/Text";
import { Block, Cards } from "../../ui/templates";

export const HowWeWork: React.FC = () => (
  <Scene pal={HOME} tone="sand">
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: SIDE }}>
      <Block
        eyebrow="How we work"
        title="Not charity. A business that *lasts.*"
        size={140}
        width={1150}
        lede="We work with communities at the grassroots and build sustainable business models with them. Our projects have reached more than seven states."
      />
    </AbsoluteFill>
    <Reveal
      delay={40}
      scale={0.6}
      y={0}
      style={{
        position: "absolute",
        right: SIDE,
        top: 330,
        width: 420,
        textAlign: "center",
      }}
    >
      <div
        style={display(300, 900, {
          fontStretch: "125%",
          color: HOME.accDeep,
          letterSpacing: "-0.05em",
        })}
      >
        <Counter to={7} delay={44} dur={40} />+
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: HOME.sea,
          marginTop: 18,
        }}
      >
        States reached
      </div>
    </Reveal>
  </Scene>
);

const Icon: React.FC<{ d: string }> = ({ d }) => (
  <svg
    width={56}
    height={56}
    viewBox="0 0 46 46"
    fill="none"
    stroke={HOME.accDeep}
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

export const Steps: React.FC = () => (
  <Scene pal={HOME} tone="sand">
    <Cards
      eyebrow="How we work"
      title="Not charity. A business that lasts."
      size={84}
      cardH={480}
      cards={[
        {
          k: "01",
          title: "Find a need",
          text: "Visit the community first. Our Charoti visit found 80% of women without adequate sanitary facilities.",
          icon: (
            <Icon d="M20 32a12 12 0 1 1 0-24 12 12 0 0 1 0 24zM29 29l10 10" />
          ),
        },
        {
          k: "02",
          title: "Build the model",
          text: "Design a product or service that pays for itself: kits, credits, products people want to buy.",
          icon: <Icon d="M8 38V20l15-12 15 12v18zM18 38V26h10v12" />,
        },
        {
          k: "03",
          title: "Run it together",
          text: "The community does the work and earns from it: stitching kits, recovering plastic.",
          icon: (
            <Icon d="M15 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM31 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM5 38c0-7 4-12 10-12s10 5 10 12M21 38c0-7 4-12 10-12s10 5 10 12" />
          ),
        },
        {
          k: "04",
          title: "Measure and grow",
          text: "Count the kilos, the kits and the lives, then take it further each year.",
          icon: <Icon d="M6 34 18 22l8 8 14-16M30 14h10v10" />,
        },
      ]}
    />
  </Scene>
);

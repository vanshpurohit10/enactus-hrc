import { AbsoluteFill, Easing, random, useCurrentFrame } from "remotion";
import { DISPLAY, SANCHAY, SIDE } from "../../theme";
import { Marquee, Photo } from "../../ui/Bits";
import { lerp, prog } from "../../ui/anim";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Words, display } from "../../ui/Text";
import { Block, Hero, Shout, Stats } from "../../ui/templates";

export const SanchayHero: React.FC = () => (
  <Scene pal={SANCHAY} tone="deep" grid={false} glow={false}>
    <Hero
      photo="shoreline-mahim.jpg"
      position="50% 30%"
      eyebrow="Project Sanchay · Enactus H.R. College"
      title="From sea waste to *second* *life.*"
      lede="We pull plastic off Mumbai's coastline, send it to be recycled, and create paid work for the women waste-pickers who recover it."
      seal={[
        "Enactus India · 2025",
        "Top 20",
        "National Exposition, Early Stage",
      ]}
      stripLabel="Worked with & recognised by"
      strip={[
        "Yashlok Welfare Foundation",
        "Navi Mumbai Municipal Corporation",
        "Enactus India Nationals 2025",
        "E-Summit · IIT Roorkee",
        "IFAT India 2025",
        "H.R. College of Commerce & Economics",
      ]}
    />
  </Scene>
);

export const SanchayImpact: React.FC = () => (
  <Scene pal={SANCHAY} tone="sand">
    <Stats
      eyebrow="Project Sanchay"
      title="What one student team has done so far."
      lede="The numbers so far, from our drives on Mumbai's coast and the credits that fund them."
      stats={[
        {
          to: 7000,
          suffix: "kg",
          label: "Ocean plastic recovered",
          text: "Taken off the shoreline and sent for recycling.",
        },
        {
          to: 6,
          label: "Clean-up drives",
          text: "Run on Mumbai's coast with our partners.",
        },
        {
          to: 5,
          label: "Women waste-pickers",
          text: "Employed on our drives and recognised for their work.",
        },
        {
          to: 3000,
          label: "Plastic credits sold",
          text: "To companies offsetting their plastic footprint.",
        },
      ]}
    />
  </Scene>
);

export const Washes: React.FC = () => (
  <Scene pal={SANCHAY} tone="deep">
    <AbsoluteFill style={{ justifyContent: "center", gap: 40 }}>
      <div style={{ paddingLeft: SIDE, marginBottom: 30 }}>
        <Eyebrow>Sea waste</Eyebrow>
        <Words delay={4} style={display(96, 860, { marginTop: 26 })}>
          What washes up on Mumbai's *shore*
        </Words>
      </div>
      <Marquee
        items={[
          "PET bottles",
          "Chip packets",
          "Carry bags",
          "Ghost nets",
          "Slippers",
          "Thermocol",
        ]}
        speed={4}
        itemStyle={{
          fontFamily: DISPLAY,
          fontWeight: 880,
          fontStretch: "115%",
          fontSize: 110,
          color: "#fff",
        }}
      />
      <Marquee
        items={[
          "Food wrappers",
          "Straws",
          "Cups",
          "Rope",
          "Sachets",
          "Bottle caps",
        ]}
        speed={4}
        reverse
        itemStyle={{
          fontFamily: DISPLAY,
          fontWeight: 880,
          fontStretch: "115%",
          fontSize: 110,
          color: "transparent",
          WebkitTextStroke: `2px ${SANCHAY.acc2}`,
        }}
      />
    </AbsoluteFill>
  </Scene>
);

// Waves along the bottom of the frame, with bits of plastic riding them.
const Sea: React.FC = () => {
  const frame = useCurrentFrame();
  const layers = [0, 1, 2];
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      {layers.map((l) => {
        const base = 760 + l * 70;
        const pts = Array.from({ length: 49 }, (_, i) => {
          const x = (i / 48) * 1920;
          const y =
            base + Math.sin(i / 3.2 + frame / (22 - l * 4) + l) * (22 - l * 4);
          return `L${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(" ");
        return (
          <path
            key={l}
            d={`M0,1080 ${pts} L1920,1080 Z`}
            fill={l === 0 ? SANCHAY.sea : l === 1 ? "#0e2d46" : SANCHAY.ink}
            opacity={0.95}
          />
        );
      })}
      {Array.from({ length: 16 }, (_, i) => {
        const x =
          ((random(`bx${i}`) * 1920 + frame * (0.6 + random(`bs${i}`))) %
            2000) -
          40;
        const y = 780 + random(`by${i}`) * 200 + Math.sin(frame / 14 + i) * 10;
        const colors = [SANCHAY.acc, SANCHAY.acc2, "#ffffff", "#ff7a59"];
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={14 + random(`bw${i}`) * 30}
            height={8 + random(`bh${i}`) * 12}
            rx={4}
            fill={colors[i % colors.length]}
            opacity={0.85}
            transform={`rotate(${Math.sin(frame / 20 + i) * 25} ${x} ${y})`}
          />
        );
      })}
    </svg>
  );
};

export const Drifts: React.FC = () => (
  <Scene pal={SANCHAY} tone="deep" glow={false}>
    <Sea />
    <div style={{ position: "absolute", left: SIDE, top: 120, width: 1300 }}>
      <Block
        eyebrow="The problem · 7,000 kg gathered so far"
        title="Plastic doesn't disappear. It *drifts.*"
        size={120}
        width={1300}
        ledeSize={36}
        lede="Plastic is one of the most widely used materials today. Thrown away carelessly, it washes into drains, creeks and the sea, where it can stay for hundreds of years."
      />
    </div>
  </Scene>
);

export const Unseen: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene pal={SANCHAY} tone="ink">
      <Photo
        src="waste-pickers-reti-bunder.jpg"
        zoom={[1.2, 1.05]}
        dur={210}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 860,
          clipPath: `inset(0 0 0 ${(1 - prog(frame, 0, 40)) * 100}%)`,
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", paddingLeft: SIDE }}>
        <Block
          eyebrow="The people"
          title="And the people who clean it up go *unseen.*"
          size={100}
          width={840}
          ledeSize={36}
          lede="Our waste system leans on waste-pickers, yet their work is rarely valued or fairly paid."
        />
      </AbsoluteFill>
    </Scene>
  );
};

export const Gather: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene pal={SANCHAY} tone="sand">
      <div
        style={{
          position: "absolute",
          right: SIDE - 20,
          top: 170,
          fontFamily: '"Tiro Devanagari Hindi", serif',
          fontSize: 330,
          lineHeight: 1.2,
          color: SANCHAY.sea,
          opacity: prog(frame, 0, 40) * 0.95,
          translate: `0 ${lerp(frame, [0, 240], [40, -30], Easing.linear)}px`,
        }}
      >
        संचय
      </div>
      <AbsoluteFill style={{ justifyContent: "center", paddingLeft: SIDE }}>
        <Block
          eyebrow="The idea"
          title="Sanchay: to *gather.*"
          size={140}
          width={1000}
          ledeSize={36}
          lede="What if pulling plastic out of the sea could also create livelihoods? That's Project Sanchay. We gather the plastic, send it to be recycled, and turn the work into income."
        />
      </AbsoluteFill>
    </Scene>
  );
};

export const EveryKilo: React.FC = () => (
  <Scene pal={SANCHAY} tone="deep">
    <Shout
      eyebrow="Why we keep records"
      rows={["EVERY", "SINGLE", "KILO", "COUNTS."]}
      band={1}
      caption="Every single kilo counts."
    />
  </Scene>
);

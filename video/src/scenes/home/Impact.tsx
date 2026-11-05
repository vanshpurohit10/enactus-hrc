import { HOME } from "../../theme";
import { Scene } from "../../ui/Scene";
import { Stats } from "../../ui/templates";

export const HomeImpact: React.FC = () => (
  <Scene pal={HOME} tone="sand">
    <Stats
      eyebrow="Our impact"
      title="Seventeen years of entrepreneurial action."
      lede="Every project starts with a community and ends with a business that can run without us."
      stats={[
        {
          to: 17,
          suffix: "years",
          label: "Of projects",
          text: "Since Project Chirag in 2009.",
        },
        {
          to: 50000,
          suffix: "+",
          label: "Lives impacted",
          text: "By Project Inaayat since 2018.",
        },
        {
          to: 7000,
          suffix: "kg",
          label: "Ocean plastic recovered",
          text: "By Project Sanchay from Mumbai's coast.",
        },
        {
          to: 297,
          label: "Villages lit",
          text: "By the solar lamps of Project Chirag.",
        },
      ]}
    />
  </Scene>
);

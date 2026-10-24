import { HOME } from "../../theme";
import { Scene } from "../../ui/Scene";
import { Hero } from "../../ui/templates";

export const HomeHero: React.FC = () => (
  <Scene pal={HOME} tone="deep" grid={false} glow={false}>
    <Hero
      photo="ghtw-3-team.jpg"
      eyebrow="Enactus H.R. College · Mumbai"
      title="At Enactus, you be *the* *change.*"
      titleSize={136}
      lede="We're the Enactus chapter of H.R. College of Commerce & Economics. Since 2009, our students have built small, sustainable businesses with communities, so the change keeps going after we leave."
      seal={["Enactus World Cup · 2012", "3rd", "among 36 nations"]}
      stripLabel="Recognised at"
      strip={[
        "Enactus World Cup 2012",
        "Enactus India Nationals",
        "National Award for Women Empowerment",
        "E-Summit · IIT Roorkee",
        "TISS Social Business Idea Competition",
        "Red Dot Foundation",
        "Featured in Mid-day",
        "Recognised by NMMC",
      ]}
    />
  </Scene>
);

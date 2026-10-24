import { INAAYAT } from "../../theme";
import { Estimator, rupees } from "../../ui/Estimator";
import { Scene } from "../../ui/Scene";

export const InaayatSponsor: React.FC = () => (
  <Scene pal={INAAYAT} tone="deep" grid={false} glow={false}>
    <Estimator
      photo="ghtw-3-team.jpg"
      eyebrow="Sponsor kits"
      title="Give her the *wings.*"
      lede="Fund kits for the next campaign, order them for your institution, or partner with us for sessions. Every kit is also a day's work for the women who stitch it."
      question="How many kits?"
      unit="kits"
      min={50}
      max={2000}
      step={50}
      to={500}
      lines={(n) => [
        ["Estimated order", rupees(n * 170 + 5000)],
        ["That's per kit", rupees((n * 170 + 5000) / n)],
      ]}
      note="An estimate from our costs: about ₹170 per kit plus about ₹5,000 fixed per order."
      ctas={["Message @projectinaayat", "Follow on Instagram"]}
    />
  </Scene>
);

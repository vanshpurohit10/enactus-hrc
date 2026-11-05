import { useCurrentFrame } from "remotion";
import { MONO, SANCHAY, SIDE } from "../../theme";
import { Counter } from "../../ui/Bits";
import { prog } from "../../ui/anim";
import { Estimator, rupees } from "../../ui/Estimator";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { display } from "../../ui/Text";
import {
  Block,
  Cards,
  Collage,
  Moment,
  Quote,
  Timeline,
} from "../../ui/templates";
import { JOURNEY_PAGE } from "../inaayat/Journey";

const PAGES: Moment[][] = [
  [
    {
      date: "May – Jun 2025",
      title: "Groundwork at Mahim",
      text: "Three pilot phases at Mahim Causeway and Reti Bunder, run with Yashlok Welfare Foundation under our Samudra Manthan project, tested the waste-offsetting model that Sanchay grew from. Over 650 kg of sea waste was collected and sent for recycling.",
    },
    {
      date: "Jul 2025",
      title: "Project Sanchay begins",
      text: "Sanchay launches as a waste-offsetting initiative. On 14 July, raincoats made from recycled sea-waste plastic are handed to Navi Mumbai Municipal Corporation workers.",
    },
    {
      date: "2 Aug 2025",
      title: "Top 20 in India",
      text: "At the Enactus India National Exposition 2025, Sanchay was selected among the top 20 projects nationwide in the Early Stage category.",
      tag: "Enactus India Nationals",
    },
  ],
  [
    {
      date: "9 – 11 Oct 2025",
      title: "IFAT India 2025",
      text: "Two volunteers represented Sanchay at the Bombay Exhibition Centre, meeting global organisations on recycling, funding and QR-based waste tracking.",
    },
    {
      date: "Oct 2025",
      title: "Waves to Wheels",
      text: "Clean-ups by Enactus H.R. College students feed the IIFL Foundation and Yashlok Welfare Foundation project that turns ocean plastic into helmets for Rajasthan Police.",
    },
    {
      date: "29 Oct – 17 Nov 2025",
      title: "15 days on the coast",
      text: "Sanchay operations at Mahim Causeway: 4 workers and a supervisor, with 5 Enactus volunteers overseeing every day.",
    },
  ],
  [
    {
      date: "23 Dec 2025",
      title: "Sanchay goes public",
      text: "A beach clean-up and awareness drive at Girgaon Chowpatty with over 200 students from MSPT and VBMM schools.",
    },
    {
      date: "Feb 2026",
      title: "Top 40 at IIT Roorkee",
      text: "At Envision 2026, part of E-Summit '26, Sanchay was among the top 40 teams invited to present, from more than 490 colleges.",
      tag: "E-Summit · IIT Roorkee",
    },
    {
      date: "Mar 2026",
      title: "Recognised by NMMC",
      text: "Navi Mumbai Municipal Corporation recognised Enactus HRC for its work under Project Sanchay.",
    },
  ],
  [
    {
      date: "Next 12 months",
      title: "80,000 kg",
      text: "Our target: recover and recycle over 80,000 kg of plastic waste.",
    },
  ],
];

export const SANCHAY_JOURNEY_SECONDS = (PAGES.length * JOURNEY_PAGE) / 30;

export const SanchayJourney: React.FC = () => (
  <Scene pal={SANCHAY} tone="ink">
    <Timeline
      eyebrow="Our journey"
      title="From a pilot on one beach to a national stage."
      pages={PAGES}
      pageDur={JOURNEY_PAGE}
    />
  </Scene>
);

export const SanchayGallery: React.FC = () => (
  <Scene pal={SANCHAY} tone="deep" glow={false} grid={false}>
    <Collage
      eyebrow="In action"
      title="Sanchay, on the ground."
      lede="Shifts on the shore, the bags, the people."
      photos={[
        "cleanup-drive-partners.jpg",
        "volunteers-on-site.jpg",
        "team-with-sacks.jpg",
        "sorting-point.jpg",
        "bagged-and-logged.jpg",
        "waste-pickers-reti-bunder.jpg",
        "ifat-india-2025.jpg",
        "shoreline-mahim.jpg",
        "team-on-beach.jpg",
      ]}
    />
  </Scene>
);

export const Goal: React.FC = () => {
  const frame = useCurrentFrame();
  const done = prog(frame, 60, 40) * (7000 / 80000);
  return (
    <Scene pal={SANCHAY} tone="deep">
      <div style={{ position: "absolute", left: SIDE, top: 120 }}>
        <Block
          eyebrow="What's next"
          title="Eleven times bigger, in one *year.*"
          size={104}
          width={1500}
          ledeSize={36}
          lede="We've recovered 7,000 kg. Over the next 12 months we aim to recover and recycle more than 80,000 kg of plastic waste."
        />
      </div>
      <Reveal
        delay={30}
        style={{ position: "absolute", left: SIDE, right: SIDE, bottom: 120 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: "0.16em",
              color: SANCHAY.muteD,
            }}
          >
            GOAL · NEXT 12 MONTHS
          </div>
          <div style={display(150, 900, { color: SANCHAY.acc })}>
            <Counter to={80000} delay={34} dur={60} />
            <span style={{ fontSize: 60, color: "#fff" }}> kg</span>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            height: 40,
            borderRadius: 99,
            background: "rgba(255,255,255,.1)",
            marginTop: 30,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${done * 100}%`,
              height: "100%",
              background: SANCHAY.acc2,
              borderRadius: 99,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: "0.12em",
            color: SANCHAY.acc2,
            marginTop: 16,
            opacity: prog(frame, 80, 20),
          }}
        >
          7,000 KG DONE
        </div>
      </Reveal>
    </Scene>
  );
};

export const SanchayNext: React.FC = () => (
  <Scene pal={SANCHAY} tone="ink">
    <Cards
      eyebrow="What's next"
      title="Capacity, people, partners."
      cardH={430}
      cards={[
        {
          k: "01 · Capacity",
          title: "Our own Material Recovery Facility",
          text: "An MRF set up with Yashlok Welfare Foundation, so we can sort and manage far more recovered plastic.",
        },
        {
          k: "02 · People",
          title: "A waste-picker network across Mumbai",
          text: "More crews, more shorelines, and steady paid work for the people who recover the plastic.",
        },
        {
          k: "03 · Partners",
          title: "More companies on board",
          text: "Corporates ready to take responsibility for their plastic footprint through credits.",
        },
      ]}
    />
  </Scene>
);

export const SanchayQuote: React.FC = () => (
  <Scene pal={SANCHAY} tone="deep">
    <Quote
      text="We want a system where plastic waste is treated as a resource, not something to throw away, and where the people who recover it get greater opportunities."
      by="Team Sanchay · Enactus HRC"
    />
  </Scene>
);

export const SanchayPartner: React.FC = () => (
  <Scene pal={SANCHAY} tone="deep" grid={false} glow={false}>
    <Estimator
      photo="team-with-sacks.jpg"
      eyebrow="Partner with us"
      title="Make your plastic footprint *count.*"
      lede="Buy plastic credits, sponsor a clean-up, or bring Sanchay into your CSR plan. Real change happens when environmental sustainability and social impact work together."
      question="How many plastic credits?"
      unit="credits"
      min={100}
      max={10000}
      step={100}
      to={500}
      lines={(n) => [["At ₹50 per credit", rupees(n * 50)]]}
      ctas={["Message us on Instagram", "Connect on LinkedIn"]}
    />
  </Scene>
);

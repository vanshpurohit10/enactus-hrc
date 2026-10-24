import { INAAYAT } from "../../theme";
import { Scene } from "../../ui/Scene";
import { Cards, Collage, Moment, Quote, Timeline } from "../../ui/templates";

const PAGES: Moment[][] = [
  [
    {
      date: "Apr 2018",
      title: "Inaayat begins",
      text: "Launched as India's first chapter under Days for Girls International, to make reusable menstrual hygiene kits and run awareness sessions.",
    },
    {
      date: "2019",
      title: "On the national stage",
      text: "The Inaayat menstrual hygiene campaign, and Inaayat presented at Enactus India Nationals 2019 alongside Aajeevika.",
    },
    {
      date: "2020",
      title: "Let's talk period",
      text: "Periodicals, an IGTV series on menstrual health, and Period Party, a month of webinars with founders and menstrual coaches.",
    },
  ],
  [
    {
      date: "2020 – 21",
      title: "2nd of 105 projects",
      text: "Runner-up at the Youth Innovation Challenge hosted by Red Dot Foundation–Safecity, with UN-Habitat and UNICEF among its partners.",
      tag: "Red Dot Foundation",
    },
    {
      date: "May 2021",
      title: "2,600 kits for Bindu",
      text: "A ₹4.15 lakh order: 2,600 kits from our rural production centre, distributed across North and Central India.",
    },
    {
      date: "Sep 2022",
      title: "National Award",
      text: "Best Social Initiative for Women Empowerment at Bhavishya Bharat, among 186 colleges, for Inaayat and Aajeevika.",
      tag: "National Award",
    },
  ],
  [
    {
      date: "Sep 2024",
      title: "Give Her the Wings, Charoti",
      text: "1,000 reusable kits and 2,000 innerwear items for a village where 80% of women lacked adequate sanitary facilities.",
    },
    {
      date: "Jan – Feb 2025",
      title: "Nagpur",
      text: "1,200 reusable sanitary pads donated at a tribal police camp in Nagpur.",
    },
    {
      date: "Sep 2025",
      title: "Give Her the Wings 3.0",
      text: "1,000 kits and sessions across Dhaniwari, Kasa and Murbad in Palghar, covered by Mid-day in October.",
    },
  ],
  [
    {
      date: "Feb 2026",
      title: "Sakhi drive, Colaba",
      text: "A menstrual hygiene session in Colaba with Think India HRC.",
    },
    {
      date: "Mar 2026",
      title: "Top 4 at IIT Roorkee",
      text: "Inaayat placed in the Top 4 of the Mature Stage at Envision, E-Summit '26.",
      tag: "Envision · IIT Roorkee",
    },
    {
      date: "Oct 2026",
      title: "Give Her the Wings 2026",
      text: "The flagship campaign, back in the villages.",
    },
  ],
];

export const JOURNEY_PAGE = 186;
export const INAAYAT_JOURNEY_SECONDS = (PAGES.length * JOURNEY_PAGE) / 30;

export const InaayatJourney: React.FC = () => (
  <Scene pal={INAAYAT} tone="ink">
    <Timeline
      eyebrow="Our journey"
      title="From one idea in 2018 to a national stage."
      pages={PAGES}
      pageDur={JOURNEY_PAGE}
    />
  </Scene>
);

export const InaayatGallery: React.FC = () => (
  <Scene pal={INAAYAT} tone="deep" glow={false} grid={false}>
    <Collage
      eyebrow="In action"
      title="Sessions, smiles and kits."
      lede="From municipal schools in Mumbai to villages in Palghar."
      photos={[
        "mhm-aug-11-2025.jpg",
        "mhm-hands-up.jpg",
        "mhm-smiles.jpg",
        "mhm-women-session.jpg",
        "kits-distribution-2021.jpg",
        "mhm-session-aug-2025.jpg",
        "ghtw-3-team.jpg",
      ]}
    />
  </Scene>
);

export const InaayatNext: React.FC = () => (
  <Scene pal={INAAYAT} tone="ink">
    <Cards
      eyebrow="What's next"
      title="Where Inaayat goes from here."
      cardH={430}
      cards={[
        {
          k: "01 · Product",
          title: "Biodegradable pads",
          text: "Organic, biodegradable disposable pads, alongside the reusable kits.",
        },
        {
          k: "02 · Schools",
          title: "Stronger school partnerships",
          text: "Sessions that reach girls before their first period, not after.",
        },
        {
          k: "03 · NGOs",
          title: "Deeper NGO collaboration",
          text: "Longer partnerships with the NGOs who carry kits into communities.",
        },
      ]}
    />
  </Scene>
);

export const InaayatQuote: React.FC = () => (
  <Scene pal={INAAYAT} tone="deep">
    <Quote
      text="At Project Inaayat, we believe menstrual care should be built on knowledge, access and dignity."
      by="Team Inaayat · Enactus HRC"
    />
  </Scene>
);

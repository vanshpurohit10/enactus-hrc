import React from "react";
import {
  AYear,
  BackTheWork,
  Join,
  LifeAtEnactus,
  Outro,
} from "./scenes/closing/Closing";
import { About } from "./scenes/home/About";
import { Eau } from "./scenes/home/Eau";
import { Guides } from "./scenes/home/Guides";
import { HomeHero } from "./scenes/home/Hero";
import { HowWeWork, Steps } from "./scenes/home/HowWeWork";
import { HomeImpact } from "./scenes/home/Impact";
import { Intro } from "./scenes/home/Intro";
import { Name } from "./scenes/home/Name";
import { PresidentOne, PresidentTwo } from "./scenes/home/Presidents";
import {
  HOW_SECONDS,
  InaayatHow,
  InaayatKit,
} from "./scenes/inaayat/HowItWorks";
import {
  INAAYAT_JOURNEY_SECONDS,
  InaayatGallery,
  InaayatJourney,
  InaayatNext,
  InaayatQuote,
} from "./scenes/inaayat/Journey";
import { InaayatCosts, InaayatModel } from "./scenes/inaayat/Model";
import {
  InaayatHero,
  InaayatImpact,
  InaayatLatest,
} from "./scenes/inaayat/Opening";
import {
  InaayatGirls,
  InaayatIdea,
  InaayatWaste,
  TalkPeriod,
} from "./scenes/inaayat/Problem";
import { InaayatSponsor } from "./scenes/inaayat/Sponsor";
import {
  InaayatPartners,
  WingsCharoti,
  WingsNow,
  WingsOpener,
  WingsThree,
} from "./scenes/inaayat/Wings";
import {
  SANCHAY_HOW_SECONDS,
  SanchayApproach,
  SanchayHow,
} from "./scenes/sanchay/How";
import {
  Goal,
  SANCHAY_JOURNEY_SECONDS,
  SanchayGallery,
  SanchayJourney,
  SanchayNext,
  SanchayPartner,
  SanchayQuote,
} from "./scenes/sanchay/Journey";
import {
  Drifts,
  EveryKilo,
  Gather,
  SanchayHero,
  SanchayImpact,
  Unseen,
  Washes,
} from "./scenes/sanchay/Opening";
import {
  Helmets,
  Raincoats,
  Revenue,
  SecondLifeOpener,
  WhyPartner,
} from "./scenes/sanchay/SecondLife";
import { BatchRecord, QrNext, Traceability } from "./scenes/sanchay/Trace";
import {
  Chirag,
  LEGACY_SECONDS,
  Legacy,
  StoryOpener,
} from "./scenes/story/Story";
import {
  InTheNews,
  ProjectsIntro,
  WinsOne,
  WinsOpener,
  WinsTwo,
} from "./scenes/story/Wins";

/** How a scene comes in over the one before it. */
export type Enter = "fade" | "slide" | "slideUp" | "wipe" | "iris" | "push";

export type SceneDef = {
  id: string;
  chapter: string;
  component: React.FC;
  seconds: number;
  enter?: Enter;
};

const HRC = "1-Enactus-HRC";
const STORY = "2-Our-story";
const WINS = "3-Wins";
const INAAYAT = "4-Project-Inaayat";
const SANCHAY = "5-Project-Sanchay";
const CLOSING = "6-Join-us";

// The whole film, in order. Durations are what each scene needs to be read.
export const SCENES: SceneDef[] = [
  { id: "Intro", chapter: HRC, component: Intro, seconds: 6 },
  {
    id: "Home-Hero",
    chapter: HRC,
    component: HomeHero,
    seconds: 9.5,
    enter: "fade",
  },
  {
    id: "Home-Impact",
    chapter: HRC,
    component: HomeImpact,
    seconds: 9,
    enter: "wipe",
  },
  {
    id: "Home-Name",
    chapter: HRC,
    component: Name,
    seconds: 7.5,
    enter: "slide",
  },
  {
    id: "Home-About",
    chapter: HRC,
    component: About,
    seconds: 10.5,
    enter: "fade",
  },
  {
    id: "Home-EnActUs",
    chapter: HRC,
    component: Eau,
    seconds: 9,
    enter: "slideUp",
  },
  {
    id: "Home-HowWeWork",
    chapter: HRC,
    component: HowWeWork,
    seconds: 7,
    enter: "wipe",
  },
  {
    id: "Home-Steps",
    chapter: HRC,
    component: Steps,
    seconds: 11,
    enter: "fade",
  },
  {
    id: "Home-Guides",
    chapter: HRC,
    component: Guides,
    seconds: 8,
    enter: "push",
  },
  {
    id: "Home-President-1",
    chapter: HRC,
    component: PresidentOne,
    seconds: 8.5,
    enter: "slide",
  },
  {
    id: "Home-President-2",
    chapter: HRC,
    component: PresidentTwo,
    seconds: 8.5,
    enter: "slide",
  },

  {
    id: "Story-Opener",
    chapter: STORY,
    component: StoryOpener,
    seconds: 4.5,
    enter: "iris",
  },
  {
    id: "Story-Chirag",
    chapter: STORY,
    component: Chirag,
    seconds: 10,
    enter: "fade",
  },
  {
    id: "Story-Legacy",
    chapter: STORY,
    component: Legacy,
    seconds: LEGACY_SECONDS,
    enter: "slide",
  },

  {
    id: "Wins-Opener",
    chapter: WINS,
    component: WinsOpener,
    seconds: 4.5,
    enter: "iris",
  },
  {
    id: "Wins-1",
    chapter: WINS,
    component: WinsOne,
    seconds: 10,
    enter: "wipe",
  },
  {
    id: "Wins-2",
    chapter: WINS,
    component: WinsTwo,
    seconds: 10,
    enter: "slide",
  },
  {
    id: "Wins-News",
    chapter: WINS,
    component: InTheNews,
    seconds: 6,
    enter: "push",
  },
  {
    id: "Projects",
    chapter: WINS,
    component: ProjectsIntro,
    seconds: 10,
    enter: "fade",
  },

  {
    id: "Inaayat-Hero",
    chapter: INAAYAT,
    component: InaayatHero,
    seconds: 9.5,
    enter: "iris",
  },
  {
    id: "Inaayat-Latest",
    chapter: INAAYAT,
    component: InaayatLatest,
    seconds: 9.5,
    enter: "slide",
  },
  {
    id: "Inaayat-Impact",
    chapter: INAAYAT,
    component: InaayatImpact,
    seconds: 9,
    enter: "wipe",
  },
  {
    id: "Inaayat-Girls",
    chapter: INAAYAT,
    component: InaayatGirls,
    seconds: 8.5,
    enter: "fade",
  },
  {
    id: "Inaayat-Waste",
    chapter: INAAYAT,
    component: InaayatWaste,
    seconds: 6.5,
    enter: "slideUp",
  },
  {
    id: "Inaayat-Idea",
    chapter: INAAYAT,
    component: InaayatIdea,
    seconds: 8,
    enter: "wipe",
  },
  {
    id: "Inaayat-TalkPeriod",
    chapter: INAAYAT,
    component: TalkPeriod,
    seconds: 5.5,
    enter: "push",
  },
  {
    id: "Inaayat-How",
    chapter: INAAYAT,
    component: InaayatHow,
    seconds: HOW_SECONDS,
    enter: "fade",
  },
  {
    id: "Inaayat-Kit",
    chapter: INAAYAT,
    component: InaayatKit,
    seconds: 10.5,
    enter: "wipe",
  },
  {
    id: "Inaayat-Model",
    chapter: INAAYAT,
    component: InaayatModel,
    seconds: 10.5,
    enter: "slide",
  },
  {
    id: "Inaayat-Costs",
    chapter: INAAYAT,
    component: InaayatCosts,
    seconds: 6.5,
    enter: "slideUp",
  },
  {
    id: "Inaayat-Wings",
    chapter: INAAYAT,
    component: WingsOpener,
    seconds: 7,
    enter: "iris",
  },
  {
    id: "Inaayat-Wings-2024",
    chapter: INAAYAT,
    component: WingsCharoti,
    seconds: 10,
    enter: "slide",
  },
  {
    id: "Inaayat-Wings-3",
    chapter: INAAYAT,
    component: WingsThree,
    seconds: 8.5,
    enter: "slide",
  },
  {
    id: "Inaayat-Wings-2026",
    chapter: INAAYAT,
    component: WingsNow,
    seconds: 6.5,
    enter: "slide",
  },
  {
    id: "Inaayat-Partners",
    chapter: INAAYAT,
    component: InaayatPartners,
    seconds: 7,
    enter: "wipe",
  },
  {
    id: "Inaayat-Journey",
    chapter: INAAYAT,
    component: InaayatJourney,
    seconds: INAAYAT_JOURNEY_SECONDS,
    enter: "fade",
  },
  {
    id: "Inaayat-Gallery",
    chapter: INAAYAT,
    component: InaayatGallery,
    seconds: 6.5,
    enter: "fade",
  },
  {
    id: "Inaayat-Next",
    chapter: INAAYAT,
    component: InaayatNext,
    seconds: 9.5,
    enter: "slideUp",
  },
  {
    id: "Inaayat-Quote",
    chapter: INAAYAT,
    component: InaayatQuote,
    seconds: 6,
    enter: "fade",
  },
  {
    id: "Inaayat-Sponsor",
    chapter: INAAYAT,
    component: InaayatSponsor,
    seconds: 9.5,
    enter: "wipe",
  },

  {
    id: "Sanchay-Hero",
    chapter: SANCHAY,
    component: SanchayHero,
    seconds: 9.5,
    enter: "iris",
  },
  {
    id: "Sanchay-Impact",
    chapter: SANCHAY,
    component: SanchayImpact,
    seconds: 9,
    enter: "wipe",
  },
  {
    id: "Sanchay-Washes",
    chapter: SANCHAY,
    component: Washes,
    seconds: 5.5,
    enter: "slide",
  },
  {
    id: "Sanchay-Drifts",
    chapter: SANCHAY,
    component: Drifts,
    seconds: 8,
    enter: "fade",
  },
  {
    id: "Sanchay-Unseen",
    chapter: SANCHAY,
    component: Unseen,
    seconds: 6.5,
    enter: "slide",
  },
  {
    id: "Sanchay-Gather",
    chapter: SANCHAY,
    component: Gather,
    seconds: 8,
    enter: "wipe",
  },
  {
    id: "Sanchay-Approach",
    chapter: SANCHAY,
    component: SanchayApproach,
    seconds: 12,
    enter: "slideUp",
  },
  {
    id: "Sanchay-How",
    chapter: SANCHAY,
    component: SanchayHow,
    seconds: SANCHAY_HOW_SECONDS,
    enter: "fade",
  },
  {
    id: "Sanchay-EveryKilo",
    chapter: SANCHAY,
    component: EveryKilo,
    seconds: 5.5,
    enter: "push",
  },
  {
    id: "Sanchay-Trace",
    chapter: SANCHAY,
    component: Traceability,
    seconds: 11.5,
    enter: "wipe",
  },
  {
    id: "Sanchay-Batch",
    chapter: SANCHAY,
    component: BatchRecord,
    seconds: 7.5,
    enter: "slide",
  },
  {
    id: "Sanchay-QR",
    chapter: SANCHAY,
    component: QrNext,
    seconds: 7,
    enter: "fade",
  },
  {
    id: "Sanchay-SecondLife",
    chapter: SANCHAY,
    component: SecondLifeOpener,
    seconds: 5.5,
    enter: "iris",
  },
  {
    id: "Sanchay-Raincoats",
    chapter: SANCHAY,
    component: Raincoats,
    seconds: 9,
    enter: "slide",
  },
  {
    id: "Sanchay-Helmets",
    chapter: SANCHAY,
    component: Helmets,
    seconds: 9,
    enter: "slide",
  },
  {
    id: "Sanchay-Revenue",
    chapter: SANCHAY,
    component: Revenue,
    seconds: 9,
    enter: "wipe",
  },
  {
    id: "Sanchay-WhyPartner",
    chapter: SANCHAY,
    component: WhyPartner,
    seconds: 9,
    enter: "slideUp",
  },
  {
    id: "Sanchay-Journey",
    chapter: SANCHAY,
    component: SanchayJourney,
    seconds: SANCHAY_JOURNEY_SECONDS,
    enter: "fade",
  },
  {
    id: "Sanchay-Gallery",
    chapter: SANCHAY,
    component: SanchayGallery,
    seconds: 6.5,
    enter: "fade",
  },
  {
    id: "Sanchay-Goal",
    chapter: SANCHAY,
    component: Goal,
    seconds: 8,
    enter: "slideUp",
  },
  {
    id: "Sanchay-Next",
    chapter: SANCHAY,
    component: SanchayNext,
    seconds: 9.5,
    enter: "slide",
  },
  {
    id: "Sanchay-Quote",
    chapter: SANCHAY,
    component: SanchayQuote,
    seconds: 7,
    enter: "fade",
  },
  {
    id: "Sanchay-Partner",
    chapter: SANCHAY,
    component: SanchayPartner,
    seconds: 9.5,
    enter: "wipe",
  },

  {
    id: "Closing-Year",
    chapter: CLOSING,
    component: AYear,
    seconds: 6,
    enter: "iris",
  },
  {
    id: "Closing-Life",
    chapter: CLOSING,
    component: LifeAtEnactus,
    seconds: 9,
    enter: "fade",
  },
  {
    id: "Closing-Join",
    chapter: CLOSING,
    component: Join,
    seconds: 8.5,
    enter: "wipe",
  },
  {
    id: "Closing-Partner",
    chapter: CLOSING,
    component: BackTheWork,
    seconds: 8,
    enter: "slideUp",
  },
  {
    id: "Outro",
    chapter: CLOSING,
    component: Outro,
    seconds: 9,
    enter: "fade",
  },
];

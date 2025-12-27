export type PageSections = {
  hero: boolean;
  work: boolean;
  approach: boolean;
  process: boolean;
  contact: boolean;
};

export type HeroVariant = "premium" | "glass" | "chrome" | "stone" | "aurora";

export type TransitionType =
  | "fade"
  | "tv"
  | "slide"
  | "zoom"
  | "curtain"
  | "scan";

export type LoaderName =
  | "spinner"
  | "dots"
  | "pulse"
  | "grid"
  | "orbit"
  | "progress"
  | "morph"
  | "wave"
  | "particle"
  | "glitch";

export type PageStrings = {
  skipLink: string;
  heroScrollHint: string;
  hero: {
    eyebrow: string;
    title: { line1: string; line2: string; emphasis: string };
  };
  loaderTexts: Record<
    LoaderName,
    { title?: string; subtitle?: string; status?: string }
  >;
};

export const pageConfig: {
  wrapperClass: string;
  sections: PageSections;
  defaultHeroVariant: HeroVariant;
  loaderTransitionType: TransitionType;
  strings: PageStrings;
} = {
  // Centralized page wrapper styling
  wrapperClass:
    "bg-[#0A0A0A] text-[#F5F5F0] min-h-screen overflow-x-hidden font-sans antialiased",

  // Toggle sections visibility from one place
  sections: {
    hero: true,
    work: true,
    approach: true,
    process: true,
    contact: true,
  },

  // Centralized UI defaults
  defaultHeroVariant: "premium",
  loaderTransitionType: "tv",

  // Centralized UI strings
  strings: {
    skipLink: "Skip to main content",
    heroScrollHint: "Scroll",
    hero: {
      eyebrow: "Product UI • Systems • Shipping",
      title: {
        line1: "I craft digital",
        line2: "experiences that",
        emphasis: "matter",
      },
    },
    loaderTexts: {
      spinner: { subtitle: "Crafting digital experiences that matter" },
      dots: { subtitle: "Calibrating the fine details" },
      pulse: { subtitle: "Breathing life into the interface" },
      grid: { subtitle: "Arranging a refined layout" },
      orbit: { subtitle: "Orchestrating motion and balance" },
      // Progress loader has multiple inline texts
      progress: { title: "Loading", subtitle: "Shaping excellence", status: "Please wait..." },
      morph: { subtitle: "Shaping ideas with intent" },
      wave: { subtitle: "Harmonizing flow and feel" },
      particle: { subtitle: "Energizing the experience" },
      glitch: { title: "LOADING", subtitle: "Initializing systems" },
    },
  },
};

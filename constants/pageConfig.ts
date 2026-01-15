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
  loaderTransitionType: "slide",

  // Centralized UI strings
  strings: {
    skipLink: "Skip to content",
    heroScrollHint: "Scroll to discover",

    hero: {
      eyebrow: "I Build Products, Not Just Interfaces",
      title: {
        line1: "I turn ideas into",
        line2: "digital products that",
        emphasis: "matter",
      },
    },

    loaderTexts: {
      spinner: {
        subtitle: "Preparing your experience",
      },

      dots: {
        subtitle: "Refining every detail",
      },

      pulse: {
        subtitle: "Bringing clarity and rhythm",
      },

      grid: {
        subtitle: "Creating structure and balance",
      },

      orbit: {
        subtitle: "Aligning form and motion",
      },

      progress: {
        title: "Loading",
        subtitle: "Building something thoughtful",
        status: "Almost ready",
      },

      morph: {
        subtitle: "Shaping ideas into products",
      },

      wave: {
        subtitle: "Smoothing every interaction",
      },

      particle: {
        subtitle: "Adding depth and energy",
      },

      glitch: {
        title: "Loading",
        subtitle: "Getting things ready",
      },
    },
  },
};

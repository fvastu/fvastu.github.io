import { Project } from "./types";

export const projects: Project[] = [
  {
    name: "Base44 Downloader",
    description:
      "A Featured Chrome extension, rated 4.8★ on the Chrome Web Store, that exports Base44 projects to clean JSON or ZIP in one click. Shipped with its own landing site, used by more than 10,000 people.",
    tech: "Chrome Extension (Manifest V3), React, TypeScript",
    outcome: "10,000+ users, Featured on the Chrome Web Store",
    problem:
      "Developers using Base44 struggled to export their projects efficiently. The process required manually opening each file, copying content, and risking missing nested files, leading to inconsistent workflows and time loss.",
    solution:
      "Built a privacy-first Chrome extension that automatically discovers the project structure, extracts file contents, and generates structured JSON or ZIP exports with optional import cleaning for local development — plus a localized landing site that drives installs and migration requests.",
    techStack: [
      "Chrome Extension API (Manifest V3)",
      "Vanilla JavaScript",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "JSZip",
      "Vite",
      "Vercel",
      "i18n",
    ],
    metrics: [
      "10,000+ users across extension and website",
      "4.8★ average rating on the Chrome Web Store",
      "Featured badge on the Chrome Web Store",
    ],
    stats: [
      { value: "10,000+", label: "users" },
      { value: "4.8★", label: "Chrome Web Store" },
      { value: "Featured", label: "by Google" },
    ],
    mockup: "/projects/base44-downloader-preview.webp",
    mockupAlt:
      "Base44 Downloader landing page: export Base44 projects with one click",
    website: "https://base44downloader.vercel.app",
    secondaryLink: {
      label: "Chrome Web Store",
      href: "https://chromewebstore.google.com/detail/base44-downloader/ngbhbpaflbegfjgaibhldjlmmfonpief",
    },
    imagePosition: "top",
  },
  {
    name: "Fantacalcio Champions",
    description:
      "A fantasy football (fantacalcio) platform for the UEFA Champions League: classic rules on the 36-club player list, live market, formations, standings and a three-phase tournament with playoffs.",
    tech: "React, Vite, Supabase, Three.js",
    outcome: "Production fantasy league for the Champions League",
    problem:
      "Running a paid, limited-entry Champions League fantasy league meant juggling spreadsheets, manual vote imports and chat groups. Managers needed one place to sign up, build a squad, follow every matchday and get support fast.",
    solution:
      "Built a prerendered, SEO-first web app on a shared monorepo with Fantasip Mondiale: guided onboarding, transfer market, formation builder, live standings, a 3D customizable kit, an admin Control Room for phases and playoffs, an automated vote pipeline and a Telegram bot for reminders.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite (SSG prerender)",
      "Tailwind CSS 4",
      "Supabase",
      "TanStack Query",
      "Three.js",
      "Framer Motion",
      "Storybook",
      "Vitest",
      "Sentry",
      "Telegram Bot",
    ],
    metrics: [
      "36-club Champions League player list",
      "3-phase tournament with protected playoff transitions",
      "Automated matchday votes & scoring pipeline",
    ],
    mockup: "/projects/fantachampions-preview.webp",
    mockupAlt:
      "Fantacalcio Champions homepage: the classic fantasy football game for the Champions League",
    website: "https://www.fantacalciochampions.it",
    imagePosition: "top",
  },
  {
    name: "Fantasip Mondiale",
    description:
      "A full-stack fantasy soccer platform for international tournaments, featuring real-time scoring, drag-and-drop formation building, transfer markets, and an admin panel for league management.",
    tech: "React, Supabase, Vite, Hono",
    outcome: "Complete fantasy league management system",
    problem:
      "Running fantasy soccer leagues for international tournaments required manual spreadsheets, error-prone score calculations, and disconnected communication channels. There was no dedicated platform for the FANTASIP/MUNDIALSIP ruleset.",
    solution:
      "Built a full-stack platform with automated scoring engine, interactive formation builder with drag-and-drop, real-time transfer market, admin dashboard for league ops, and a Telegram bot for notifications.",
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "Hono",
      "TanStack React Query",
      "Framer Motion",
      "Three.js",
      "Storybook",
      "Zod",
      "Telegram Bot",
    ],
    metrics: [
      "Automated FANTASIP scoring engine",
      "Real-time formation builder with drag-and-drop",
      "Telegram bot integration for notifications",
    ],
    mockup: "/projects/fantasipmondiale-preview.webp",
    mockupAlt:
      "Fantamondiale 2026 by Lega Fantasip: World Cup fantasy football homepage",
    website: "https://www.legafantasip.it",
    imagePosition: "top",
  },
  {
    name: "AgentIA",
    description:
      "An agentic work transformation platform: it maps how work gets done, finds where AI creates measurable value, and lets companies design, govern and measure Human + AI execution — with a multilingual agent marketplace.",
    tech: "Next.js, ML Embeddings, i18n",
    outcome: "Governed AI agents, from discovery to results",
    problem:
      "Finding the right AI agent from hundreds of options was overwhelming and time-consuming. Users needed intelligent search that understood intent, not just keywords, while supporting multiple languages and regions.",
    solution:
      "Developed a marketplace with ML-powered semantic search, full i18n, and a smart shopping cart for easy agent discovery.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "@xenova/transformers",
      "next-intl",
      "Framer Motion",
      "React Hook Form",
      "Zod",
      "Vitest",
    ],
    metrics: [
      "ML-powered semantic search",
      "Full i18n support (EN/IT)",
      "Comprehensive test coverage",
    ],
    mockup: "/projects/agentia-preview.webp",
    mockupAlt:
      "AgentIA homepage: discover processes, keep control, get results, with the organization dashboard",
    website: "https://www.agentia.work",
    imagePosition: "top",
  },
  {
    name: "ExtensionShots",
    description:
      "A Chrome Web Store screenshot generator that turns raw extension screenshots into store-ready visuals with templates, backgrounds, and export-ready formats.",
    tech: "Next.js, React, TypeScript",
    outcome: "Store-ready visuals in under 60 seconds",
    problem:
      "Chrome extension developers struggled with creating polished Web Store listing images. Raw screenshots looked unfinished, key benefits were lost without visual hierarchy, and rebuilding exports for each required format wasted time on every launch.",
    solution:
      "Built a browser-based editor where developers upload a screenshot, pick a template and background, customize text and framing, and export all Chrome Web Store sizes as PNG or ZIP in one click — no Photoshop or account needed.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    metrics: [
      "3 Chrome Web Store export sizes",
      "10+ templates, 26+ backgrounds",
      "Export in under 60 seconds",
    ],
    mockup: "/projects/extensionshots-preview.webp",
    mockupAlt:
      "ExtensionShots editor generating Chrome Web Store screenshots",
    website: "https://extensionshots.vercel.app",
    imagePosition: "center",
  },
  {
    name: "Odino",
    description:
      "A privacy-focused Chrome extension with a production-ready landing page that blocks trackers and verifies protection in real-time.",
    tech: "Chrome Extension API, Next.js, React",
    outcome: "Complete privacy protection solution",
    problem:
      "Users lacked real-time visibility into trackers and had no way to verify their privacy protection was working. Existing solutions were either too technical or didn't provide transparent feedback on what was being blocked.",
    solution:
      "Created a Chrome extension for real-time tracker blocking and a modern landing page with full SEO and security features.",
    techStack: [
      "Chrome Extension API",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
    ],
    metrics: [
      "Real-time tracker blocking",
      "Full SEO & metadata implementation",
      "Production-ready with security headers",
    ],
    mockup: "/projects/odino-preview.jpg",
    mockupAlt:
      "Odino privacy Chrome extension landing page",
    website: "https://odino.vercel.app",
    imagePosition: "center",
  },
  {
    name: "TrmSport Blog",
    description:
      "A modern sports blog platform powered by Sanity CMS and Next.js, featuring a modular page builder, live football standings, newsletter system, and server-side rendering for optimal SEO.",
    tech: "Next.js, Sanity CMS, Tailwind CSS",
    outcome: "High-performance sports content platform",
    problem:
      "Sports content creators needed a fast, SEO-optimized blog that could display live standings, manage rich multimedia content, and scale without heavy infrastructure — all while being easy to edit without developer involvement.",
    solution:
      "Deployed a SanityPress-based platform with embedded Sanity Studio for visual editing, modular page builder, live football standings via API, RSS feed generation, and OG image generation for social sharing.",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Sanity CMS",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
      "Upstash Redis",
      "Vercel",
    ],
    metrics: [
      "Modular page builder with 10+ blocks",
      "Live football standings integration",
      "Auto-generated OG images & RSS feed",
    ],
    mockup: "/projects/trmsport-preview.webp",
    mockupAlt:
      "TrmSport homepage with football, tennis news and live Serie A standings",
    website: "https://www.trmsport.com",
    imagePosition: "top",
  },
  {
    name: "Global Work Innovation Reports",
    description:
      "A platform that captures and analyzes how organizations build trustworthy innovation programs, transforming qualitative insights into structured intelligence.",
    tech: "Next.js, Supabase, Brevo",
    outcome: "Verified partner signals for innovation leaders",
    problem:
      "Innovation teams struggled with unreliable partner signals and subjective inputs that couldn't drive strategic decisions. Traditional reporting was static and disconnected from actionable intelligence.",
    solution:
      "Built a platform to validate partner identity, guide users through structured assessments, and generate dynamic reports with actionable insights.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Radix UI",
      "Brevo",
      "PostgreSQL",
    ],
    metrics: [
      "Domain-verified partner authentication",
      "Structured assessment framework",
      "Dynamic reporting dashboards",
    ],
    mockup: "/projects/global-work-innovation-preview.jpg",
    mockupAlt:
      "Global Work Innovation Reports platform dashboard",
    imagePosition: "top",
  },
  {
    name: "Personal Portfolio Website",
    description:
      "A modern, responsive personal portfolio website featuring animated components, work showcase, and content management through Sanity CMS.",
    tech: "Next.js, TypeScript, Sanity CMS",
    outcome: "Production personal website with CMS",
    problem:
      "Needed a professional online presence that could showcase projects and skills while being easy to maintain and update. Traditional static sites were hard to update, while CMS platforms were too heavy for a personal portfolio.",
    solution:
      "Built a portfolio with Sanity CMS-based content management, theme switching, animations, and SEO optimization.",
    techStack: [
      "Next.js 13",
      "TypeScript",
      "React 18",
      "Tailwind CSS",
      "Sanity CMS",
      "Framer Motion",
      "React Hook Form",
      "EmailJS",
      "next-themes",
    ],
    metrics: [
      "Sanity CMS content management",
      "Dark/Light theme support",
      "SEO optimized with sitemap/RSS",
    ],
    mockup: "/projects/old-portfolio-preview.jpg",
    mockupAlt:
      "Previous personal portfolio website built with Sanity CMS",
    website: "https://fvasturzo.netlify.app",
    imagePosition: "center",
  },
];

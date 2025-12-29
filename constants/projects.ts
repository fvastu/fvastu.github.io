import { Project } from "./types";

export const projects: Project[] = [
  {
    name: "Global Work Innovation Reports",
    description:
      "A platform that captures and analyzes how organizations build trustworthy innovation programs, transforming qualitative insights into structured intelligence.",
    tech: "Next.js, Supabase, Brevo",
    outcome: "Verified partner signals for innovation leaders",
    problem:
      "Innovation teams struggled with unreliable partner signals and subjective inputs that couldn't drive strategic decisions. Traditional reporting was static and disconnected from actionable intelligence.",
    solution:
      "Built a comprehensive platform that validates partner identity via email domain matching, guides users through structured assessments, and generates dynamic reports with pillar summaries and actionable next steps. The approval pipeline ensures trustworthy data while maintaining a simple experience for contributors.",
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
    mockup:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
  },
  {
    name: "AgentIA",
    description:
      "A multilingual AI-powered agent marketplace platform with intelligent semantic search and seamless shopping experience.",
    tech: "Next.js, ML Embeddings, i18n",
    outcome: "Intelligent agent discovery platform",
    problem:
      "Finding the right AI agent from hundreds of options was overwhelming and time-consuming. Users needed intelligent search that understood intent, not just keywords, while supporting multiple languages and regions.",
    solution:
      "Built a sophisticated marketplace using machine learning embeddings for semantic search that truly understands user needs. Integrated full internationalization for English and Italian, a smart shopping cart system, and security features like Cloudflare Turnstile. The platform transforms agent discovery from manual browsing into intelligent recommendations.",
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
    mockup:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
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
      "Developed a full-stack privacy solution consisting of a Chrome extension that actively blocks trackers with real-time verification, paired with a modern landing page built on Next.js 16 and React 19. The landing page features comprehensive SEO optimization, responsive navigation with Framer Motion animations, and production-ready features including security headers, accessibility support, and performance optimizations. Implemented full metadata strategy with Open Graph tags, Twitter cards, and JSON-LD structured data.",
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
    mockup:
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=1200&h=800&fit=crop",
    website: "https://odino.vercel.app",
  },
];

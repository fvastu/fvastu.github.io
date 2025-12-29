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
    testimonial: {
      quote:
        "This platform turned our scattered innovation insights into dependable intelligence we can actually act on.",
      author: "Innovation Leader",
      role: "Strategic Partner",
    },
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
    testimonial: {
      quote:
        "AgentIA's semantic search found exactly what I needed in seconds. The multilingual experience is flawless.",
      author: "Product Manager",
      role: "Enterprise Client",
    },
    metrics: [
      "ML-powered semantic search",
      "Full i18n support (EN/IT)",
      "Comprehensive test coverage",
    ],
    mockup:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
  },
];

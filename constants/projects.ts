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
    mockup:
      "/projects/agentia-preview.jpg",
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
    mockup:
      "/projects/odino-preview.jpg",
    website: "https://odino.vercel.app",
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
    mockup:
      "/projects/old-portfolio-preview.jpg",
    website: "https://fvasturzo.netlify.app",
  },
];

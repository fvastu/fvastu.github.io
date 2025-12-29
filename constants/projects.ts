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
  {
    name: "Meridian",
    description:
      "A financial planning platform that simplifies complex investment decisions into clear, actionable steps.",
    tech: "React, Node.js, PostgreSQL",
    outcome: "40% reduction in user decision time",
    problem:
      "Individual investors struggled with overwhelming financial data, spending hours analyzing options without clear direction. Traditional tools focused on data presentation rather than actionable guidance.",
    solution:
      "Built a platform that transforms complex financial instruments into guided workflows. The system analyzes user goals, risk tolerance, and market conditions to present personalized recommendations with clear reasoning.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "D3.js",
      "Plaid API",
      "TensorFlow.js",
    ],
    testimonial: {
      quote:
        "Meridian turned months of research into a 20-minute decision. The clarity was remarkable.",
      author: "Sarah Chen",
      role: "Early Adopter",
    },
    metrics: [
      "40% faster decision time",
      "85% user satisfaction",
      "2.5x increase in portfolio diversification",
    ],
    mockup:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
  },
  {
    name: "Atelier",
    description:
      "Design collaboration tool that bridges the gap between designers and developers through real-time sync.",
    tech: "Next.js, WebSocket, Figma API",
    outcome: "Used by 200+ design teams",
    problem:
      "Design-to-development handoff was broken. Developers struggled to interpret design files, leading to inconsistencies and endless back-and-forth. Design intent was lost in translation.",
    solution:
      "Created a real-time bridge between Figma and codebases. Automatically generates component specifications, extracts design tokens, and maintains a living style guide that syncs with both design files and production code.",
    techStack: [
      "Next.js",
      "TypeScript",
      "WebSocket",
      "Figma API",
      "Redis",
      "PostgreSQL",
      "Docker",
    ],
    testimonial: {
      quote:
        "Atelier eliminated 80% of our design-dev meetings. Everything just syncs.",
      author: "Marcus Rodriguez",
      role: "Design Lead at TechCorp",
    },
    metrics: [
      "200+ teams onboarded",
      "60% reduction in design QA time",
      "99.2% design token accuracy",
    ],
    mockup:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
  },
  {
    name: "Compass",
    description:
      "Analytics dashboard that transforms raw data into strategic insights for product teams.",
    tech: "TypeScript, D3.js, BigQuery",
    outcome: "Adopted by 3 Fortune 500 companies",
    problem:
      "Product teams drowned in data but starved for insights. Existing analytics tools required SQL expertise and provided no strategic context. Decisions were delayed by weeks of analysis.",
    solution:
      "Built an intelligent dashboard that automatically surfaces anomalies, trends, and opportunities. Natural language queries translate to complex data operations, while AI-driven insights suggest actionable next steps.",
    techStack: [
      "TypeScript",
      "React",
      "D3.js",
      "BigQuery",
      "Python",
      "Apache Kafka",
      "Kubernetes",
    ],
    testimonial: {
      quote:
        "Compass is the first analytics tool that actually helps us make decisions, not just see numbers.",
      author: "Jennifer Park",
      role: "VP Product",
    },
    metrics: [
      "3 Fortune 500 clients",
      "50% faster insight discovery",
      "$2M+ in data-driven optimizations",
    ],
    mockup:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
  },
];

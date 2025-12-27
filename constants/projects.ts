import { Project } from "./types";

export const projects: Project[] = [
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

import { Experience } from "./types";

export const experiences: Experience[] = [
  {
    company: "Prima",
    role: "Senior Software Engineer",
    period: "Oct 2023 - Present",
    duration: "2 yrs 3 mos",
    location: "Remote",
    description:
      "Developing and maintaining multi-market B2C web applications serving 500K+ monthly users across Italy, UK, and Spain.",
    achievements: [
      "Developed multi-market B2C web applications (Italy, UK, Spain) serving 500K+ monthly users using Next.js, Sanity CMS, and internal design system",
      "Designed and implemented data ingestion pipeline using Kafka, Databricks, and Next.js, increasing marketing ROI through improved user profiling",
      "Increased user engagement through A/B testing (LaunchDarkly), improved search with Algolia, and enhanced SEO performance",
      "Improved Core Web Vitals by 50% through code-splitting, lazy loading, image optimization, and accessibility enhancements",
      "Mentored junior engineers on modern frontend practices and cross-functional collaboration",
    ],
    skills: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Sanity CMS",
      "Kafka",
      "Databricks",
      "LaunchDarkly",
      "Algolia",
    ],
  },
  {
    company: "Ermes Browser Security",
    role: "Senior Software Engineer",
    period: "Dec 2021 - Oct 2023",
    duration: "1 yr 11 mos",
    location: "Torino",
    description:
      "Led development of AI-powered web protection solutions, reducing browser threat exposure from days to 2 minutes through behavioral analysis.",
    achievements: [
      "Collaborated closely with Research team to implement innovative AI-driven solutions for web products",
      "Developed and maintained enterprise dashboards for threat monitoring and analytics",
      "Built cross-browser extensions for real-time web protection",
      "Implemented behavioral analysis features that reduced threat detection time by 99%+",
    ],
    skills: [
      "TypeScript",
      "HTML",
      "CSS",
      "Browser Extensions",
      "AI Integration",
    ],
  },
  {
    company: "Leonardo",
    role: "Software Engineer",
    period: "May 2019 - Dec 2021",
    duration: "2 yrs 8 mos",
    location: "Torino, Piemonte, Italia",
    description:
      "Developed Virtual Maintenance Training (VMT) systems with interactive simulations replicating real-life vehicles and devices.",
    achievements: [
      "Developed code for proprietary framework underlying Virtual Maintenance Training platform",
      "Created and integrated multiple models and functionalities for various VMT systems",
      "Built computer-based interactive simulations for vehicle maintenance training",
      "Collaborated on framework architecture decisions and implementation strategies",
    ],
    skills: [
      "JavaScript",
      "C#",
      "Unity",
      "3D Simulation",
      "Framework Development",
    ],
  },
];

export type ProjectStat = {
  value: string;
  label: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  description: string;
  tech: string;
  outcome: string;
  problem: string;
  solution: string;
  techStack: string[];
  testimonial?: { quote: string; author: string; role: string };
  metrics: string[];
  mockup: string;
  mockupAlt: string;
  website?: string;
  secondaryLink?: ProjectLink;
  imagePosition?: "top" | "center";
  /** Headline numbers shown on the card, for projects with real traction. */
  stats?: ProjectStat[];
};

export type ProcessStep = {
  number: string;
  title: string;
  desc: string;
};

export type Experience = {
  company: string;
  companyWebsite: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
  logo?: string;
};

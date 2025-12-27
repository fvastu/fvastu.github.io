export type Project = {
  name: string;
  description: string;
  tech: string;
  outcome: string;
  problem: string;
  solution: string;
  techStack: string[];
  testimonial: { quote: string; author: string; role: string };
  metrics: string[];
  mockup: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  desc: string;
};

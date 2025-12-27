"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AgencyHeroMorphLoopDragOneComponent from "./hero";

type Project = {
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

type HeroProject = {
  name: string;
  outcome: string;
  tech: string;
};

const projects: Project[] = [
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

const Index = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const processSteps = [
    {
      number: "01",
      title: "Understand",
      desc: "Deep dive into the problem space and user needs",
    },
    {
      number: "02",
      title: "Design",
      desc: "Shape the experience with clarity and intention",
    },
    {
      number: "03",
      title: "Build",
      desc: "Craft the product with precision and care",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#0A0A0A] text-[#F5F5F0]min-h-screen overflow-x-hidden font-sans antialiased"
    >
      <AgencyHeroMorphLoopDragOneComponent />

      <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24  max-w-6xl mx-auto ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <span className="text-xs tracking-widest uppercase text-[#555]">
              Selected Work
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-[-0.02em]">
              Products I've shaped
            </h2>
          </motion.div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                variants={fadeInUp}
                onClick={() => setSelectedProject(project)}
                className="group relative border-t border-[#1A1A1A] pt-8 pb-12 cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4">
                    <span className="text-xs text-[#555] tracking-wider">
                      0{index + 1}
                    </span>
                    <h3 className="mt-2 text-2xl md:text-3xl font-light tracking-[-0.01em] group-hover:text-[#C9A86C] transition-colors duration-300">
                      {project.name}
                    </h3>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="text-[#8A8A85] leading-relaxed">
                      {project.description}
                    </p>
                    <p className="mt-4 text-xs text-[#555] tracking-wider">
                      {project.tech}
                    </p>
                  </div>

                  <div className="lg:col-span-3 flex items-start lg:justify-end">
                    <span className="px-4 py-2 text-xs border border-[#2A2A2A] rounded-full text-[#8A8A85]">
                      {project.outcome}
                    </span>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A86C] group-hover:w-full transition-all duration-700"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 border-t border-[#1A1A1A]  max-w-6xl mx-auto ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs tracking-widest uppercase text-[#555]"
          >
            Approach
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-8 text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] tracking-[-0.02em]"
          >
            I focus on building digital products that are{" "}
            <span className="text-[#C9A86C]">clear</span>,{" "}
            <span className="text-[#C9A86C]">usable</span>, and aligned with{" "}
            <span className="text-[#C9A86C]">real user needs</span>.
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-xl text-[#8A8A85] font-light"
          >
            Technology is a tool, not the goal.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 border-t border-[#1A1A1A]  max-w-6xl mx-auto ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs tracking-widest uppercase text-[#555]"
          >
            Process
          </motion.span>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              {
                number: "01",
                title: "Understand",
                desc: "Deep dive into the problem space and user needs",
              },
              {
                number: "02",
                title: "Design",
                desc: "Shape the experience with clarity and intention",
              },
              {
                number: "03",
                title: "Build",
                desc: "Craft the product with precision and care",
              },
            ].map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="group"
              >
                <span className="text-6xl md:text-7xl font-extralight text-[#1A1A1A] group-hover:text-[#2A2A2A] transition-colors duration-500">
                  {step.number}
                </span>
                <h3 className="mt-6 text-xl font-light tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[#8A8A85] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 border-t border-[#1A1A1A]  max-w-6xl mx-auto ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-2xl"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-[-0.02em]"
          >
            Have an idea or product worth building?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-xl text-[#8A8A85] font-light"
          >
            Let's explore it together.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-12">
            <button className="group relative px-10 py-5 bg-[#C9A86C] rounded-full overflow-hidden transition-all duration-500 hover:bg-[#D4B87A]">
              <span className="relative z-10 text-sm tracking-widest uppercase font-medium text-[#0A0A0A]">
                Get in touch
              </span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-[#333] hover:border-[#C9A86C] transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={selectedProject.mockup}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
              <div className="absolute bottom-8 left-8 md:left-12">
                <h2 className="text-4xl md:text-5xl font-light tracking-[-0.02em]">
                  {selectedProject.name}
                </h2>
                <p className="mt-2 text-[#C9A86C] text-sm tracking-wider uppercase">
                  Case Study
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <span className="text-xs tracking-widest uppercase text-[#555]">
                    The Problem
                  </span>
                  <p className="mt-4 text-[#8A8A85] leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>
                <div>
                  <span className="text-xs tracking-widest uppercase text-[#555]">
                    The Solution
                  </span>
                  <p className="mt-4 text-[#8A8A85] leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#1A1A1A] pt-8">
                <span className="text-xs tracking-widest uppercase text-[#555]">
                  Impact
                </span>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedProject.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-[#1A1A1A] rounded-lg"
                    >
                      <p className="text-2xl font-light text-[#C9A86C]">
                        {metric.split(" ")[0]}
                      </p>
                      <p className="mt-2 text-sm text-[#8A8A85]">
                        {metric.split(" ").slice(1).join(" ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#1A1A1A] pt-8">
                <span className="text-xs tracking-widest uppercase text-[#555]">
                  Technology Stack
                </span>
                <div className="mt-6 flex flex-wrap gap-3">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm border border-[#2A2A2A] rounded-full text-[#8A8A85] hover:border-[#C9A86C] hover:text-[#C9A86C] transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#1A1A1A] pt-8">
                <span className="text-xs tracking-widest uppercase text-[#555]">
                  Client Feedback
                </span>
                <blockquote className="mt-6 p-6 md:p-8 border-l-2 border-[#C9A86C] bg-[#0F0F0F]">
                  <p className="text-lg md:text-xl font-light leading-relaxed text-[#F5F5F0]">
                    "{selectedProject.testimonial.quote}"
                  </p>
                  <footer className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                      <span className="text-sm font-medium text-[#C9A86C]">
                        {selectedProject.testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {selectedProject.testimonial.author}
                      </p>
                      <p className="text-xs text-[#555]">
                        {selectedProject.testimonial.role}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;

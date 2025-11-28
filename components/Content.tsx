import React from "react";
import ProjectCard from "./ProjectCard";

interface Project {
  tech: string;
  images: string[];
  name: string;
  subtitle?: string;
  url: string;
  scrollClass?: string;
  displacement?: string;
  dribbble?: string;
  github?: string;
}

interface ContentProps {
  bio: string;
  description: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  projects: Project[];
}

/**
 * Main content section for the homepage.
 */
const Content: React.FC<ContentProps> = ({
  bio,
  description,
  email,
  githubUrl,
  linkedinUrl,
  projects,
}) => (
  <main className="container" role="main">
    <section className="section-projects" aria-labelledby="about-heading">
      <h1 id="about-heading" className="heading-1">
        <span>so...Who am I</span>
        <small role="img" aria-label="question mark">
          ❓
        </small>
      </h1>
      <h2 className="section-contact__h2">{bio}</h2>
    </section>
    <section
      id="sectionProjects"
      className="section-projects"
      aria-labelledby="projects-heading"
    >
      <h1 id="projects-heading" className="heading-1">
        <span>Yeah, I work hard </span>
        <small role="img" aria-label="briefcase">
          💼
        </small>
      </h1>
      <p className="paragraph">
        Each project is unique. Here are some of my works.
      </p>
      {projects.map((project, idx) => (
        <ProjectCard project={project} key={idx} />
      ))}
    </section>
    <section className="section-contact" aria-labelledby="contact-heading">
      <h1 id="contact-heading" className="heading-1">
        <span>Sold Yet? </span>
        <small role="img" aria-label="call me hand">
          🤙
        </small>
      </h1>
      <h2 className="section-contact__h2">
        {description}
        <a
          href={`mailto:${email}`}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Send me an email"
        >
          &nbsp; email{" "}
          <span role="img" aria-label="email icon">
            📧
          </span>
        </a>
        .
      </h2>
    </section>
    <section className="section-socials" aria-labelledby="socials-heading">
      <h1 id="socials-heading" className="heading-1">
        <span>Dont be a stranger!</span>
        <small role="img" aria-label="waving hand">
          👋
        </small>
      </h1>
      <p className="paragraph">Connect with me online</p>
      <div className="section-socials--links">
        <a
          href={githubUrl}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Follow me on GitHub"
        >
          <span role="img" aria-label="alien monster">
            👾
          </span>{" "}
          GitHub
        </a>
        <a
          href={linkedinUrl}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Connect with me on LinkedIn"
        >
          <span role="img" aria-label="briefcase">
            💼
          </span>{" "}
          LinkedIn
        </a>
      </div>
    </section>
  </main>
);

export default Content;

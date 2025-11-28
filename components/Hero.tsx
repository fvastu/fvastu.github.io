import React from "react";

/**
 * Hero section for the homepage.
 */
const Hero: React.FC = () => (
  <div className="header__hero">
    <div className="header__hero--heading">
      <span>turning ideas into </span> <br />
      <span>real life </span>
      <span className="header__hero--heading-gradient">products </span>
    </div>
    <a
      data-scroll-to
      className="header__hero--cta"
      href="#sectionProjects"
      aria-label="View my projects"
    >
      VIEW PROJECTS
    </a>
  </div>
);

export default Hero;

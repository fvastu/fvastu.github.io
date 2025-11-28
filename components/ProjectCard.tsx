import React from "react";

interface ProjectCardProps {
  project: {
    tech: string;
    images: string[];
    name: string;
    subtitle?: string;
    url: string;
    scrollClass?: string;
    displacement?: string;
    dribbble?: string;
    github?: string;
  };
}

/**
 * ProjectCard component displays a single project with images, tech, and links.
 * @param project - Project data object
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="project-card">
    <div className="project-card__left">
      <h4 className="heading-4">{project.tech}</h4>
    </div>
    <div
      className="project-card__middle"
      data-displacement={project.displacement || "webp/myDistorsionImage.webp"}
    >
      {project.images?.map((img, i) => (
        <img src={img} alt={project.name + " image"} key={i} />
      ))}
    </div>
    <div className="project-card__right">
      <h2
        data-scroll
        data-scroll-offset="35%"
        data-scroll-repeat={true}
        data-scroll-class={project.scrollClass}
        className="heading-2"
      >
        {project.name}
        {project.subtitle && (
          <>
            <br />
            {project.subtitle}
          </>
        )}
      </h2>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={project.url}
        className="project-card__link"
        aria-label={`Visit ${project.name} website`}
      >
        VISIT THE WEBSITE
      </a>
      <div className="project-card__socials">
        {project.dribbble && (
          <a
            href={project.dribbble}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} on Dribbble`}
          >
            <img src="svg/dribble.svg" alt="Dribbble icon" />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} source code on GitHub`}
          >
            <img src="svg/github.svg" alt="GitHub icon" />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default ProjectCard;

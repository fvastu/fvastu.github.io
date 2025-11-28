import React from "react";

interface FooterProps {
  githubUrl: string;
}

/**
 * Footer section for the homepage.
 */
const Footer: React.FC<FooterProps> = ({ githubUrl }) => (
  <footer className="footer" role="contentinfo">
    <img src="svg/logo-footer.svg" alt="Francesco Vasturzo logo" />
    <div className="footer__socials">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my GitHub profile"
      >
        <img src="svg/github.svg" alt="GitHub logo" />
      </a>
    </div>
  </footer>
);

export default Footer;

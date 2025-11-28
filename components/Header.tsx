import React from "react";
import Speaker from "./Speaker";
import Hero from "./Hero";
import { Navigation } from "./Navigation/Navigation";

interface HeaderProps {
  speakerState: "muted" | "unmuted";
  onSpeakerToggle: () => void;
  githubUrl: string;
  linkedinUrl: string;
}

/**
 * Header section including hero and footer links.
 */
const Header: React.FC<HeaderProps> = ({
  speakerState,
  onSpeakerToggle,
  githubUrl,
  linkedinUrl,
}) => (
  <div className="header-wrapper">
    <header className="header">
      <Navigation isOpen={false} toggleOpen={() => {}} />
      <Hero />
    </header>
    <div className="header__footer">
      <div className="header__footer--left">
        <Speaker state={speakerState} onToggle={onSpeakerToggle} />
      </div>
      <div className="header__footer--right">
        <a
          href={githubUrl}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Visit my GitHub profile"
        >
          👾 GH
        </a>
        <a
          href={linkedinUrl}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Visit my LinkedIn profile"
        >
          💼 LD
        </a>
      </div>
    </div>
  </div>
);

export default Header;

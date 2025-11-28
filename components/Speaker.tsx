import React from "react";

interface SpeakerProps {
  state: "muted" | "unmuted";
  onToggle: () => void;
}

/**
 * Speaker component for toggling background music.
 * @param state - Current speaker state ('muted' | 'unmuted')
 * @param onToggle - Function to toggle speaker state
 */
const Speaker: React.FC<SpeakerProps> = ({ state, onToggle }) => (
  <div className="speaker">
    <button
      onClick={onToggle}
      className={`speaker__toggle${
        state === "unmuted" ? " speaker__toggle--anim" : ""
      }`}
      aria-label={
        state === "muted" ? "Unmute background music" : "Mute background music"
      }
      aria-pressed={state === "muted"}
    >
      <span className="sr-only">
        {state === "muted" ? "Audio playing" : "Audio muted"}
      </span>
    </button>
    <div className="speaker__muted">
      <img src="svg/muted.svg" alt="muted icon" />
    </div>
    <div className="speaker__unmuted">
      <svg
        width="14"
        height="11"
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.599976"
          y="1.06665"
          width="1.4"
          height="10"
          fill="#F2F2F2"
          className="rect1-anim"
        />
        <rect
          x="9"
          y="1.06665"
          width="1.4"
          height="10"
          fill="#F2F2F2"
          className="rect2-anim"
        />
        <rect
          x="4.79999"
          y="1.06665"
          width="1.4"
          height="10"
          fill="#F2F2F2"
          className="rect3-anim"
        />
      </svg>
    </div>
  </div>
);

export default Speaker;

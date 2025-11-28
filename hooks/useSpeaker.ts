import React from "react";
import { useCallback } from "react";

/**
 * Custom hook to handle speaker state and audio playback.
 * Returns current state and a toggle function.
 */
export function useSpeaker(initialState: "muted" | "unmuted" = "muted") {
  const [speakerState, setSpeakerState] = React.useState<"muted" | "unmuted">(
    initialState
  );

  const toggleSpeaker = useCallback(() => {
    const audio = document.querySelector("#audioPlayer") as HTMLAudioElement;
    if (speakerState === "muted") {
      setSpeakerState("unmuted");
      audio.pause();
    } else {
      setSpeakerState("muted");
      audio.play();
    }
  }, [speakerState]);

  return { speakerState, toggleSpeaker };
}

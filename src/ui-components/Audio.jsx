import { useState, useRef } from "react";
import audioSrc from "../assets/Lily's_world/audio.mp3";

export default function Audio() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null); // direct get the element from dom;

  function toggleMutedButton() {
    setIsMuted(!isMuted);
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  return (
    <div onClick={toggleMutedButton} style={{ cursor: "pointer" }}>
      <i
        className={`fa-solid ${isMuted ? "fa-volume-xmark" : "fa-volume-high"}`}
      ></i>
      <audio ref={audioRef} src={audioSrc} loop />
    </div>
  );
}

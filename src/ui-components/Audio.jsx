import { useEffect, useRef, useState } from "react";

export default function Audio({ audioSrc }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  // Start muted, autoplay will work
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = false; // required for autoplay
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch((e) => {
        console.warn("Autoplay blocked:", e);
      });
    }
  }, []);

  // User manually unmutes
  const toggleMutedButton = () => {
    setIsMuted((prevMuted) => {
      const nextMuted = !prevMuted;
      if (audioRef.current) {
        audioRef.current.muted = nextMuted;
        if (!nextMuted) {
          audioRef.current.play(); // resume if unmuted
        }
      }
      return nextMuted;
    });
  };

  return (
    <div onClick={toggleMutedButton} style={{ cursor: "pointer" }}>
      <i
        className={`fa-solid ${isMuted ? "fa-volume-xmark" : "fa-volume-high"}`}
      ></i>
      <audio ref={audioRef} src={audioSrc} loop />
    </div>
  );
}

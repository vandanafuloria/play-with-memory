import loading from "../assets/Lily's_world/smiling-girl.mp4";
import Audio from "../ui-components/Audio";
import loadingAudio from "../assets/Lily's_world/audio.mp3";

export default function LoadingGame() {
  return (
    <div className="loading">
      <h1>Loading</h1>
      <video src={loading} autoPlay muted loop></video>
      <span>
        <Audio audioSrc={loadingAudio} />
      </span>
    </div>
  );
}

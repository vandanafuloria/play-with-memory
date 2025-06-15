import loading from "../assets/lily/loading.mp4";
import Audio from "../ui-components/Audio";
import loadingAudio from "../assets/lily/loader.mp3";
console.log(loadingAudio);

export default function LoadingGame() {
  return (
    <div className="loading">
      <h1>Welcome to Lily's Adventure!</h1>
      <video src={loading} autoPlay muted loop></video>

      <Audio audioSrc={loadingAudio} />
    </div>
  );
}

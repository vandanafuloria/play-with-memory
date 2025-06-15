import gameBackgound from "../assets/lily/island.mp4";
import Button from "../ui-components/Button";
import lily from "../assets/lily/lily.png";
import Audio from "../ui-components/Audio";
import AudioSrc from "../assets/lily/start.mp3";
import home from "../assets/lily/home.png";
const game =
  "https://w0.peakpx.com/wallpaper/892/115/HD-wallpaper-night-forest-art-fantasy-3d-girl-dark-jungle-trees.jpg";

export default function Game({ onClick }) {
  return (
    <div className="game-page">
      {/* <video src={game} autoPlay muted loop playsInline></video> */}
      <img
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100vh",
        }}
        src={game}
        alt=""
      />
      <div className="main-game">
        <div className="header">
          <h1>Lily's Home</h1>
        </div>

        <div className="intro">
          <div>
            <img src={lily} />
          </div>
          <div>
            <p>
              Hello… I’m Lily. I’m lost in this deep jungle and I’m all alone.
              I’m scared… Will you help me find the way back to my home?
            </p>
            <span>
              Click on the one card that hasn’t been clicked yet. Each correct
              choice takes Lily closer to home — no repeats!
            </span>
          </div>
        </div>
        <div className="levels">
          <button onClick={() => onClick("easy")}>Easy</button>
          <button onClick={() => onClick("medium")}>Medium</button>
          <button onClick={() => onClick("hard")}>Insane</button>
        </div>
      </div>

      <Audio audioSrc={AudioSrc} />
    </div>
  );
}

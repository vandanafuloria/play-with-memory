import gameBackgound from "../assets/Lily's_world/game-page.mp4";
import Button from "../ui-components/Button";
import lily from "../assets/Lily's_world/lily.png";

export default function Game({ onClick }) {
  return (
    <div className="game-page">
      <div className="main-game">
        <div className="intro">
          <div>
            <img src={lily} />
          </div>
          <div>
            <p>
              “Hello… I’m Lily. I’m lost in this deep jungle and I’m all alone.
              I’m scared… Will you help me find the way back to my home?”
            </p>
            <span>
              “Click on the one card that hasn’t been clicked yet. Each correct
              choice takes Lily closer to home — no repeats!”
            </span>
          </div>
        </div>
        <div className="levels">
          <button onClick={onClick}>Easy</button>
          <button onClick={onClick}>Easy</button>
          <button onClick={onClick}>Easy</button>
        </div>
      </div>
      <video src={gameBackgound} autoPlay muted loop></video>
    </div>
  );
}

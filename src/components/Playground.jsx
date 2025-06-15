import { useEffect, useState } from "react";
import background from "../assets/lily/game-page.mp4";
import Card from "../ui-components/Card";
import audio from "../assets/lily/game.mp3";
import Audio from "../ui-components/Audio";

export default function Playground({ pokemonList, onClick, score, bestScore }) {
  const [allFlipped, setAllFlipped] = useState(false);

  const handleCardClick = (id) => {
    setAllFlipped(true); // flip all

    // flip back after 2 seconds
    setTimeout(() => {
      onClick(id); // this will shuffle the cards and reredner
      setAllFlipped(() => false);
    }, 1000);
  };
  return (
    <div className="playground">
      <div className="scores">
        <div>
          <span>Score</span>
          <hr />
          <hr />
          <span>{score}</span>
        </div>
        <div>
          <span>Best Score</span>
          <hr />
          <hr />
          <span>{bestScore}</span>
        </div>
      </div>
      <div className="main-cards">
        {pokemonList.map((poke, id) => {
          return (
            <Card
              key={id}
              name={poke.name}
              frontImg={poke.image}
              isFlipped={allFlipped}
              onClick={() => handleCardClick(poke.id)}
            />
          );
        })}
      </div>
      <video src={background} autoPlay muted loop playsInline></video>

      <Audio audioSrc={audio} />
    </div>
  );
}

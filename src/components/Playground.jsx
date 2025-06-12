import background from "../assets/Lily's_world/game-page.mp4";
import Card from "../Card";

export default function Playground({ pokemonList, onClick, score, bestScore }) {
  console.log(pokemonList, onClick);
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
      <div className="card">
        {pokemonList.map((poke) => {
          console.log(poke);
          return (
            <Card
              name={poke.name}
              img={poke.image}
              onClick={() => onClick(poke.id)}
            />
          );
        })}
      </div>
      <video src={background} autoPlay muted loop playsInline></video>
    </div>
  );
}

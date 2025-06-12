import background from "../assets/Lily's_world/play.mp4";
import Card from "../Card";

export default function Playground({ pokemonList, onClick }) {
  console.log(pokemonList, onClick);
  return (
    <div className="playground">
      <div className="card">
        {pokemonList.map((poke) => {
          console.log(poke);
          return <Card name={poke.name} img={poke.image} onClick={onClick} />;
        })}
      </div>
      <video src={background} autoPlay muted loop></video>
    </div>
  );
}

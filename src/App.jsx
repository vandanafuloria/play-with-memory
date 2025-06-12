import { useState, useEffect, cloneElement } from "react";

import "./App.css";
import Button from "./ui-components/Button";
import Cards from "./Card.jsx";
import ScoreBoard from "./ScoreBoard";
import LoadingGame from "./components/LoadingGame";
import Audio from "./ui-components/Audio";
import Game from "./components/GamePage.jsx";
import Playground from "./components/Playground.jsx";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [checked, setChecked] = useState([]);
  const [lost, setLost] = useState("");
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(false);

  const [playing, setPlaying] = useState(true);

  // whatever clicked once , will save in this array;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setGame(true);
    }, 10000);
  }, []);

  const url = "https://pokeapi.co/api/v2/pokemon?limit=25";

  // console.log("this si pike", pokemonList);
  console.log({ pokemonList });
  function handleClickOnImage(id) {
    console.log(id);
    if (checked.includes(id)) {
      setLost("Lost");
      setScore(0);
    } else {
      setChecked([...checked, id]);
      setScore(score + 1);

      // bestScore == 0
      //   ? setBestScore(bestScore + 1)
      //   : score > bestScore
      //   ? setBestScore(score)
      //   : {};

      setBestScore(Math.max(bestScore, score));
    }

    const newCards = shuffleArray(pokemonList);
    setVisibleCards(getFirstFour(newCards));
  }

  /**
   *
   * @param {api data} array
   * @brief its shuffling the data and generating shuffled form of data
   * @returns shuffled data
   */

  function shuffleArray(array) {
    console.log("suffling array");
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   *
   * @param {Main data form api} cards
   * @returns  sliced array of eight size;
   */
  function getFirstFour(cards) {
    return cards.slice(0, 4); // much cleaner
  }

  function getFirstEight(cards) {
    return cards.slice(0, 8); // much cleaner
  }

  function handlePlayer() {
    setVisibleCards(getFirstFour(cards));
    setGame(false);
    setPlaying(true);
    console.log("thisis easy", visibleCards);
  }

  function handlePokemonClicked() {
    const newList = shuffleArray(pokemonList);
    console.log({ newList });
    setVisibleCards(getFirstFour(newList));
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const detailPromises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        return Promise.all(detailPromises);
      })
      .then((details) => {
        console.log({ details });
        const validDetails = details.filter(
          (item) => item && item.name && item.sprites
        );

        const finalData = validDetails.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.sprites.other["official-artwork"].front_default,
        }));
        setCards(finalData);
        setPokemonList(finalData);
      });
  }, []);

  return (
    <>
      <div className="root">
        {loading && <LoadingGame />}

        {game && <Game onClick={handlePlayer} />}
        {playing && (
          <Playground
            pokemonList={visibleCards}
            onClick={handlePokemonClicked}
          />
        )}
      </div>
    </>
  );
}

export default App;

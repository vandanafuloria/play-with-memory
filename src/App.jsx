import { useState, useEffect, useCallback } from "react";

import "./App.css";
import Button from "./ui-components/Button";
import Cards from "./ui-components/Card.jsx";
import ScoreBoard from "./ui-components/ScoreBoard.jsx";
import LoadingGame from "./components/LoadingGame";
import Audio from "./ui-components/Audio";
import Game from "./components/GamePage.jsx";
import Playground from "./components/Playground";

import play from "./assets/lily/play.mp4";
import victory from "./assets/lily/victory.mp3";
import lostAdo from "./assets/lily/lost.mp3";
const lostVdo =
  "https://packaged-media.redd.it/ts43e1oey58d1/pb/m2-res_1080p.mp4?m=DASHPlaylist.mpd&v=1&e=1749988800&s=92dd398840d2026a72cbfeac627f0d98b11a7024";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [checked, setChecked] = useState([]);
  const [lost, setLost] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [isEasy, setIsEasy] = useState(true);

  const [isGameOver, setIsGameOver] = useState(false);

  const [isWin, setIsWin] = useState(false);
  const [status, setIsStatus] = useState("");

  // whatever clicked once , will save in this array;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setGame(true);
    }, 10000);
  }, []);

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
        const validDetails = details.filter(
          (item) => item && item.name && item.sprites
        );

        const finalData = validDetails.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.sprites.other["official-artwork"].front_default,
        }));
        // setCards(finalData);
        setPokemonList(finalData);
      });
  }, []);

  const url = "https://pokeapi.co/api/v2/pokemon?limit=25";

  function handleClickOnImage(id) {
    if (checked.includes(id)) {
      setIsGameOver(true);
      setScore(0);
      setPlaying(false);
      setLost(true);
      setIsStatus("Lost");
    } else {
      setChecked([...checked, id]);
      setScore(score + 1);
      console.log("this is score", isEasy, ":", score);
      if (isEasy == "easy" && score == 6) {
        setIsWin(true);
        setScore(0);
        setPlaying(false);
        setLost(false);
        setIsGameOver(true);
        setIsStatus("Won");
      } else if (isEasy == "medium" && score == 10) {
        setIsWin(true);
        setScore(0);
        setPlaying(false);
        setLost(false);
        setIsGameOver(true);
        setIsStatus("Won");
      } else if (isEasy == "hard" && score == 15) {
        setIsWin(true);
        setScore(0);
        setPlaying(false);
        setLost(false);
        setIsGameOver(true);
        setIsStatus("Won");
      }

      setBestScore(Math.max(bestScore, score)); // which ever the max  will set best score;
    }
    console.log(isWin);

    // const shuffled =
    //   isEasy === "easy"
    //     ? getFirstFour(newCards)
    //     : isEasy === "medium"
    //     ? getFirstEight(newCards)
    //     : getFirstTwelve(newCards);

    // const n = isEasy === "easy" ? 4 : isEasy === "medium" ? 8 : 12;
    // const shuffled = getFirstN(, n);
    // setVisibleCards(shuffled);

    const newCards = shuffleArray(pokemonList);
    console.log({ isEasy });
    if (isEasy == "easy") {
      setVisibleCards(getFirstFour(newCards));
      setIsEasy("easy");
    } else if (isEasy == "medium") {
      setVisibleCards(getFirstEight(newCards));
      setIsEasy("medium");
    } else {
      setVisibleCards(getFirstTwelve(newCards));
      setIsEasy("hard");
    }
  }

  /**
   *
   * @param {api data} array
   * @brief its shuffling the data and generating shuffled form of data
   * @returns shuffled data
   */

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  /**
   *
   * @param {Main data form api} cards
   * @returns  sliced array of eight size;
   */
  function getFirstN(cards, n) {
    return cards.slice(0, n);
  }
  function getFirstFour(cards) {
    return cards.slice(0, 4); // much cleaner
  }

  function getFirstEight(cards) {
    return cards.slice(0, 8); // much cleaner
  }
  function getFirstTwelve(cards) {
    return cards.slice(0, 12);
  }

  function handlePlayer(player) {
    if (player == "easy") {
      setVisibleCards(getFirstFour(pokemonList));
      setIsEasy("easy");
    } else if (player == "medium") {
      setVisibleCards(getFirstEight(pokemonList));
      setIsEasy("medium");
    } else {
      setVisibleCards(getFirstTwelve(pokemonList));
      setIsEasy("hard");
    }

    setGame(false);
    setPlaying(true);
  }
  function handlePokemonClicked(id) {
    handleClickOnImage(id);

    const newArray = shuffleArray(pokemonList);
    setVisibleCards(getFirstFour(newArray));
  }

  return (
    <>
      <div className="root">
        {loading && <LoadingGame />}

        {game && <Game onClick={handlePlayer} />}
        {playing && (
          <Playground
            pokemonList={visibleCards}
            onClick={handlePokemonClicked}
            score={score}
            bestScore={bestScore}
          />
        )}

        {isGameOver && (
          <div className="popup-ovelay">
            <div className="popup">
              <div>
                <h1>Challenge {status}</h1>
                {lost && <span>You left Lily in jungle</span>}
                {isWin && <span>Thank you, Lily Reached her Home</span>}
              </div>
              {lost && (
                <div
                  className="btn"
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    <button>
                      {" "}
                      <i className="fa-regular fa-circle"></i>Retry
                    </button>
                  </div>
                  <div>
                    <button>
                      {" "}
                      <i className="fa-regular fa-circle-xmark"></i>Leave for
                      now
                    </button>
                  </div>
                </div>
              )}
              {isWin && (
                <div>
                  <button>Play Again</button>
                  <button>Leave for Now</button>
                </div>
              )}
            </div>
          </div>
        )}
        {lost && (
          <div className="lost-background">
            <video src={lostVdo} loop playsInline autoPlay muted></video>
            <div>
              <span>
                <Audio audioSrc={lostAdo} />
              </span>
            </div>
          </div>
        )}
        {isWin && (
          <div className="win-background">
            <video src={play} loop playsInline autoPlay muted></video>
            <div>
              <span>
                {" "}
                <Audio audioSrc={victory} />
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

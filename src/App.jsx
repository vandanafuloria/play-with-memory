import { useState, useEffect, cloneElement } from "react";

import "./App.css";
import Button from "./ui-components/Button";
import Cards from "./Cards";
import ScoreBoard from "./ScoreBoard";
import LoadingGame from "./components/LoadingGame";
import Audio from "./ui-components/Audio";

function App() {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [checked, setChecked] = useState([]);
  const [lost, setLost] = useState("");
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(true);

  // whatever clicked once , will save in this array;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 14000);
  }, []);

  const url = "https://api.artic.edu/api/v1/artworks?limit=20";
  console.log(visibleCards, cards);

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

    const newCards = shuffleArray(cards);
    setVisibleCards(getFirstEight(newCards));
  }

  console.log(checked, lost);

  /**
   *
   * @param {api data} array
   * @brief its shuffling the data and generating shuffled form of data
   * @returns shuffled data
   */

  function shuffleArray(array) {
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

  function getFirstEight(cards) {
    return cards.slice(0, 8); // much cleaner
  }

  useEffect(() => {
    fetch(url) // replace with actual URL
      .then((res) => res.json())
      .then((response) => {
        setCards(response.data);
        setVisibleCards(getFirstEight(response.data));
      });
  }, []);

  return (
    <>
      <div className="root">
        {loading && <LoadingGame />}

        <div className="cards-container" onClick={() => shuffleArray(cards)}>
          {visibleCards.map((card) => {
            return (
              <div className="cards">
                <Cards
                  imageId={card.image_id}
                  onClick={() => handleClickOnImage(card.image_id)}
                />
              </div>
            );
          })}
        </div>

        <div className="level">
          <Button name={"Easy"} />
          <Button name={"Medium"} />
          <Button name={"Hard"} />
        </div>
        <div className="scores">
          <ScoreBoard name={"Score"} score={score} />
          <ScoreBoard name={" Best Score"} score={bestScore} />
        </div>
      </div>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";

import "./App.css";
import Button from "./ui-components/Button";
import Cards from "./Cards";

function App() {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const url = "https://api.artic.edu/api/v1/artworks?limit=20";
  console.log(visibleCards, cards);

  function handleClickOnImage(id) {
    console.log(id, "its selecting");
    const newCards = shuffleArray(cards);
    setVisibleCards(getFirstEight(newCards));
  }
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
        onClick={() => shuffleArray(cards)}
      >
        {visibleCards.map((card) => {
          return <Cards imageId={card.image_id} onClick={handleClickOnImage} />;
        })}
      </div>
      <Button name={"Play"} />
      <Button name={"Restart"} />

      <div>
        <Button name={"Easy"} />
        <Button name={"Medium"} />
        <Button name={"Hard"} />
      </div>
    </>
  );
}

export default App;

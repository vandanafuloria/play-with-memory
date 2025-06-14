import back from "../assets/lily/lily.png";

export default function Card({ name, frontImg, isFlipped, onClick }) {
  return (
    <div className="card-scene" onClick={onClick}>
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        {/** this can be flipeed or not flipped */}
        <div className="card-face card-front">
          {" "}
          {/** front face  and back face  */}
          <img src={frontImg} alt={name} />
        </div>
        <div className="card-face card-back">
          <img src={back} alt="back" />
        </div>
      </div>
    </div>
  );
}

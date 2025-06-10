export default function ScoreBoard({ name, score }) {
  return (
    <>
      <div>
        <h1>{name}</h1>
        <span>{score}</span>
      </div>
    </>
  );
}

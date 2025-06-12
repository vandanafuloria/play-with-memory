export default function Card({ name, img, onClick }) {
  if (!name || !img) return null;
  // console.log(onClick);

  return (
    <div onClick={onClick}>
      <img src={img} />
      <h6>{name}</h6>
    </div>
  );
}

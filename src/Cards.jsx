export default function Cards({ imageId, onClick }) {
  return (
    <div style={{ width: 200, height: 200 }} onClick={() => onClick(imageId)}>
      <img
        style={{ width: "100%", height: 200 }}
        src={`https://www.artic.edu/iiif/2/${imageId}/full/200,/0/default.jpg`}
      />
    </div>
  );
}

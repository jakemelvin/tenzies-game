import "../index.css";
export default function Die(props) {
  return (
    <div className={props.isHeld ? " die green" : "die"} onClick={props.onHold}>
      <h2>{props.value}</h2>
    </div>
  );
}

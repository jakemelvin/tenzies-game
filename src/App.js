import React from "react";
import "./index.css";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
export default function App() {
  let [arrayNumber, setArrayNumbers] = React.useState(allNewDice());
  let [tenzies, setTenzies] = React.useState(false);
  let [numRolls, setNumRolls] = React.useState(0);
  React.useEffect(() => {
    let num = 0;
    let valeur = arrayNumber[0].value;
    for (let i = 0; i < 10; i++) {
      if (arrayNumber[i].isHeld === true && arrayNumber[i].value === valeur) {
        num++;
      }
    }
    if (num === 10) {
      console.log("You won");
      setTenzies(true);
    }
  }, [arrayNumber]);
  function allNewDice() {
    let newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newArray;
  }
  function holdDice(id) {
    let newArray = [];
    for (let i = 0; i < 10; i++) {
      if (arrayNumber[i].id === id) {
        arrayNumber[i].isHeld = !arrayNumber[i].isHeld;
        newArray.push(arrayNumber[i]);
      } else {
        newArray.push(arrayNumber[i]);
      }
    }
    setArrayNumbers(newArray);
  }
  function newGame() {
    setNumRolls(0);
    setArrayNumbers(allNewDice());
    setTenzies(false);
    const highScore = localStorage.getItem("high-score");
    if (numRolls <= highScore) {
      localStorage.setItem("high-score", numRolls);
    }
  }
  function rollButton() {
    setNumRolls((prevState) => prevState + 1);
    setArrayNumbers((prevState) => {
      return prevState.map((die) => {
        return die.isHeld
          ? die
          : {
              id: nanoid(),
              isHeld: false,
              value: Math.ceil(Math.random() * 6),
            };
      });
    });
  }
  const dices = arrayNumber.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        onHold={() => holdDice(die.id)}
      />
    );
  });
  return (
    <main>
      {tenzies && <Confetti />}
      <div className="bodyOfTheBody">
        <div className="body">
          <h1 className="game-title">Tenzies</h1>
          <p className="explication">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="jeu">{dices}</div>
          <button className="roll" onClick={tenzies ? newGame : rollButton}>
            {tenzies ? "New Game" : "Roll"}
          </button>
          <h2>
            Number of Rolls:{" "}
            <span
              className={
                numRolls > localStorage.getItem("high-score")
                  ? "red-score"
                  : "green-score"
              }
            >
              {numRolls}
            </span>
          </h2>
          <h2>
            High-Score:{" "}
            <span className="green-score">
              {localStorage.getItem("high-score")}
            </span>
          </h2>
        </div>
      </div>
    </main>
  );
}

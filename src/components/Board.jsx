import { useState } from "react";

export default function Board() {
  const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let [player, setPlayer] = useState("X");
  const fieldList = document.querySelectorAll(".field");
  let playerTag = document.querySelector("#player-tag");

  const xColor = "red";
  const oColor = "blue";

  function BoardClicked(e) {
    const target = e.target;
    if (target.innerHTML === "") {
      addToBoard(target, player);
    }
  }

  function addToBoard(target, player) {
    if (player === "X") {
      target.innerHTML = player;
      target.style.color = xColor;
      setPlayer("O");
      playerTag.style.color = oColor;
    } else {
      target.innerHTML = player;
      target.style.color = oColor;
      setPlayer("X");
      playerTag.style.color = xColor;
    }
  }

  function resetBoard() {
    fieldList.forEach((item) => {
      console.log(item.innerHTML);
      item.innerHTML = "";
    });
    setPlayer("X");
  }

  return (
    <div className="xo">
      <h1>tic tac toe</h1>
      <div className="player">
        Current Player Is: <span id="player-tag">{player}</span>
      </div>
      <div className="board" onClick={BoardClicked}>
        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>
      </div>
      <button onClick={resetBoard}>Restart</button>
    </div>
  );
}

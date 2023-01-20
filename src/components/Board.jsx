import { useState, useEffect } from "react";

export default function Board() {
  const winningPattern = [
    ["0", "1", "2"],
    ["0", "3", "6"],
    ["2", "5", "8"],
    ["6", "7", "8"],
    ["3", "4", "5"],
    ["1", "4", "7"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];
  let [player, setPlayer] = useState("X");
  const fieldList = document.querySelectorAll(".field");
  const playerTag = document.querySelector("#player-tag");

  const color = { x: "orange", o: "violet" };

  const [xList, setX] = useState([]);
  const [oList, setO] = useState([]);

  let gameOver = false;
  let winner = "";
  let winList = [];

  // winningPattern.forEach((item) => {
  // const win = item.every((element) => {
  //   return x.includes(element);
  // });

  function checkForWin(list, playerWon) {
    winningPattern.forEach((item) => {
      const win = item.every((element) => {
        return list.includes(element);
      });
      if (win) {
        gameOver = true;
        winner = playerWon;
        winList = item;
        return win;
      }
    });
    if (gameOver) {
      showWinner(winList);
    }
  }

  function showWinner(winList) {
    fieldList.forEach((item) => {
      item.classList.add("win-style");
      item.classList.remove("f-hover");
    });
    winList.forEach((item) => {
      setTimeout(() => {
        document.getElementById(item).classList.add("win-field");
      }, 300);
    });
  }

  function BoardClicked(e) {
    if (!gameOver) {
      const target = e.target;
      addToBoard(target, player);
    }
  }

  useEffect(() => {
    checkForWin(xList, "x");
  });

  useEffect(() => {
    checkForWin(oList, "o");
  });

  function addToBoard(target, player) {
    let playerTag = document.querySelector("#player-tag");
    if (player === "X" && target.innerHTML === "") {
      setX(xList.concat(target.id));
      target.innerHTML = player;
      target.style.color = color.x;
      setPlayer("O");
      playerTag.style.color = color.o;
    } else if (target.innerHTML === "") {
      setO(oList.concat(target.id));
      target.innerHTML = player;
      target.style.color = color.o;
      setPlayer("X");
      playerTag.style.color = color.x;
    }
  }

  function resetBoard() {
    fieldList.forEach((item) => {
      item.innerHTML = "";
    });
    setPlayer("X");
    playerTag.style.color = color.x;
    setX([]);
    setO([]);
    gameOver = false;
    winner = "";
    fieldList.forEach((item) => {
      item.classList.remove("win-style");
      item.classList.remove("win-field");
      item.classList.add("f-hover");
    });
    winList = [];
  }

  return (
    <div className="xo">
      <h1 id="test">tic tac toe</h1>
      <div className="player">
        Current Player Is: <span id="player-tag">{player}</span>
      </div>
      <div className="board" onClick={BoardClicked}>
        <div className="field f-hover" id="0"></div>
        <div className="field f-hover" id="1"></div>
        <div className="field f-hover" id="2"></div>
        <div className="field f-hover" id="3"></div>
        <div className="field f-hover" id="4"></div>
        <div className="field f-hover" id="5"></div>
        <div className="field f-hover" id="6"></div>
        <div className="field f-hover" id="7"></div>
        <div className="field f-hover" id="8"></div>
      </div>
      <button onClick={resetBoard}>Restart</button>
    </div>
  );
}

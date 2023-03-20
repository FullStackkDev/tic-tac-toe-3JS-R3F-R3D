import React from "react";
import { Html } from "@react-three/drei";
import "../App.css";

function GameInfo({ gameBoard, nextTurn, winner, resetGameBoard }) {
  return (
    <Html>
      <div className="gameTitle">Tic Tac Toe in 3D</div>
      <div className="textBottomSection">
        <div className="winnerMove">
          {winner
            ? winner + " wins!!"
            : !winner && !gameBoard.includes(null)
            ? "Game Tied!!"
            : "Current Move: " + (nextTurn ? "Sphere" : "Cube")}
        </div>
        <div onClick={resetGameBoard}>
          {gameBoard.every((x) => x === null) ? null : (
            <button className="restartButton">Restart Game</button>
          )}
        </div>
      </div>
    </Html>
  );
}

export default React.memo(GameInfo);

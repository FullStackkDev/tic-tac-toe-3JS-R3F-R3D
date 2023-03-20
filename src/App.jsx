import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Cloud, Environment } from "@react-three/drei";
import WinnerLine from "./components/WinnerLine";
import GameInfo from "./components/GameInfo";
import GridBox from "./components/GridBox";
import Grid from "./components/Grid";
import space from "./assets/space.hdr";

//to convert gltf to glb
// go to vs cli => go to the directory where your model is
//type gltf-pipeline -i // -i stands for input file
//type gltf-pipeline -i car.gltf -o carModel.glb // -i stands for input file -o for output file
//if you want to add compression level add --draco.compressionLevel 10 // 10 being the higest compression level
//so we will have gltf-pipeline -i car.gltf -o carModel.glb --draco.compressionLevel 10 -d -b //-b for binary -d dracoCompressionMesh
//then we need a component form of our glb file
//to do that we need to
//install a global package called gltfjsx

function App() {
  const positions = [
    [-1.2, 2.4, 0],
    [1.2, 2.4, 0],
    [3.6, 2.4, 0],
    [-1.2, 0, 0],
    [1.2, 0, 0],
    [3.6, 0, 0],
    [-1.2, -2.4, 0],
    [1.2, -2.4, 0],
    [3.6, -2.4, 0],
  ];
  function findWinner(gameboard) {
    let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      let [a, b, c] = winningCombinations[i];

      if (
        gameboard[a] &&
        gameboard[a] === gameboard[b] &&
        gameboard[a] === gameboard[c]
      ) {
        return [gameboard[a], winningCombinations[i]];
      }
    }
    return [null, null];
  }

  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
  const [nextTurn, setNextTurn] = useState(true);
  const [winner, positionIndices] = findWinner(gameBoard);

  function handleClick(i) {
    const boardCopy = [...gameBoard];

    if (winner || boardCopy[i]) {
      return;
    }

    boardCopy[i] = nextTurn ? "Sphere" : "Cube";
    setGameBoard(boardCopy);
    setNextTurn((prevNextTurn) => !prevNextTurn);
  }

  function resetGameBoard() {
    setGameBoard(Array(9).fill(null));
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <Canvas
        camera={{
          fov: 50,
          position: [0, 0, 15],
          rotation: [Math.PI, 0, 0],
        }}
      >
        <OrbitControls maxDistance={40} enableDamping />
        {/* <Cloud />
        <Stars /> */}
        <Environment background={true} files={space} />

        <ambientLight intensity={1} />
        <pointLight position={[-150, 300, -300]} intensity={0.9} />

        <Grid position={[1.2, -1, 0]} rotation={[0, 0, -Math.PI / 2]} />
        <Grid position={[-0.1, 0, 0]} />
        <Grid position={[1.2, 1, 0]} rotation={[0, 0, -Math.PI / 2]} />
        <Grid position={[2.5, 0, 0]} />

        {positions.map((gridBox, idx) => {
          return (
            <GridBox
              key={idx}
              shape={gameBoard[idx]}
              position={gridBox}
              handleClick={() => handleClick(idx)}
              winner={winner}
            />
          );
        })}

        {winner ? (
          <WinnerLine positions={positions} positionIndices={positionIndices} />
        ) : null}

        <GameInfo
          winner={winner}
          gameBoard={gameBoard}
          nextTurn={nextTurn}
          resetGameBoard={resetGameBoard}
        />
      </Canvas>
    </div>
  );
}

export default React.memo(App);

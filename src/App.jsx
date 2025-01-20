import { useState } from "react";

import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./WinningCombinations.jsx";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X:'Player 1',
  O:'Player 2'
}

let INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function derivedGameBoard (gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function derivedWinner(gameBoard, player) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [player, setPlayer] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard (gameTurns);
  const winner = derivedWinner(gameBoard, player)
  const hasDraw = gameTurns.length === 9 && !winner; 


  

  function handleRestart() {
    setGameTurns([]);
  }

  function handleNameChange(symbol, newName) {
    setPlayer(prePlayers => {
      return {
        ...prePlayers,
        [symbol]:newName
      };
    });
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleNameChange}
          />
        </ol>
        {( winner || hasDraw ) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

// IMPORTANT TOPICS TO RESEARCH AND UNDERSTAND THEM DEEPLY THESE CONCEPTS ARE OFFTEN IN REACT APPS

// TOPIC 1 Update Objects-State Immutably : as shown in watsup pic section 4 video 81  SEE IN NOTE BOOK PAGE:100
// other topics : learn two way binding in SEC 4 Video 79
// TOPIC 2 Lifting State Up : as shown in watsup pic.
// U should use as minmum as possible Ui state code in react projects just like the we di in App Component.

// Q/ Avoid Intersecting States Vid :83:
// Ans: It means that dont create anothre state for just fetching/displaying logs. managing same data with multiple states 
//NOTE: and  its come with experience and of corse it not the end of the world to managing same data with multiple states
import React, { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import { LostFigures } from "./components/LostFigures";
import Timer from "./components/Timer";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState<Player>(
    new Player(Colors.WHITE)
  );
  const [blackPlayer, setBlackPlayer] = useState<Player>(
    new Player(Colors.BLACK)
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer
    );
  }

  return (
    <div className="app">
      <Timer 
        restart={restart}
        currentPlayer={currentPlayer}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures
          title="Чорні фігури"
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title="Білі фігури"
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
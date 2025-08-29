import { useState } from "react";
import PieceCell from "./Components/PieceCell";
import { instance } from "./Game/Instance";
import { Piece } from "./Game/Pieces/Piece";
import { boardRemapper } from "./Utils/board-remapper";
import { Clock } from "./Components/Clock";

function App() {
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-2xl font-bold m-5">{instance.turn} turn</h1>
      <Clock
        className="mb-1"
        isRunning={instance.turn === "black"}
        initialTime={instance.time.black.time}
        lastMoveTimestamp={instance.time.black.lastMoveTimestamp}
      />
      {instance.board.pieces.map((row, i) => {
        return (
          <div key={i} className={`flex flex-row items-center justify-center`}>
            <span className="text-2xl font-bold mr-2">
              {boardRemapper({ x: i, y: 0 }).split("")[1]}
            </span>
            {row.map((piece, j) => {
              const bgColor = (i + j) % 2 ? "bg-amber-800" : "bg-orange-300";
              const currentPosition = { x: i, y: j };
              const isSelected =
                selectedPiece?.position.x === currentPosition.x &&
                selectedPiece?.position.y === currentPosition.y;

              return (
                <div
                  key={`${i}-${j}`}
                  className="flex flex-col items-center justify-center"
                >
                  <span
                    className={`text-2xl font-bold ${
                      i !== 0 ? "hidden" : ""
                    } mb-1`}
                  >
                    {boardRemapper({ x: i, y: j }).split("")[0]}
                  </span>
                  <PieceCell
                    piece={piece}
                    backgroundColor={bgColor}
                    currentPosition={currentPosition}
                    isSelected={isSelected}
                    currentSelectedPiece={selectedPiece}
                    setSelectedPiece={setSelectedPiece}
                  />
                  <span
                    className={`text-2xl font-bold ${
                      i !== 7 ? "hidden" : ""
                    } mt-1`}
                  >
                    {boardRemapper({ x: i, y: j }).split("")[0]}
                  </span>
                </div>
              );
            })}
            <span className="text-2xl font-bold ml-2">
              {boardRemapper({ x: i, y: 0 }).split("")[1]}
            </span>
          </div>
        );
      })}
      <Clock
        className="mt-1"
        isRunning={instance.turn === "white"}
        initialTime={instance.time.white.time}
        lastMoveTimestamp={instance.time.white.lastMoveTimestamp}
      />
    </div>
  );
}

export default App;

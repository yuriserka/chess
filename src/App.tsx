import { useState } from "react";
import PieceCell from "./Components/PieceCell";
import { instance } from "./Game/Instance";
import { Piece } from "./Game/Pieces/Piece";

function App() {
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-2xl font-bold">{instance.turn} turn</h1>
      {instance.board.pieces.map((row, i) => {
        return (
          <div key={i} className={`flex flex-row items-center justify-center`}>
            {row.map((piece, j) => {
              const bgColor =
                (i + j) % 2 === 0 ? "bg-amber-900" : "bg-orange-300";
              const currentPosition = { x: i, y: j };
              const isSelected =
                selectedPiece?.position.x === currentPosition.x &&
                selectedPiece?.position.y === currentPosition.y;

              return (
                <PieceCell
                  key={`${i}-${j}`}
                  piece={piece}
                  backgroundColor={bgColor}
                  currentPosition={currentPosition}
                  isSelected={isSelected}
                  currentSelectedPiece={selectedPiece}
                  setSelectedPiece={setSelectedPiece}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
